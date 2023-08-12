const spinButton = document.getElementById("spin");
const arrow = document.getElementById("arrow");
const hi = document.getElementById("hi");
const lo = document.getElementById("lo");
const bet = document.getElementById("bet");

const money = document.getElementById("money");
let currentMoney = 50;
renderMoney();

spinButton.onclick = (e) => {
  checkSufficientFunds();
  checkBettingOptions();
  checkEnteredValue();
  setButtonDisabled(true);
  currentMoney = currentMoney - bet.value;
  renderMoney();
  const cssRotate = arrow.style.transform;
  const previousAngle = extractRotationAngle(cssRotate);
  const rotationToBeAdded = getRandomNumberInRange(360, 3600);
  const newAngle = previousAngle + rotationToBeAdded;

  setNewAngle(arrow, newAngle);
  const isHigh = isAngleHigh(newAngle);
  setTimeout(() => {
    determineBetOutcome(isHigh);
  }, 3000);
};

function checkSufficientFunds() {
  if (bet.value > currentMoney) {
    throw Error("Insufficient Funds!");
  }
}

function checkEnteredValue() {
  const isValid = /^[0-9]+$/.test(bet.value);

  if (!isValid) {
    alert("Invalid Input!");
    throw Error("Invalid input!");
  }
}

function checkBettingOptions() {
  if (!hi.checked && !lo.checked) {
    alert("Please check a betting option");
    throw Error("No Option Selected!");
  }
}

function isAngleHigh(angleDegrees) {
  const angleModulo = angleDegrees % 360;
  const midpoint = 180;

  if (angleModulo > midpoint) {
    return true;
  } else if (angleModulo < midpoint) {
    return false;
  } else {
    return true;
  }
}

function extractRotationAngle(inputString) {
  const regex = /rotate\((\d+)deg\)/;
  const match = inputString.match(regex);

  if (match && match[1]) {
    const angle = parseInt(match[1]);
    return angle;
  } else {
    return null; // Return null if no angle is found
  }
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNewAngle(element, newAngle) {
  element.style.transform = `rotate(${newAngle}deg)`;
}

function determineBetOutcome(isSpinnerHigh) {
  const userSelectedHigh = hi.checked ? true : false;
  if (userSelectedHigh && isSpinnerHigh) {
    handleWin();
  } else {
    handleLose();
  }
  setButtonDisabled(false);
}

function handleWin() {
  const winnings = bet.value * 2;
  currentMoney = currentMoney + winnings;
  renderMoney();
  alert("You won!");
}

function handleLose() {
  alert("You lost!");
}

function renderMoney() {
  money.innerHTML = `Money: ${currentMoney}`;
}

function setButtonDisabled(isDisabled) {
  if (isDisabled) {
    spinButton.disabled = true;
    spinButton.innerHTML = "Spinning...";
  } else {
    spinButton.disabled = false;
    spinButton.innerHTML = "Spin!";
  }
}
