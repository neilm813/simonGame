angular.module("simonGame").controller("simonGameController", function ($scope, $timeout) {

    $scope.coloredSquares = {
      red: {
        isLowOpacity: true
      },
      blue: {
        isLowOpacity: true
      },
      green: {
        isLowOpacity: true
      },
      yellow: {
        isLowOpacity: true
      }
    };

    $scope.currentRoundCorrectCount = 0;
    $scope.currentRound = 0;
    $scope.simonSequence = [];
    var isDisplaySimonSequenceInProgress = true;
    var chosenSequence = [];
    var possibleColors = Object.keys($scope.coloredSquares);
    var additionalReadyMessages = ['Being ready is non-negotiable', 'Get ready to be ready', 'Readiness is next to godliness', 'You will never fully be ready. Ready to never be fully ready?'];
    var readyCounter = 0;
    startGame();

    function startGame() {
      isReady = confirm("Ready?");
  
      while (isReady == false) {
  
        isReady = confirm(additionalReadyMessages[readyCounter]);
        if (readyCounter < additionalReadyMessages.length - 1) {
          readyCounter += 1;
        }
      }
      resetGameState();
      addColorToSimonSequence();
    }

    function resetGameState() {
      $scope.currentRound = 0;
      $scope.currentRoundCorrectCount = 0;
      chosenSequence = [];
      $scope.simonSequence = [];
      readyCounter = 0;
    }
  
    function randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function addColorToSimonSequence() {

      var randomIdx = randomIntFromInterval(0, possibleColors.length - 1);
      $scope.simonSequence.push(possibleColors[randomIdx]);
      
      // timeout in case the first square of simonSequence is the same square the user clicked on
      // to prevent two highlights looking like 1 highlight
      $timeout(function() {
        displaySimonSequence($scope.simonSequence);
      }, 400);
    }

    $scope.squareClick = function(color) {
      if (!isDisplaySimonSequenceInProgress) {

        var clickedSquare = $scope.coloredSquares[color];
  
        // highlight the clicked square
        clickedSquare.isLowOpacity = false;
        chosenSequence.push(color);
  
        $timeout(function() {
          // un-highlight the clicked square
          clickedSquare.isLowOpacity = true;

          // needs to be inside the timeout so the displaySimonSequence doesn't start before the clicked square is unhighlighted
          verifyColorChoice();
        }, 200);
      }
    }

    function verifyColorChoice() {
      if (chosenSequence[$scope.currentRoundCorrectCount] != $scope.simonSequence[$scope.currentRoundCorrectCount]) {
  
        alert("All Games Must Meet Their Inevitable Demise");
        // reset game
        startGame();
      }
      else {
        $scope.currentRoundCorrectCount += 1;
  
        if ($scope.currentRoundCorrectCount == $scope.simonSequence.length) {
          newRound();
        }
      }
    }

    function newRound() {
      // New round, reset the currentRound count. Timeout so the currentRoundCorrect count can be seen briefly before the newRound wipes it
      // Reset chosen sequence each round since the player must choose the full correct sequence again
      chosenSequence = [];

      $timeout(function() {
        $scope.currentRoundCorrectCount = 0;
        $scope.currentRound += 1;
        addColorToSimonSequence();
      }, 400);
    }

    function displaySimonSequence(simonSequence) {
      
      isDisplaySimonSequenceInProgress = true;

      // copy to break reference so simonSequence array is not affected
      var sequenceCopy = angular.copy(simonSequence);

      if (sequenceCopy.length == 0) {

        isDisplaySimonSequenceInProgress = false;
        return;
      }

      var currentSquare = $scope.coloredSquares[sequenceCopy.splice(0, 1)];

      currentSquare.isLowOpacity = false;
      
      $timeout(function () {
        currentSquare.isLowOpacity = true;

        // In case the same square is highlighted 2x in a row, otherwise it will look like 1 highlight
        $timeout(function () { 
          displaySimonSequence(sequenceCopy) 
        }, 200);
        // how long square stays highlighted
      }, 400);
    }
});
