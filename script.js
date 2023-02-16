const gameContainer = document.getElementById("game");
const countContainer = document.getElementById("score")
const buttonStart = document.querySelector("#start");
const buttonReset = document.querySelector("#reset");

let guessCount = 1;
let noClicking = true;
let previousCard= null;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  } 
}
// TODO: Implement this function!
function handleCardClick(event) {
  if (event.target.classList.contains("flipped")) return;
  if(noClicking) return;
 
  let currentCard = event.target;
  
  console.log("current target = ", currentCard);
  currentCard.style.backgroundColor = currentCard.className;
  
  // if first click is empty
if(previousCard === null){
  currentCard.classList.add("flipped");
  previousCard = event.target;
  console.log("previous", previousCard);
  } 
    // else if (previousCard.classList.contains("flipped") && currentCard.classList.contains("flipped")){ //<-- my complex ass solution to  if (event.target.classList.contains("flipped")) return;
    // previousCard = currentCard;
    // console.log('does it work', previousCard);
    // } 
  else if (previousCard.className[0] === currentCard.className[0]) {
    currentCard.removeEventListener("click", handleCardClick);
    previousCard.removeEventListener("click", handleCardClick);
    previousCard = null;
    score.textContent = guessCount ++;
    console.log("should be null", previousCard);
  } else if (previousCard.className[0] !== currentCard.className[0]){
    noClicking = true;
    setTimeout(function(){
      currentCard.classList.remove("flipped");
      previousCard.classList.remove("flipped");
      previousCard.style.backgroundColor = '';
      currentCard.style.backgroundColor = '';
      currentCard = null;
      previousCard = null;
      noClicking = false;
    }, 1000);
    score.textContent = `Guesses: ${guessCount ++}`;
  } 
}

function startGame(){
  createDivsForColors(shuffledColors);
  buttonStart.remove();
  noClicking = false;
}

buttonStart.addEventListener('click', function() {
  startGame();
  noClicking = false;
  console.log('start');
})

buttonReset.addEventListener('click', function() {
  location.reload();
});
