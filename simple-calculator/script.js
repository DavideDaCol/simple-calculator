const buttons = document.querySelectorAll("button");
let result = 0;
let isSecond = false;
let isDecimal = false;
let decLen = 0;
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
  if(current === "AC"){
    displayOnScreen(0);
    reset();
    return;
  } else if (current === "."){
    isDecimal = true;
    if(isSecond){
      document.getElementById("screen").innerHTML = `<h1>${secondOp}.</h1>`;
    } else document.getElementById("screen").innerHTML = `<h1>${firstOp}.</h1>`;
    return;
  }
  const inp = Number(current);
  if((inp || inp === 0) && !isSecond){ // case: input is a number and the first value
    if(isDecimal){
      firstOp /= 10;
      decLen++;
    }
    firstOp = (firstOp * 10) + (inp/(1*10**decLen));
    displayOnScreen(firstOp,decLen);
  } else if (isNaN(inp)){ // case: input is an operand
    if(isSecond){
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
  } else{
    if(isDecimal){
      secondOp /= 10;
      decLen++;
    }
    secondOp = (secondOp * 10) + (inp/(1*10**decLen));
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
  document.getElementById("screen").innerHTML = `<h1>${num}</h1>`;
}

function reset(){
  firstOp = secondOp = 0;
  isSecond = false;
  isDecimal = false;
  decLen = 0;
}

function getRounding(num){
  if(num % 1 === 0){ // check if number is whole
    return 0
  } else if (num*100000 % 1 !== 0){ //if the number still isn't whole, round to 6 decimal
    return 6;
  } else return 1+getRounding(num*10);
}