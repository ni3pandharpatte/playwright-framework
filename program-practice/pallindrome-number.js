const num = 121
const res = num.toString().split('').reverse().join('');

if(num === Number(res)){
    console.log('palindrome')
}else{
    console.log('not palindrome')
}