var map=new Map();
map.set('first','hello');
map.set('second','world');
for (let [key,val] of map){
    console.log(key+"is"+val);
}

// firstishello
// secondisworld

//获取健名
for(let [key] of map){
    console.log(key);
}
//获取键值
for(let [,val] of map){
    console.log(val)
}