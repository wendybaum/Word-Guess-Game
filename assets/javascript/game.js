var game = {
  // word presented randomly to be guessed
  wordArr: [
    {
      word: "blueberry",
      image: "assets/images/BlueberryBee.jpg"
    },
    {
      word: "bumble",
      image: "assets/images/BumbleBee.jpg"
    },
    {
      word: "carpenter",
      image: "assets/images/CarpenterBee.jpg"
    },
    {
      word: "colletes",
      image: "assets/images/ColletesBee.jpg"
    },
    {
      word: "cuckoo",
      image: "assets/images/CuckooBee.jpg"
    },
    {
      word: "sweat",
      image: "assets/images/SweatBee.jpg"
    },
    {
      word: "furrow",
      image: "assets/images/FurrowBee.jpg"
    },
    {
      word: "leafcutter",
      image: "assets/images/LeafCutterBee.jpg"
    },
    {
      word: "mason",
      image: "assets/images/MasonBee.jpg"
    },
    {
      word: "plasterer",
      image: "assets/images/PlastererBee.jpg"
    }
  ],
  // possible letter choices
  letterArr: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ],

  correctGuessArr: [],
  incorrectGuessesArr: [],
  letterGuessed: "",
  numCorrectGuesses: 0,
  numIncorrectGuesses: 0,
  numGuessesToGo: 10,

  randomWord: "",
  randomWordImage: "",

  // get random word from possible words with related image
  initRandoms: function() {   
    var randomNumber = Math.floor(Math.random() * this.wordArr.length);
    this.randomWord = this.wordArr[randomNumber].word.toLowerCase();  
    console.log(this.randomWord) 
    this.randomWordImage = this.wordArr[randomNumber].image;
  },

  // placeholder for letter guesses
  initWordGuesses: function() {    
    for (var i = 0; i < this.randomWord.length; i++) {
      this.correctGuessArr[i] = "_";
    }
    this.displayCurrentChoices();
  },
  
  init: function() {    
    this.initRandoms();
    this.initWordGuesses();
    this.showImage(this.randomWordImage);
    this.showGuessesLeft();
  },

  // check if guessed letter matches the random word, store the match(s) which may be duplicates
  checkForMatches: function() {   
    for (var j = 0; j < this.randomWord.length; j++) {
      if (this.letterGuessed === this.randomWord[j]) {
        this.correctGuessArr[j] = this.letterGuessed;
      }
    }
  },

  lettersToWord: function(arr) {
    var result = "";
    var i;
    for (i = 0; i < arr.length; i++) {
      result = result + arr[i];
    }
    return result;
  }, 
  
  /** DOM functions */
  
  replay: function() {
    document.location.reload();
  },

  playAudio: function() {
    document.getElementById("beeBuzz").play();
  },

  pauseAudio: function() {
    document.getElementById("beeBuzz").pause();
  },

  displayCurrentChoices: function() {
    var currentWord = document.querySelector("#currentWord");
    currentWord.innerHTML = this.correctGuessArr.join(" ");
  },

  showImage: function() {
    var pictureDisplay = document.querySelector("#pictureDisplay");
    pictureDisplay.src = this.randomWordImage;
  },

  showGuessesLeft: function() {
    var guessesLeft = document.querySelector("#guessesLeft");
    guessesLeft.textContent = this.numGuessesToGo;
  },

  showCorrectGuesses: function() {
    var lettersCorrect = document.querySelector("#lettersCorrect");
    lettersCorrect.textContent = this.numCorrectGuesses;
  },

  showInCorrectGuesses: function() {
    var lettersWrong = document.querySelector("#lettersWrong");
    lettersWrong.textContent = this.incorrectGuessesArr.join(", ");
  },

  /** MAIN controller */
  play: function(event) {    
    this.letterGuessed = event.key;
    // guessed letter found
    if (this.randomWord.indexOf(this.letterGuessed) > -1) {      
      this.checkForMatches(this.letterGuessed);
      this.displayCurrentChoices();
      this.numCorrectGuesses++;
      this.numGuessesToGo--;
      this.showGuessesLeft();
      this.showCorrectGuesses();
      if (
        this.numGuessesToGo == 0 ||
        this.randomWord == this.lettersToWord(this.correctGuessArr)
      ) {
        this.playAudio();        
        alert(
          "You won! You guessed correctly it was a " +
            this.randomWord + " bee."
        );
        this.replay();
      }
    }
    // guessed letter not found
    else {
      this.numGuessesToGo--;
      this.incorrectGuessesArr.push(this.letterGuessed);
      this.showInCorrectGuesses();
      this.showGuessesLeft();
      if (this.numGuessesToGo === 0) {
        alert(
          "You lost this one, try again! It was a " + this.randomWord + " bee."
        );
        this.replay();
      }
    }    
  },

};

/** event listeners */
// TODO: fix this; doesn't load page correctly
game.init();
// document.addEventListener("load", function() {
//   game.init();
// });


//listen for input key events (lower case only permitted); check if letter selected exists in current random word
document.addEventListener("keyup", function(event) {
  var input = String.fromCharCode(event.keyCode).toLowerCase();
  if (/[a-z]/.test(input)) {    
    game.play(event);
  } else {
    alert("Select a lowercase letter of the alphabet: a-z");
  }
});
