// M TASK

function getSquareNumbers(arr: number[]){
    let result: { number: number; square: number }[] = [];
    for (let i = 0; i < arr.length; i++) {
       let number = arr[i];
        let square = number * number;
       result.push({ number, square });

       
    }
    return result;
}

console.log(getSquareNumbers([1, 2, 3, 4, 5])); 