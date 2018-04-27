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
    var chosenSequence = [];
    var possibleColors = Object.keys($scope.coloredSquares);
    addColorToSimonSequence();

    function randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function addColorToSimonSequence() {
      var randomIdx = randomIntFromInterval(0, possibleColors.length - 1);
      $scope.simonSequence.push(possibleColors[randomIdx]);
      console.log($scope.simonSequence.toString());
    }

    $scope.squareClick = function(color) {
      var clickedSquare = $scope.coloredSquares[color];

      clickedSquare.isLowOpacity = false;
      chosenSequence.push(color);

      $timeout(function() {
        clickedSquare.isLowOpacity = true;
      }, 200);

      verifyColorChoice();
    }

    function verifyColorChoice() {
      if (chosenSequence[$scope.currentRoundCorrectCount] != $scope.simonSequence[$scope.currentRoundCorrectCount]) {
  
        alert("All Games Must Meet Their Inevitable Demise");
        // reset game
      }
      else {
        $scope.currentRoundCorrectCount += 1;
  
        if ($scope.currentRoundCorrectCount == $scope.simonSequence.length) {
  
          addColorToSimonSequence();
          $scope.currentRound += 1;
          // Reset chosen sequence each round since they need to start over every round
          chosenSequence = [];
          // New round, reset the correct count
          $scope.currentRoundCorrectCount = 0;
        }
      }
    }
});
