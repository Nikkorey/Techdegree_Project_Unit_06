// global variable
const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const tries = document.querySelectorAll(".tries");
let missed = 0;

// Array of Phrase
const arrayOfPhrases = [
  "Faith without action is dead",
  "Pray without ceasing",
  "I can do all things through Christ who strengthens me",
  "Be joyful always",
  "Love your enemy as you love yourself",
  "With God all things are possible",
  "Where God guides He provides",
];

//  Listen for the start game button to be pressed
startButton.addEventListener("click", (e) => {
  if (e.target.textContent === "Start Game") {
    overlay.style.display = "none";
    reset();
  } else if (e.target.textContent === "Reset Game") {
    reset();
  }
});

// return a random phrase from an array
const getRandomPhraseAsArray = (arr) => {
  let randomNumber = Math.floor(Math.random() * arr.length);
  return arr[randomNumber];
};
getRandomPhraseAsArray(arrayOfPhrases);

// adds the letters of a string to the display
const addPhraseToDisplay = (arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    const ul = document.querySelector("#phrase ul");
    const listElement = document.createElement("li");
    const listItem = document.createTextNode(arr[i]);
    ul.appendChild(listElement);
    listElement.appendChild(listItem);
    if (arr[i] === " ") {
      listElement.className = "space";
    } else {
      listElement.className = "letter";
    }
  }
};
const phraseArray = getRandomPhraseAsArray(arrayOfPhrases);
addPhraseToDisplay(phraseArray);

// check if a letter is in the phrase
const checkLetter = (button) => {
  let match = null;
  const letter = document.querySelectorAll(".letter");
  for (let i = 0; i < letter.length; i += 1) {
    const letterButton = letter[i];
    if (button === letterButton.textContent.toLowerCase()) {
      letterButton.classList.add("show");
      match = true;
    }
  }
  return match;
};

// listen for the onscreen keyboard to be clicked
keyboard.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.classList.add("chosen");
    e.target.setAttribute("disabled", true);
  }
  const letterFound = checkLetter(event.target.textContent);
  if (letterFound === null && e.target.tagName === "BUTTON") {
    let heartLives = document.querySelectorAll("img");
    heartLives[missed].setAttribute("src", "images/lostHeart.png");
    missed += 1;
  }
  checkWin(checkLetter);
});

// Check if the game has been or  lost
const checkWin = () => {
  const letter = document.querySelectorAll(".letter");
  const show = document.querySelectorAll(".show");
  const title = document.querySelector(".title");
  const subtitle = document.querySelector(".subtitle");
  if (letter.length === show.length) {
    setTimeout(() => {
      overlay.classList.remove("lose");
      overlay.classList.add("win");
      title.textContent = "YOU WIN!";
      subtitle.textContent = "You did a great job. Keep it up!";
      overlay.style.display = "flex";
      startButton.textContent = "Reset Game";
    }, 1000);
  }
  if (missed >= 5) {
    setTimeout(() => {
      overlay.classList.add("lose");
      title.textContent = "You Lose. Try again?";
      subtitle.textContent = "Keep on trying. Don't give up!";
      overlay.style.display = "flex";
      startButton.textContent = "Reset Game";
    }, 300);
  }
};

// reset game
const reset = () => {
  let buttons = document.querySelectorAll("BUTTON");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeAttribute("disabled");
    buttons[i].setAttribute("class", " ");
  }

  let heartLives = document.querySelectorAll("img");
  for (let i = 0; i < heartLives.length; i++) {
    heartLives[i].setAttribute("src", "images/liveHeart.png");
  }
  overlay.style.display = "none";

  const ul = document.querySelector("#phrase ul");
  const currentPhrase = ul.querySelectorAll("li");
  currentPhrase.forEach((char) => ul.removeChild(char));

  const phraseArray = getRandomPhraseAsArray(arrayOfPhrases);
  addPhraseToDisplay(phraseArray);

  missed = 0;
};
