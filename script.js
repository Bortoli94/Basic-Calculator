let runningTotal = 0;
let buffer = "0";
let previousOperator;
let history = "0";

const screen = document.querySelector(".screen");
const screenHistory = document.querySelector(".history");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
  screenHistory.innerText = history;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      history = 0;
      break;
    case "=":
      if (previousOperator == null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      history = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
        handleMath(symbol);
        break;
    default:
      break;
  }
}

function handleMath(symbol){
    if (buffer === '0') {
        return;
    }

    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    history = buffer + previousOperator;
    buffer = "0";
}

function flushOperation(intBuffer){
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    }else if (previousOperator === '−') {
        runningTotal -= intBuffer
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer
    }else if (previousOperator === '÷' ) {
        runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
    if (buffer === "0") {
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    }) 
}

init();