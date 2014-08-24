var ApplicationController = function($scope) {
  $scope.user = {
    email: '',
    passsword: ''
  };

  $scope.customer = {
    firstName: '',
    lastName: '',
    creditCard: '',
    hasValidCreditCard: false,
    isValid: false
  };

  $scope.customers = [];
};

module.exports = ApplicationController;
