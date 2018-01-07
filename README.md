# React Native SCSS

[![licence mit](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](http://app_descco.mit-license.org/)
[![issues](https://img.shields.io/github/issues/descco-tools/prime-react-native.svg?style=flat-square)](https://github.com/descco-tools/prime-react-native/issues)

## Install

```
yarn
```

## Usage

```
var {Project} = require('rn-css-js');

var project = new Project({
    inputPut: './css/**/!(_)*.{scss,css}',
    outPut: (outPut)=>{
        return outPut.replace(/\/css\//, '/test/')
    },
    useEs6:false,

});
project.run();
```

## Example

### Before

```
.example {
  border:1px solid #fff;
  padding:1px 2px 4px 3px;
  transform: scale(.9, 8) rotate(7deg);
  color: #000;
  font-size: 12px;
  margin:1px 3px 4px 5px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 10px 10px 5px #888888;
}
```

### After

```
module.exports = {
  example: {
    "borderWidth": 1,
    "borderStyle": "solid",
    "borderColor": "#fff",
    "paddingTop": 1,
    "paddingRight": 2,
    "paddingBottom": 4,
    "paddingLeft": 3,
    "color": "#000",
    "fontSize": 12,
    "marginTop": 1,
    "marginRight": 3,
    "marginBottom": 4,
    "marginLeft": 5,
    "borderRadius": 10,
    "textAlign": "center",
    "shadowColor": "#888888",
    "shadowOpacity": 1,
    "shadowRadius": 5,
    "transform": [
      {
        "scale": 0.9
      },
      {
        "rotate": "7deg"
      }
    ],
    "shadowOffset": {
      "width": 10,
      "height": 10
    },
  },
}
```

## Contributing

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -m 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

## Log

Check [Releases](https://github.com/descco-tools/prime-react-native/releases) for detailed changelog.

## License

[MIT license](http://app_descco.mit-license.org/) © Hemerson Vianna
