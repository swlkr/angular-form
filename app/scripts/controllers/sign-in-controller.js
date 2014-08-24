var SignInController = function($scope) {
  $scope.signIn = function() {
    console.log("Hello from the sign in function, email: " + $scope.user.email + " password: " + $scope.user.password);
  }
};

module.exports = SignInController;
