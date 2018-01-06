const toCamelCase = require('to-camel-case');

const allowedStyles = ['solid', 'dotted', 'dashed'];
const widthKeywords = ['none', 'thin', 'medium', 'thick'];
const widthKeywordValues = { none: 0, thin: 1, medium: 3, thick: 5 };

const styleProps = [
  'borderStyle',
  'borderTopStyle',
  'borderRightStyle',
  'borderBottomStyle',
  'borderLeftStyle'
];
const widthProps = [
  // 'borderWidth',
  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth'
];

const colorHexMatch = /^#(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{6})?/;
const colorFuncMatch = /^(?:rgb|hsl)a?/;

const isColorFunc = val => {
  return val.search(colorFuncMatch) > -1;
}

const fixWidthKeywords = val => {
  if (widthKeywords.indexOf(val) > -1) {
    return widthKeywordValues[val] + 'px';
  }
  return val;
}

const border = keys => {
  const values = keys[0].value.split(' ');
  const property = toCamelCase(keys[0].key);
  const length = values.length;
  // handle borderWidth, borderStyle and borderColor
  // pode aceitar 4 valores
  // Se tiver apenas 1, acrescenta os demais
  if (length === 1 && (property === 'borderWidth' || property === 'borderStyle' || property === 'borderColor')) {
    return keys;
  }

  keys = [];

  // Junta as cores rgb / hsl que se dividiram
  // TODO: valores values[0] ou values[1] serem uma funcao?!
  if (values[2] && isColorFunc(values[2])) {
    values[2] = values.slice(2).join(' ');
  }

  if (styleProps.indexOf(property) > -1) {
    // Reative Native só suporta um estilo para todos os lados
    // honra o primeiro estilo declarado para borderStyle: 1 2 3 4
    // TODO: Isso acaba por honrar o último estilo declarado
    // se a declaração borderTopStyle vier após borderStyle
    // como saber se borderStyle já estava configurado?
    keys.push({
      key: 'borderStyle',
      value: values[0]
    });
  } else if (widthProps.indexOf(property) > -1) {
    keys.push({
      key: property,
      value: fixWidthKeywords(values[0])
    });
  } else if (property === 'borderWidth' || property === 'borderColor') {
    const type = property.substr('border'.length);

    if (type === 'Width') {
      values.forEach((val, index) => {
        values[index] = fixWidthKeywords(val);
      });
    }

    if (length === 2) {
      ['Top', 'Bottom'].forEach(function (side) {
        keys.push({
          key: `border${side}${type}`,
          value: values[0]
        });
      });
      ['Right', 'Left'].forEach(function (side) {
        keys.push({
          key: `border${side}${type}`,
          value: values[1]
        });
      });
    }

    if (length === 3) {
      keys.push({
        key: `borderTop${type}`,
        value: values[0]
      });
      ['Left', 'Right'].forEach(function (side) {
        keys.push({
          key: `border${side}${type}`,
          value: values[1]
        });
      });
      keys.push({
        key: `borderBottom${type}`,
        value: values[2]
      });
    }

    if (length === 4) {
      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side, index) {
        keys.push({
          key: `border${side}${type}`,
          value: values[index]
        });
      });
    }
  } else {
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/border
    // border: 1px;
    // border: 2px dotted;
    // border: medium dashed green;
    // TODO: border: dashed green;
    const width = fixWidthKeywords(values[0]);
    const style = values[1];
    const color = values[2];

    keys.push({
      key: `${property}Width`,
      value: width
    });

    if (style) {
      keys.push({
        key: 'borderStyle',
        value: style
      });
    }

    if (color) {
      keys.push({
        key: `${property}Color`,
        value: color
      });
    }
  }

  return keys;
};

module.exports = border;
