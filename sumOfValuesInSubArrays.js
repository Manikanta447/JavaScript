"use strict";

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", (inputStdin) => {
  inputString += inputStdin;
});

process.stdin.on("end", (_) => {
  inputString = inputString.trim().split("\n").map((str) => str.trim());
  main();
});

function readLine() {
  return inputString[currentLine++];
}

/* Please do not modify anything above this line */

function main() {
  const nestedArray = JSON.parse(readLine());

  /* Write your code here */
  const finalArr = nestedArray.map((arr) => {
      const result = arr.some((num) => (num%2 === 0));
      if (result === true){
          const sumResult = arr.reduce((num1,num2) => num1 + num2);
          return sumResult;
      } else{
          return 0;
      }
  });
  
  console.log(finalArr);
