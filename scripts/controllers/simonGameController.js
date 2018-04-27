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

    var chosenSequence = [];
    var simonSequence = [];
    var possibleColors = Object.keys($scope.coloredSquares);
    addColorToSimonSequence();

    function randomIntFromInterval (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function addColorToSimonSequence() {
      var randomIdx = randomIntFromInterval(0, possibleColors.length - 1);
      simonSequence.push(possibleColors[randomIdx]);
      console.log(simonSequence);
    }

    $scope.squareClick = function(color) {
      var clickedSquare = $scope.coloredSquares[color];

      clickedSquare.isLowOpacity = false;
      chosenSequence.push(color);

      $timeout(function() {
        clickedSquare.isLowOpacity = true;
      }, 200);
    }
});
