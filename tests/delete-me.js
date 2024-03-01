function x() {
    const name = 'ganesh'
    return function y() {
        console.log(name)
        return "Hello " + name
    }
}

const str = "Jai Ganesh";
console.log(str.match())

const z = x()

console.log(z())