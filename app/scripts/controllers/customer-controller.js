var CustomerController = function($scope) {
	$scope.saveCustomer = function() {
		$scope.customers.push($scope.customer);
	};

	$scope.change = function() {
    if($scope.customer.creditCard && $scope.customer.creditCard.length > 0) {
      $scope.customer.hasValidCreditCard = isValid($scope.customer.creditCard);
    }

    $scope.customer.isValid =
      $scope.customer.firstName && $scope.customer.firstName.length > 0 &&
      $scope.customer.lastName && $scope.customer.lastName.length > 0 &&
      $scope.customer.hasValidCreditCard
	};

	function isValid(value) {
    if(/[^0-9-\s]+/.test(value)) return false; 
		// The Luhn Algorithm. It's so pretty. (https://gist.github.com/DiegoSalazar/4075533)
    var nCheck = 0, nDigit = 0, bEven = false;
    value = value.replace(/\D/g, ""); 

    for (var n = value.length - 1; n >= 0; n--) {
      var cDigit = value.charAt(n),
          nDigit = parseInt(cDigit, 10);

      if(bEven && (nDigit *= 2) > 9) {
        nDigit -= 9; 
      }
      nCheck += nDigit;
      bEven = !bEven;
    } 
    return (nCheck % 10) == 0;
  }
};

module.exports = CustomerController;