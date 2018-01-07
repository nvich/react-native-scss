"use strict";

var flex = function flex(keys) {
  var values = keys[0].value.split(" ");
  return [{
    key: "flex",
    value: values[0]
  }];
};

module.exports = flex;