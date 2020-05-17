// global variable
const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const startButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");
const tries = document.querySelectorAll(".tries");
let missed = 0;

// Array of Phrase
const arrayOfPhrases = [
  "Once in a blue moon",
  "The snow was freezing cold",
  "The fancy cat walked to the fair",
  "In the kitchen you will find my mom",
  "The flag flying at half mast",
];

//  Listen for the start game button to be pressed
startButton.addEventListener("click", () => {
  overlay.style.display = "none";
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
  if (e.target === "button") {
    e.target.classList.add("chosen");
    e.target.setAttribute("disabled", true);
  }
  const letterFound = checkLetter(event.target.textContent);
  if (letterFound === null) {
    let img = document.querySelectorAll("img");
    img[missed].setAttribute("src", "images/lostHeart.png");
    missed += 1;
  }
});
