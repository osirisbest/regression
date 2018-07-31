const regression = require('regression');
const result = regression.linear([[1, 1], [2, 22], [5,5]]);
console.log(result)
const gradient = result.equation[0];
console.log(gradient)
const yIntercept = result.equation[1];
console.log(yIntercept)