const myArray = JSON.parse(readLine().replace(/'/g,'"'));
 
let newArray = myArray.filter((num,index) => {
    const firstIndex = myArray.indexOf(num);
    if (index === firstIndex){
        return true
    } else {
        return false
    }
})
console.log(newArray);
