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

    $scope.squareClick = function(color) {
      var clickedSquare = $scope.coloredSquares[color];

      clickedSquare.isLowOpacity = false;
      chosenSequence.push(color);

      $timeout(function() {
        clickedSquare.isLowOpacity = true;
      }, 200);
    }
});
