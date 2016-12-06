var app = angular.module("salaryTaxApp", ["ngRoute", "ngAnimate", "chart.js"]);
app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    controller: 'homeCtrl'
  }).when('/calculator', {
    templateUrl: 'views/calculator.html',
    controller: 'mainCtrl'
  }).otherwise({
    redirectTo: '/home'
  });
}]);
app.controller('homeCtrl', function($scope) {
    
    $scope.pageClass = 'page-home';
});
app.controller('mainCtrl', function($scope) {
  $scope.grossSalaryYearly = 0;
  $scope.grossSalaryMonthly = 0;
  $scope.grossSalaryWeekly = 0;
  $scope.allowanceYearly = 0;
  $scope.allowanceMonthly = 0;
  $scope.allowanceWeekly = 0;
  $scope.taxableYearly = 0;
  $scope.taxableMonthly = 0;
  $scope.taxableWeekly = 0;
  $scope.taxdueYearly = 0;
  $scope.taxdueMonthly = 0;
  $scope.taxdueWeekly = 0;
  $scope.studentLoanYearly = 0;
  $scope.studentLoanMonthly = 0;
  $scope.studentLoanWeekly = 0;
  $scope.niYearly = 0;
  $scope.niMonthly = 0;
  $scope.niWeekly = 0;
  $scope.deductionsYearly = 0;
  $scope.deductionsMonthly = 0;
  $scope.deductionsWeekly = 0;
  $scope.netYearly = 0;
  $scope.netMonthly = 0;
  $scope.netWeekly = 0;
    
    $scope.pageClass = 'page-calculator';
    
    $scope.show = 1;
    
    $scope.loan ='noLoan';
    
    $scope.age = 'under';
    
    $scope.selectChart = 'pie';
    
     Chart.defaults.global.defaultFontColor = '#fff';
    


  $scope.addGrossSalary = function() {
      //gross salary
      $scope.grossSalaryYearly = $scope.userGrossSalary;
      $scope.grossSalaryMonthly = ($scope.userGrossSalary) / 12;
      $scope.grossSalaryWeekly = ($scope.grossSalaryYearly) / 52;
      allowance();
      //The amount that can be taxed
      getTaxable();
      //The amount of tax you pay from how much you earn
      getTaxDue();
      
      //student loan
      getStudentLoan();
      



                  
      getNI();
      getDeductions();
      getNetSalary();
      
      
      $scope.labels = ["Student Loan","Income Tax", "National Insurance", "Net Salary"];
      $scope.data = [$scope.studentLoanYearly, $scope.taxdueYearly, $scope.niYearly, $scope.netYearly];
      $scope.colours = ['#FD1F5E', '#1EF9A1', '#7FFD1F', '#68F000'];
      
    }
  
  
  

  function allowance() {
    if ($scope.grossSalaryYearly < 100000) {
      $scope.allowanceYearly = 11000;
      $scope.allowanceMonthly = $scope.allowanceYearly / 12;
      $scope.allowanceWeekly = $scope.allowanceYearly / 52;
    } else if (($scope.grossSalaryYearly >= 100000) && ($scope.grossSalaryYearly <= 122000)) {
      for (i = 100000; i < $scope.grossSalaryYearly; i = i + 2) {
        $scope.allowanceYearly--;
        $scope.allowanceMonthly = $scope.allowanceYearly / 12;
        $scope.allowanceWeekly = $scope.allowanceYearly / 52;
      }
    } else if ($scope.grossSalaryYearly > 122000) {
      $scope.allowanceYearly = 0;
      $scope.allowanceMonthly = $scope.allowanceYearly / 12;
      $scope.allowanceWeekly = $scope.allowanceYearly / 52;
    }
  }

  function getTaxable() {
    if ($scope.grossSalaryYearly <= 11000) {
      $scope.taxableYearly = 0;
      $scope.taxableMonthly = 0;
      $scope.taxableWeekly = 0;
    } else {
      $scope.taxableYearly = $scope.grossSalaryYearly - $scope.allowanceYearly;
      $scope.taxableMonthly = $scope.grossSalaryMonthly - $scope.allowanceMonthly;
      $scope.taxableWeekly = $scope.grossSalaryWeekly - $scope.allowanceWeekly;
    }
  }

  function getTaxDue() {
    if ($scope.taxableYearly <= 32000) {
      $scope.taxdueYearly = $scope.taxableYearly * 0.2;
      $scope.taxdueMonthly = $scope.taxableMonthly * 0.2;
      $scope.taxdueWeekly = $scope.taxableWeekly * 0.2;
    } else if (($scope.taxableYearly > 32000) && ($scope.taxableYearly <= 150000)) {
      $scope.taxdueYearly = (32000.00 * 0.2) + (($scope.taxableYearly - 32000) * 0.4);
      $scope.taxdueMonthly = ((32000.00 * 0.2) + (($scope.taxableYearly - 32000) * 0.4)) / 12;
      $scope.taxdueWeekly = ((32000.00 * 0.2) + (($scope.taxableYearly - 32000) * 0.4)) / 52;
    } else {
      $scope.taxdueYearly = (32000.00 * 0.2) + ((150000 - 32000) * 0.4) + (0.45 * ($scope.taxableYearly - 150000));
      $scope.taxdueMonthly = ((32000.00 * 0.2) + ((150000 - 32000) * 0.4) + (0.45 * ($scope.taxableYearly - 150000))) / 12;
      $scope.taxdueWeekly = ((32000.00 * 0.2) + ((150000 - 32000) * 0.4) + (0.45 * ($scope.taxableYearly - 150000))) / 52;
    }
  }
    
    function getStudentLoan(){
        

          
          
          
          if($scope.loan ==="oldLoan"){
           $scope.studentLoanYearly = ($scope.grossSalaryYearly - 17495) * 0.09;
          $scope.studentLoanMonthly = (($scope.grossSalaryYearly - 17495) * 0.09) / 12;
          $scope.studentLoanWeekly = (($scope.grossSalaryYearly - 17495) * 0.09) / 52;

       }
       else if($scope.loan ==="newLoan"){
           $scope.studentLoanYearly = ($scope.grossSalaryYearly - 21000) * 0.09;
          $scope.studentLoanMonthly = (($scope.grossSalaryYearly - 21000) * 0.09) / 12;
          $scope.studentLoanWeekly = (($scope.grossSalaryYearly - 21000) * 0.09) / 52;

       }
       else{
          $scope.studentLoanYearly = 0;
          $scope.studentLoanMonthly = 0;
          $scope.studentLoanWeekly = 0;

       }
          
      
    }

  function getNI() {
      
      if($scope.age === 'under'){
          
          
      
    if ($scope.grossSalaryWeekly < 155) {
      $scope.niYearly = 0;
      $scope.niMonthly = 0;
      $scope.niWeekly = 0;
    } else if (($scope.grossSalaryWeekly >= 155) && ($scope.grossSalaryWeekly <= 827)) {
      $scope.niYearly = (($scope.grossSalaryWeekly - 155) * 0.12) * 52;
      $scope.niMonthly = (($scope.grossSalaryWeekly - 155) * 0.12) * 4;
      $scope.niWeekly = ($scope.grossSalaryWeekly - 155) * 0.12;
    } else {
      $scope.niYearly = ((672 * 0.12) + ($scope.grossSalaryWeekly - 827) * 0.02) * 52;
      $scope.niMonthly = ((672 * 0.12) + ($scope.grossSalaryWeekly - 827) * 0.02) * 4;
      $scope.niWeekly = (672 * 0.12) + ($scope.grossSalaryWeekly - 827) * 0.02;
    }
      
  }
      
      else{
          
          $scope.niYearly = 0;
      $scope.niMonthly = 0;
      $scope.niWeekly = 0;
          
      }
  }

  function getDeductions() {
    $scope.deductionsYearly = $scope.taxdueYearly + $scope.niYearly + $scope.studentLoanYearly;
    $scope.deductionsMonthly = ($scope.taxdueYearly + $scope.niYearly + $scope.studentLoanYearly) / 12;
    $scope.deductionsWeekly = ($scope.taxdueYearly + $scope.niYearly + $scope.studentLoanYearly) / 52;
  }

  function getNetSalary() {
    $scope.netYearly = $scope.grossSalaryYearly - $scope.deductionsYearly;
    $scope.netMonthly = ($scope.grossSalaryYearly - $scope.deductionsYearly) / 12;
    $scope.netWeekly = ($scope.grossSalaryYearly - $scope.deductionsYearly) / 52;
  }
    
    
    
    

});