var passwordDirective = function() {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function(scope, elem, attr, ngModel) {
      if(!ngModel) return;

      function isValid(value) {
        if(value && value.length > 7) {
          return true;
        } else {
          return false;
        }
      }

      ngModel.$parsers.unshift(function(value) {
          ngModel.$setValidity('password', isValid(value));
          return value;
      });
    }
  }
};

module.exports = passwordDirective;
