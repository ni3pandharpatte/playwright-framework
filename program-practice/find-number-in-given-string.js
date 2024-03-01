const str = "after 01 this is the 78 independence day";


console.log(str.replace(/[^0-9]/g, ''))     // 0178

console.log(str.match(/\d+/g))              // [ '01', '78' ]

console.log(str.replace(/[0-9]/g, ''))      // after  this is the  independence day