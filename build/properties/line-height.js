"use strict";

var lineHeight = function lineHeight(keys) {
  return [{
    key: "lineHeight",
    value: parseInt(keys[0].value)
  }];
};

module.exports = lineHeight;