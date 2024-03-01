// Armstrong Number = 1*1*1  + 5*5*5   +   3*3*3   = 153
//                      1       125         27     = 153
let num = 153

let sum = 0
let temp = num
let mod = 0
while (temp > 0) {
    mod = temp % 10
    console.log(mod)
    sum = sum + (mod * mod * mod)
    temp = parseInt(temp / 10)
}

if (num === sum) {
    console.log('Armstrong number')
} else {
    console.log('Not Armstrong number')
}

function isArmstrong(number) {
    const digits = number.toString().split('');

    const order = digits.length;
    console.log(digits)
    // Calculate the total sum using array.map()
    const sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(Number(digit)), order), 0);

    if (sum === number) {
        console.log(number + " is an Armstrong Number");
    }
    else {
        console.log(number + " is not an Armstrong Number");
    }
}

isArmstrong(153)
