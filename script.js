let runTotal = 0,
  buffer = "0",
  previousOperat;

const $screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  $screen.innerHTML = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runTotal = 0;
      break;

    case "=":
      if (previousOperat === null) return;

      flushOper(parseInt(buffer));
      previousOperat = null;
      buffer = runTotal;
      runTotal = 0;
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
  }
}

function handleMath(symbol) {
  if (buffer === 0) return;
  const intBuffer = parseInt(buffer);

  if (runTotal === 0) {
    runTotal = intBuffer;
  } else {
    flushOper(intBuffer);
  }

  previousOperat = symbol;
  buffer = "0";
}

function flushOper(intBuffer) {
  if (previousOperat === "+") {
    runTotal += intBuffer;
  } else if (previousOperat === "−") {
    runTotal -= intBuffer;
  } else if (previousOperat === "×") {
    runTotal *= intBuffer;
  } else if (previousOperat === "÷") {
    runTotal /= intBuffer;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (e) {
      buttonClick(event.target.innerText);
    });
}

init();
