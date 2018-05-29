# console.table.polyfill
console.table available on ie9↑
only for json array or json(single dimension)

===============================

sample:

var data = [
  {name:"John", age:31, car: "Mercedes"},
  {name:"Steve", age:24, city:"New York" },
  {name:"Jacob", age:13 },
  {name:"William", age:45, city:"Chicago" }
];

use:

console.table(data);

result:

     │ name     │ age  │ car       │ city     
─────┼──────────┼──────┼───────────┼──────────
  0  │ John     │ 31   │ Mercedes  │          
  1  │ Steve    │ 24   │           │ New York 
  2  │ Jacob    │ 13   │           │          
  3  │ William  │ 45   │           │ Chicago  
