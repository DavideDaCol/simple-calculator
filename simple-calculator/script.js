const buttons = document.querySelectorAll("button");
let result = 0;
let isSecond = false;
let firstOp = 0;
let secondOp = 0;
let operation = "";

buttons.forEach(el => {
  el.addEventListener("click", () => {
    if (el.value === "="){
      evaluateExpression();
      displayOnScreen(result);
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
  }
  const inp = Number(current);
  if(inp && !isSecond){ // case: input is a number and the first value
    firstOp = (firstOp * 10) + inp;
    displayOnScreen(firstOp);
  } else if (isNaN(inp)){ // case: input is an operand
    if(isSecond){
      console.log("yuh");
      
      evaluateExpression();
      displayOnScreen(result);
      firstOp = result; // treats result of previous operation as first value
      secondOp = 0;
      isSecond = !isSecond; // maintains the second value case
    }
    operation = current;
    isSecond = !isSecond;
  } else{
    secondOp = (secondOp * 10) + inp;
    displayOnScreen(secondOp);
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
      break;
  }
}

function displayOnScreen(num){
  if(num % 1 !== 0){ // rounds number if it's a decimal
    num = num.toFixed(6); 
  }
  document.getElementById("screen").innerHTML = `<h1>${num}</h1>`;
}

function reset(){
  firstOp = secondOp = 0;
  isSecond = false;
}