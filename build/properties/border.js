'use strict';

var toCamelCase = require('to-camel-case');

var allowedStyles = ['solid', 'dotted', 'dashed'];
var widthKeywords = ['none', 'thin', 'medium', 'thick'];
var widthKeywordValues = { none: 0, thin: 1, medium: 3, thick: 5 };

var styleProps = ['borderStyle', 'borderTopStyle', 'borderRightStyle', 'borderBottomStyle', 'borderLeftStyle'];
var widthProps = [
// 'borderWidth',
'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth'];

var colorHexMatch = /^#(?:[a-fA-F0-9]{3}|[a-fA-F0-9]{6})?/;
var colorFuncMatch = /^(?:rgb|hsl)a?/;

var isColorFunc = function isColorFunc(val) {
  return val.search(colorFuncMatch) > -1;
};

var fixWidthKeywords = function fixWidthKeywords(val) {
  if (widthKeywords.indexOf(val) > -1) {
    return widthKeywordValues[val] + 'px';
  }
  return val;
};

var border = function border(keys) {
  var values = keys[0].value.split(' ');
  var property = toCamelCase(keys[0].key);
  var length = values.length;
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
    var type = property.substr('border'.length);

    if (type === 'Width') {
      values.forEach(function (val, index) {
        values[index] = fixWidthKeywords(val);
      });
    }

    if (length === 2) {
      ['Top', 'Bottom'].forEach(function (side) {
        keys.push({
          key: 'border' + side + type,
          value: values[0]
        });
      });
      ['Right', 'Left'].forEach(function (side) {
        keys.push({
          key: 'border' + side + type,
          value: values[1]
        });
      });
    }

    if (length === 3) {
      keys.push({
        key: 'borderTop' + type,
        value: values[0]
      });
      ['Left', 'Right'].forEach(function (side) {
        keys.push({
          key: 'border' + side + type,
          value: values[1]
        });
      });
      keys.push({
        key: 'borderBottom' + type,
        value: values[2]
      });
    }

    if (length === 4) {
      ['Top', 'Right', 'Bottom', 'Left'].forEach(function (side, index) {
        keys.push({
          key: 'border' + side + type,
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
    var width = fixWidthKeywords(values[0]);
    var style = values[1];
    var color = values[2];

    keys.push({
      key: property + 'Width',
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
        key: property + 'Color',
        value: color
      });
    }
  }

  return keys;
};

module.exports = border;