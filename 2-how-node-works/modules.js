// console.log(arguments);
const C = require('./test-module-1');
const calc1 = new C();

console.log(calc1.add(2, 6));

// exports

// const calc2 = require('./test-module-2');
// console.log(calc2.multiply(4, 4));
const { multiply } = require('./test-module-2');
console.log(multiply(4, 4));

require('./test-module-3')();
