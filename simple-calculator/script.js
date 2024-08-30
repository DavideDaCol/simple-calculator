/*
Thanks for checking out my code! this is my first indipendent mini project using vanilla JS and i had quite a bit of fun; this approach is definitely unconventional but it does work seemingly well enough. An alternative i'd like to try is to just push everything into arrays or lists and convert them once i try to evaluate the expression: that would make handling the input much easier but it would take some extra steps to turn the arrays into numbers JS can handle. Regardless, i just want to finish this version now.
*/

const buttons = document.querySelectorAll("button");
let result = 0;
let isSecond = false;
let isDecimal = false;
let isNegative = false;
let decLen = 0; //length of decimal part of a number
let firstOp = 0;
let secondOp = 0;
let operation = "";

buttons.forEach(el => {
  el.addEventListener("click", () => {
    if (el.value === "="){
      evaluateExpression();
      displayOnScreen(result,getRounding(result));
      reset();
    } else {
      parseInput(el.value);
    }
  })
})

function parseInput(current){
  /*if(current === "AC"){
    displayOnScreen(0);
    reset();
    return;
  } else if (current === "."){
    isDecimal = true;
    if(isSecond){
      document.getElementById("screen").innerHTML = `<h1>${secondOp}.</h1>`;
    } else document.getElementById("screen").innerHTML = `<h1>${firstOp}.</h1>`;
    return;
  }*/

  switch (current) {
    case "AC":
      displayOnScreen(0);
      reset();
      return;
    case ".":
      isDecimal = true;
      if(isSecond){
        document.getElementById("screen").innerHTML = `<h1>${secondOp}.</h1>`;
      } else document.getElementById("screen").innerHTML = `<h1>${firstOp}.</h1>`;
      return;
    case "-":
      if(!isSecond && firstOp === 0){
        isNegative = true;
        document.getElementById("screen").innerHTML = `<h1>-</h1>`;
      }
    default:
      break;
  }

  const inp = Number(current);

  if((inp || inp === 0) && !isSecond){ // case: input is a number and the first value
    if(isDecimal){
      handleDecimal(firstOp);
    }
    firstOp = (firstOp * 10) + (inp/(1*10**decLen));
    //the division only occurs if the decimal part is currently being written
    displayOnScreen(firstOp,decLen);
  } else if (isNaN(inp)){ // case: input is an operand
    if(isNegative){
      firstOp = -firstOp;
    }
    if(isSecond){
      isNegative = false;
      evaluateExpression();
      displayOnScreen(result,getRounding(result));
      firstOp = result; // treats result of previous operation as first value
      secondOp = 0;
      isSecond = !isSecond; // maintains the continuity when operations are chained
    }
    operation = current;
    isSecond = !isSecond;
    isDecimal = false;
    decLen = 0;
  } else{ //case: second value
    if(isDecimal){
      handleDecimal(secondOp);
    }
    secondOp = (secondOp * 10) + (inp/(1*10**decLen)); //same as above
    displayOnScreen(secondOp,decLen);
  }
}

function evaluateExpression(){
  switch (operation) {
    case "+":
      result = firstOp + secondOp;
      break;
    case "-":
      result = firstOp - secondOp;
      break;
    case "*":
      result = firstOp * secondOp;
      break;
    case "/":
      result = firstOp / secondOp;
      break;
    default:
      result = 0;
      break;
  }
}

function displayOnScreen(num,round = 6){
  if(num % 1 !== 0){ // rounds number if it's a decimal
    num = num.toFixed(round); 
  }
  if(isNegative){
    document.getElementById("screen").innerHTML = `<h1>-${num}</h1>`;
  } else document.getElementById("screen").innerHTML = `<h1>${num}</h1>`;
}

function reset(){
  firstOp = secondOp = 0;
  isSecond = false;
  isDecimal = false;
  decLen = 0;
}

function handleDecimal(decNum){
  decNum /= 10; //number gets divided by 10 so the decimal part doesn't make the number grow
  decLen++;
}

function getRounding(num){
  if(num % 1 === 0){ // check if number is whole
    return 0
  } else if (num*100000 % 1 !== 0){ //if the number still isn't whole, round to 6 decimal
    return 6;
  } else return 1+getRounding(num*10);
}