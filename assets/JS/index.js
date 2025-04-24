//basic calculation function
function Sum(a, b) {
  return a + b;
}

function Sub(a, b) {
  return a - b;
}

function Div(a, b) {
  //   if (b === 0) {
  //     return "LMAO";
  //   }
  //   return a / b;
  return b === 0 ? "LMAO" : a / b;
}

function Multiply(a, b) {
  return a * b;
}
//end basic calculation function

//operate function
function operate(operation, a, b) {
  switch (operation) {
    case "+":
      return Sum(a, b);
    case "-":
      return Sub(a, b);
    case "÷":
      return Div(a, b);
    case "*":
      return Multiply(a, b);
    default:
      return;
  }
}
//end operate function

//Variables
let previousOperand = "";
let currentOperand = "";
let operation = undefined;
const numberButtons = document.querySelectorAll(".data-number");
const chooseOperate = document.querySelectorAll(".data-operation");
const previousOperandTextElement = document.querySelector(".previous-operand");
const currentOperandTextElement = document.querySelector(".current-operand");
const allClearButton = document.querySelector(".all-clear");
const deleteButton = document.querySelector(".del-button");
const equalButton = document.querySelector(".data-equal");
//end Variables

//functions
function updateDisplay() {
  previousOperandTextElement.innerText = previousOperand;
  currentOperandTextElement.innerText = currentOperand;
}

function appendNumber(button) {
  const digit = button.innerText;
  if (digit === "." && currentOperand.toString().includes(".")) return;
  currentOperand = currentOperand.toString() + digit.toString();
}

function chooseOperation(button) {
  if (currentOperand === "0" || currentOperand === "") {
    currentOperandTextElement.textContent = "0";
    return;
  }
  if (previousOperand !== "" && currentOperand !== "") {
    compute();
  }
  operation = button.innerText;
  previousOperand = `${currentOperand} ${operation}`;
  currentOperand = "";
  updateDisplay();
}

function compute() {
  let result;
  let prev = parseFloat(previousOperand.split(" ")[0]); //tách phép toán previous giữ lại số.
  let curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return; // xét giá trị hợp lệ
  result = operate(operation, prev, curr); //tính
  currentOperand = result.toString();
  operation = undefined; //reset phép toán
  previousOperand = ""; //reset previous display
  updateDisplay();
}

function allClear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

function deleteNumber() {
  currentOperand = currentOperand.slice(0, -1);
}
//end functions

//eventButton
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button);
    updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  allClear();
  updateDisplay();
  currentOperandTextElement.textContent = "0";
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});

chooseOperate.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button);
  });
});

equalButton.addEventListener("click", () => {
  compute();
});
//end eventButtons
