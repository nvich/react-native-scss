import Handle from './handle'
import utils from './utils.js'

const format = require('./properties');
const margingAndPadding = require('./properties/margin-and-padding');
const border = require('./properties/border');
const boxShadow = require('./properties/box-shadow');
const flex = require('./properties/flex');
const transform = require('./properties/transform');
const lineHeight = require('./properties/line-height');
const final = require('./save-all');

export default class ReactNativeCss {
  parse( options) {
    let {
        // 源文件目录
        inputPut,
        // 输出目录，如为空，则只返回编译结果
        outPut,
        // 是否进行格式化打印
        prettyPrint = false,
        // 不包括reactnative StyleSheet处理
        literalObject = false,
        //回调函数
        cb,
        // 是否使用es6语法
        useEs6 = false,
        // 特殊编译法则
        specialParse,
        // 是否支持typescript
        tsAble
    } = options;

    let parseResult
    if (utils.contains(inputPut, /scss/)) {
      let {css} = require('node-sass').renderSync({
        file: inputPut,
        outputStyle: 'compressed'
      });
      let cssStr = css.toString();
      let styleSheet = this.toJSS(cssStr, specialParse);
      parseResult = utils.outputReactFriendlyStyle(styleSheet, outPut, prettyPrint, literalObject, useEs6, tsAble);

      if (cb) {
        cb(styleSheet, cssStr);
      }
    } else {
      let data = utils.readFileSync(inputPut);
      let styleSheet = this.toJSS(data, specialParse);
      parseResult = utils.outputReactFriendlyStyle(styleSheet, outPut, prettyPrint, literalObject, useEs6, tsAble);
      if (cb) {
        cb(styleSheet, data);
      }
    }

    return parseResult;
  }

  toJSS(stylesheetString, specialParse = []){
    let handle = new Handle(utils.clean(stylesheetString), specialParse);

    handle.use(['margin', 'padding'], margingAndPadding);
    handle.use([
        'border',
        'border-top',
        'borderTop',
        'border-bottom',
        'borderBottom',
        'border-left',
        'borderLeft',
        'border-right',
        'borderRight',
        'border-width',
        'borderWidth',
        'border-top-width',
        'borderTopWidth',
        'border-right-width',
        'borderRightWidth',
        'border-bottom-width',
        'borderBottomWidth',
        'border-left-width',
        'borderLeftWidth',
        'border-style',
        'borderStyle',
        'border-top-style',
        'borderTopStyle',
        'border-right-style',
        'borderRightStyle',
        'border-bottom-style',
        'borderBottomStyle',
        'border-left-style',
        'borderLeftStyle',
        'border-color',
        'borderColor'
    ], border);
    handle.use(['box-shadow', 'boxShadow'], boxShadow);
    handle.use(['flex'], flex);
    handle.use(['transform'], transform);
    handle.use(['line-height'], lineHeight);
    handle.use(format);

    handle.final(final);

    specialParse.forEach && specialParse.forEach((special)=>{
      if( special && special.func ){
        if( special.properties &&  Array.isArray(special.properties) ){
          handle.use(special.properties, special.func);
        }else{
          handle.use(special.properties, special.func);
        }
      }
    });

    return handle.do();
  }
}
