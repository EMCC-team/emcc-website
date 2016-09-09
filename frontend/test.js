let k = "a";
Promise.resolve({}).then(function (value) {
  k = 'b';
});
console.log(k); // 'a' ?????
