const buttons = document.querySelectorAll("button");
let calcMemory = [];

buttons.forEach(el => {
  el.addEventListener("click", () => {
    if (el.value === "="){
      evaluateExpression();
      calcMemory.length = 0; // clears array
    } else {
      parseInput(el.value);
    }
  })
})

function parseInput(inp) {
  if(isNaN(Number(inp))){ // check if the symbol cannot be converted to a number (so if it is an operator)
    calcMemory.push(inp);
  } else calcMemory.push(Number(inp));
  console.log(calcMemory);
}