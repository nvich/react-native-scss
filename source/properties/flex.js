const flex = keys => {
  const values = keys[0].value.split(" ");
  return [{
      key: "flex",
      value: values[0]
  }];
};

module.exports = flex;
