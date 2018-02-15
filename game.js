var inquirer = require('inquirer');
var word = require('./word');
var letter = require('./letter');


// VARIABLES
var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var wordArr = [];
var lettersArr = [];
var spaceCount = 0;
var remainingNum = 0;
var extraChancesNum = 5;
var gameOver = false;


// MAIN GAME OBJECT
var game = {
  firstRun: function() {
    console.log('\n');
    console.log('\x1b[44m%s\x1b[0m', ' Guess the Names of Hip Hop Greats! ');
    console.log('\n');
    this.initGame();
  },
  secondRun: function() {
    console.log('\n');
    console.log('\x1b[45m%s\x1b[0m', ' Ok, let\'s play more... ');
    console.log('\n');
    this.initGame();
  },
  initGame: function() {
    wordArr = [];
    lettersArr = [];
    spaceCount = 0;
    remainingNum = 0;
    gameOver = false;
    var newWord = word[Math.floor(Math.random() * word.length)];
      // console.log('newWord: ' + newWord + '\n');
    wordArr = newWord.split('');
    var lowerWord = newWord.toLowerCase(); // for compareLetters();
    wordArrLower = lowerWord.split(''); // for compareLetters();
    for (var i = 0; i < wordArr.length; i++) {
      lettersArr.push(new letter(wordArr[i]));
      if (wordArr[i] === ' ') {
        spaceCount++;
      }
    }
    var charCount = (wordArr.length) - spaceCount;
    remainingNum = charCount + extraChancesNum;
      // console.log('remainingNum: ' + remainingNum);
    this.buildDisplayString(lettersArr);
  },
  buildDisplayString: function(lettersArr) {
    var displayString = '';
    for (var i = 0; i<lettersArr.length; i++) {
        if (lettersArr[i].isVisible) {
            displayString += lettersArr[i].value;
        } else {
            displayString += '_';
        }
    }
    console.log(displayString.split('').join(' ') + '\n');
    this.checkForLoss();
    this.checkForWin();
      // console.log('build display gameOver before userInput(): ' + gameOver);
    if (!gameOver) {
      userInput();
    }
    return displayString;
  },
  updateDisplayString: function() {
      // console.log('updateDisplayString()');
    displayString = this.buildDisplayString(lettersArr);
  },
  compareLetters: function(letter) {
      // console.log('compareLetters()');
    var match = wordArrLower.indexOf(letter);
    if (match !== -1) {
      console.log('\x1b[32m%s\x1b[0m', '\nCORRECT!!\n');
    } else {
      remainingNum--;
      console.log('\x1b[31m%s\x1b[0m', '\nWrong. Try again.\n');
      console.log(remainingNum + ' guesses remaining.\n');
    }
    this.revealLetter(letter);
  }, 
  revealLetter: function(letter) {
      // console.log('revealLetter()');
    for (var i = 0; i < lettersArr.length; i++) {
        if (letter.toLowerCase() === lettersArr[i].value.toLowerCase()) {
            lettersArr[i].isVisible = true
        }
    }
    this.updateDisplayString();
  },
  checkForLoss: function() {
      // console.log('checkForLoss()');
    if (remainingNum === 0) {
      console.log('\n');
      console.log('\x1b[41m%s\x1b[0m', ' Sorry, you ran out of guesses. ');
      console.log('\n');
      gameOver = true;
      // console.log('checkForLoss() gameOver: ' + gameOver);
      playAgain();
      return false;
    }
    return true;
  },
  checkForWin: function() {
      // console.log('checkForWin()');
    for (var i = 0; i < lettersArr.length; i++) {
      if (!lettersArr[i].isVisible) {
        return false;
      }
    }
    console.log('\n');
    console.log('\x1b[42m%s\x1b[0m', ' Awesome! You got it! ');
    console.log('\n');
    gameOver = true;
      // console.log('checkForWin() gameOver: ' + gameOver);
    playAgain();
    return true;
  }
}
game.firstRun();


// INQUIRER USER INPUT 
function userInput() {
    // console.log('userInput()');

  var question = [
    {
      name: 'letter',
      message: 'Guess a letter:',
      type: 'input',
      filter: function(answer) {
        return answer.toLowerCase();
      },
      validate: function(answer) {
        var alphaIncl = alphabet.includes(answer);
        if ((answer.length !== 1) || (!alphaIncl)) {
          return 'Please, enter one letter.';
        }
        return true;
      }
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    game.compareLetters(answer.letter);
  });

}

function playAgain() {

  var question = [
    {
      name: 'restart',
      message: 'Do you want to play more?',
      type: 'list',
      choices: ['Yes, I do', 'No, thanks']
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    if (answer.restart === 'Yes, I do') {
      game.secondRun();
    } else {
      printArtists();
    }
  });

}

function printArtists() {

  var question = [
    {
      name: 'artists',
      message: 'Would you like to see the full list of hip hop greats?',
      type: 'list',
      choices: ['Yes, I would', 'No, thanks']
    }
  ];

  inquirer.prompt(question).then(function(answer) {
    if (answer.artists === 'Yes, I would') {
      /* 
        I wanted to invoke ArtistName.prototype.printInfo() from word.js, 
        but I don't know how to do that: 
        
        var artistList = new ArtistName(phrases);
        artistList.printInfo();

      */
      console.log(word);
      return false;
    } else {
      return false;
    }
  });

}
