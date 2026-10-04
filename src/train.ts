/* Project Standards:
- Logging standards
- Naming standards:
function, method, variable = CAMEL
class => PASCAL folder => KEBAB css => SNAKE
- Error handling standards
*/

/* 
Traditinal Api
Rest Api
GraphQL Api
...
*/

/*
Traditional FD =>   SSR => EJS
Moodern FD     =>   SPA => React 
*/









// M TASK

// function getSquareNumbers(arr: number[]){
//     let result: { number: number; square: number }[] = [];
//     for (let i = 0; i < arr.length; i++) {
//        let number = arr[i];
//         let square = number * number;
//        result.push({ number, square });

       
//     }
//     return result;
// }

// console.log(getSquareNumbers([1, 2, 3, 4, 5])); 

//N-TASK

// Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, 
// orqasidan oqilganda ham bir hil oqiladigan soz ekanligini aniqlab boolean qiymat qaytarsin. 
// MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.

// function palindromCheck(str: string): boolean {
//     const reversedStr = str.split("").reverse().join("");
//     return str === reversedStr;
// }

// console.log(palindromCheck("dad")); // true
// console.log(palindromCheck("son")); // false    

// O TASK

// function calculateSumOfNumbers(arr: any[]): number {
//     let sum = 0;

//     for (const value of arr) {
//         if (typeof value === "number") {
//             sum += value;
//         }
//     }

//     return sum;
// }

// console.log(
//     calculateSumOfNumbers([10, "10", { son: 10 }, true, 35]) //45 
// );



// P TASK


// function objectToArray(obj: { [key: string]: any }): any[] {
//     const result: any[] = [];

//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             result.push([key, obj[key]]);
//         }
//     }

//     return result;
// }

// console.log(
//     objectToArray({ a: 1, b: 2, c: 3, }) 
// );

// Q TASK
// Q-TASK

// Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string. 
// Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin. 
// MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; 
// hasProperty({name: "BMW", model: "M3"}, "year") return false.

// function hasProperty(obj: { [key: string]: any }, prop: string): boolean {
//     return obj.hasOwnProperty(prop);
// }

// console.log(hasProperty({ name: "BMW", model: "M3" }, "model")); // true
// console.log(hasProperty({ name: "BMW", model: "M3" }, "year")); // false
// console.log(hasProperty({ name: "BMW", model: "M3" }, "name")); // true


// R-TASK

// Shunday function yozing, u string parametrga ega bolsin. 
// String "1+2" holatda pass qilinganda string ichidagi 
// sonlar yigindisini number holatda qaytarsin. 
// MASALAN: calculate("1+3") return 4.

// R TASK

function calculate(expression: string): number {
    const numbers = expression.split("+").map(Number);
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum;
}

console.log(calculate("1+3")); // 4
console.log(calculate("10+20+30")); // 60
console.log(calculate("5+15")); // 20