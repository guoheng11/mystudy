function f() {
    let n=5;
    if(true){
       let n=10;
    }
    console.log(n)
}
f();

//当 if 里面变量n从新申明则于外部作用于毫无关系；
//但是 若没有let 只是引用了变量n 则会改变n的值

