const Rncs = require('./index.js').default;
const cssOpera = new Rncs();
const path = require('path');
const fs = require('fs');
const chokidar = require('chokidar');
const glob = require("glob");
// var specialReactNative = {
//     'transform': function (value) {
//         // todo fix
//         return value;
//     },
//     // fix react-native
//     __$$: function (property, value) {
//         switch (property){
//             case 'shadow-radius':
//             case 'elevation':
//             case 'margin-horizontal':
//             case 'margin-vertical':
//             case 'padding-horizontal':
//             case 'padding-vertical':
//             case 'text-shadow-radius':
//                 return parseFloat(value.replace(/px|\s*/g, ''));
//                 break;
//
//         }
//         return void (0);
//     }
// }

export default class Project {
  constructor( options = {} ) {
    this.options = Object.assign({
      inputPut: '',
      outPut:(outPut) => { return outPut },
      watch: true,
      prettyPrint: true,   // formatado
      suffix: 'js',        // extensão de saída
      useEs6: true,        // es6
      tsAble:false,        // suporte a typescript
      literalObject: true, // formato react-native
      specialParse: []     // tratamento especial
    }, options);

    this.options.suffix = this.options.suffix[0] !== '.' ? '.' + this.options.suffix : this.options.suffix;
      ['parseCSS','watchAction'].forEach((item)=>{
        this[item] = this[item].bind(this)
      });
      let parseCSS = this.parseCSS;
      let watchAction = this.watchAction;

      this._callback = (function (err, fileList) {
        if (err) {
          console.log(err);
          return;
        }
        fileList.forEach((item)=> {
          parseCSS({input: item})
        });
        watchAction(this.options.inputPut)
      }).bind(this)
    }

    inputTranOut(inputPath) {
      let outPut =  path.join(
        path.dirname(inputPath),
        path.basename(inputPath, path.extname(inputPath))
      ) + this.options.suffix;

      typeof this.options.outPut === 'function' && (outPut = this.options.outPut(outPut));
      return outPut;
    }

    /**
     * 监控文件 【增删改】 变化
     */
    watchAction (watchPath){
      if( !this.options.watch ) return;

      let watcher = chokidar.watch(watchPath, {
        ignored: /[\/\\]\./,
        persistent: true,
        ignoreInitial: true
      }).on('change',  (filePath) => {
        console.log(filePath, 'has been changed ');
        this.parseCSS({
            input: filePath
        });
      }).on('add',  (filePath) => {
        console.log(filePath, 'has been added ');
        this.parseCSS({
          input: filePath
        });
      }).on('unlink',  (filePath) => {
        console.log(filePath, 'has been unlink ');
        fs.unlink(this.inputTranOut(path.resolve(process.cwd(), filePath), this.options.suffix))
      });
      console.log(' ============= react-native-scss run watch =============');
      return watcher
    }

    parseCSS(options) {
      let input = options.input;
      let output = options.output;
      let callback = options.callback;

      var reInput = path.resolve(process.cwd(), input);
      if (!output) {
        output = this.inputTranOut(reInput, this.options.suffix);
      }

      try {
        var cssresult = cssOpera.parse({
          inputPut: reInput,
          outPut: output,
          prettyPrint: this.options.prettyPrint,
          literalObject: this.options.literalObject,
          cb () {
            callback && callback.apply(null, arguments);
            console.log(input, 'compile is ok √')
          },
          useEs6: this.options.useEs6,
          specialParse: this.options.specialParse,
          tsAble: this.options.tsAble
        })
      } catch (err) {
        console.log(err)
      }
    }

    run (){
      glob(this.options.inputPut, {cwd: process.cwd(), mark: true}, this._callback);
    }
}
