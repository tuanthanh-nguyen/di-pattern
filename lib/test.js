const { argsList } = require('./utils')

function f1(a, b) {}
function f2(a, a) {}
function f3() {}
const f4 = (a) => {}
console.log(argsList(f1))
console.log(argsList(f2))
console.log(argsList(f3))
console.log(argsList(f4))
