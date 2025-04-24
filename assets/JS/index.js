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
    case "/":
      return Div(a, b);
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
const delButton = document.querySelector(".del-button");
const equalButton = document.querySelector(".data-equal");
//end Variables

//functions
function updateDisplay() {
  previousOperandTextElement.innerText = previousOperand;
  currentOperandTextElement.innerText = currentOperand;
}

function appendNumber(digit) {
  if (digit === "." && currentOperand.toString().includes(".")) return;
  currentOperand = currentOperand.toString() + digit.toString();
}

function chooseOperation(op) {
  if (currentOperand === "0" || currentOperand === "") {
    return;
  }
  if (previousOperand !== "" && currentOperand !== "") {
    compute();
  }
  operation = op;
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
  updateDisplay();
}

function delNumber() {
  if (currentOperand.length > 1) {
    currentOperand = currentOperand.slice(0, -1);
  } else {
    currentOperand = "0";
  }
  updateDisplay();
}
//end functions

//eventButton
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);
    updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  allClear();
  updateDisplay();
  currentOperandTextElement.textContent = "0";
});

delButton.addEventListener("click", () => {
  delNumber();
  updateDisplay();
});

chooseOperate.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);
  });
});

equalButton.addEventListener("click", () => {
  compute();
});

//end eventButtons

//Keyboard support
document.addEventListener("keydown", (event) => {
  if (event.key >= "0" && event.key <= "9") {
    appendNumber(event.key);
    updateDisplay();
  } else if (["+", "-", "*", "/", "÷"].includes(event.key)) {
    chooseOperation(event.key);
  } else if (event.key === "Enter") {
    if (previousOperand && currentOperand) {
      compute();
      updateDisplay();
    }
  } else if (event.key === "Backspace") {
    delNumber();
    updateDisplay();
  } else if (event.key.toLowerCase() === "c") {
    allClear();
    updateDisplay();
  }
});
//end Keyboard support
