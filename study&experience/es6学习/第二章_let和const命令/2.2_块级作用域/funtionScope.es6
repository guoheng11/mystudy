function f() {
    console.log("i am out")
}
(function () {
    if(false){
        function f() {
          console.log('i am in')
        }
    }
    console.log(f)
}())