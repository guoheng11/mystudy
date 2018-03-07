function f(){
    console.log("aaaa")
}
let [x = f()] = [undefined];
// let [x = f()] = [1];
//当默认值是表达式--》惰性求值
