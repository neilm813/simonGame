angular.module("simonGame").controller("simonGameController", function ($scope) {

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

    $scope.squareClick = function(color) {
      chosenSequence.push(color);
      console.log(chosenSequence.toString());
    }
});
