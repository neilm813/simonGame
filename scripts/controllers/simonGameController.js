angular.module("simonGame").controller("simonGameController", function ($scope, $timeout) {

    // $scope.coloredSquares = {
    //   red: {
    //     isLowOpacity: true
    //   },
    //   blue: {
    //     isLowOpacity: true
    //   },
    //   green: {
    //     isLowOpacity: true
    //   },
    //   yellow: {
    //     isLowOpacity: true
    //   }
    // };

    $scope.coloredSquares = [
      {
        color: 'red',
        isLowOpacity: true
      },
      {
        color: 'blue',
        isLowOpacity: true
      },
      {
        color: 'green',
        isLowOpacity: true
      },
      {
        color: 'yellow',
        isLowOpacity: true
      }
    ];

    $scope.currentRoundCorrectCount = 0;
    $scope.currentRound = 0;
    $scope.simonSequence = [];
    var isDisplaySimonSequenceInProgress = true;
    var chosenSequence = [];
    var additionalReadyMessages = ['Being ready is non-negotiable', 'Get ready to be ready', 'Readiness is next to godliness', 'You will never fully be ready. Ready to never be fully ready?'];
    var readyCounter = 0;
    startGame();

    function startGame() {
      $timeout(function() {

          isReady = confirm("Ready?");
      
          while (isReady == false) {
      
            isReady = confirm(additionalReadyMessages[readyCounter]);
            
            if (readyCounter < additionalReadyMessages.length - 1) {
              readyCounter += 1;
            }
          }
          resetGameState();
          addColorToSimonSequence();
      });
    }

    function resetGameState() {
      $scope.currentRound = 0;
      $scope.currentRoundCorrectCount = 0;
      $scope.simonSequence = [];
      chosenSequence = [];
      readyCounter = 0;
    }
  
    function randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function addColorToSimonSequence() {

      var randomIdx = randomIntFromInterval(0, $scope.coloredSquares.length - 1);
      $scope.simonSequence.push($scope.coloredSquares[randomIdx]);
      
      // timeout in case the first square of simonSequence is the same square the user clicked on
      // to prevent two highlights looking like 1 highlight
      $timeout(function() {
        displaySimonSequence($scope.simonSequence);
      }, 400);
    }

    $scope.squareClick = function(square) {
      if (!isDisplaySimonSequenceInProgress) {

        // highlight the clicked square
        square.isLowOpacity = false;
        chosenSequence.push(square.color);
  
        $timeout(function() {
          // un-highlight the clicked square
          square.isLowOpacity = true;

          // needs to be inside the timeout so the displaySimonSequence doesn't start before the clicked square is unhighlighted
          verifyColorChoice();
        }, 200);
      }
    }

    // On each square click, verify the choice
    function verifyColorChoice() {
      if (chosenSequence[$scope.currentRoundCorrectCount] !== $scope.simonSequence[$scope.currentRoundCorrectCount].color) {
  
        alert("All Games Must Meet Their Inevitable Demise");
        // reset game
        startGame();
      }
      else {
        $scope.currentRoundCorrectCount += 1;
  
        if ($scope.currentRoundCorrectCount === $scope.simonSequence.length) {
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

    var displaySequenceCount = 0;
    function displaySimonSequence(simonSequence) {
      
      isDisplaySimonSequenceInProgress = true;

      // finished displaying sequence, break out of recursive cycle
      if (displaySequenceCount === simonSequence.length) {

        isDisplaySimonSequenceInProgress = false;
        displaySequenceCount = 0;
        return;
      }

      var currentSquare = simonSequence[displaySequenceCount];
      displaySequenceCount += 1;
      
      currentSquare.isLowOpacity = false;
      
      $timeout(function () {
        currentSquare.isLowOpacity = true;

        // In case the same square is highlighted 2x in a row, otherwise it would look like 1 highlight
        $timeout(function () { 
          displaySimonSequence(simonSequence) 
        }, 200);
        // how long square stays highlighted
      }, 400);
    }
});
