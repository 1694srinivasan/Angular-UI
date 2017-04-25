var app = angular.module('uiapp',['ngMaterial','datatables'])
	app.config(function($mdIconProvider , $mdThemingProvider , $mdAriaProvider){
		$mdThemingProvider.theme('default')
		.primaryPalette('green')
		.accentPalette('red');
		$mdAriaProvider.disableWarnings();
	})
	app.controller('uictrl' , function($scope, $http , $timeout, $mdSidenav){

	$scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }

	$http({method: 'GET',url: 'https://angapi.herokuapp.com/widgets/'}).
    then(function successCallback(data) {
        $scope.widgetdata = []
        $scope.dropdown = []
        angular.forEach(data.data,function(data){
        	$scope.dropdown.push(data)
        	if(data.enable == true){
                $scope.widgetdata.push(data)
            } 
            
        })     
    },function errorCallback(data){
        $scope.error = data;
    });

	$scope.close = function(index,id) {
    	$http({method: 'PUT',url: 'https://angapi.herokuapp.com/widgets/' + id + "/" , data : {'enable': 'false'}}).
    	then(function successCallback(data){
    		$scope.widgetdata.splice(index, 1)
    	},function errorCallback(data){
    		$scope.error = data;
    	});
    }

    $scope.closecheck = function(index,id, value) {
    	console.log(index, id, value)
    	if (value == true){
    		var enable = false
    	}else{
    		var enable = true
    	}
    	$http({method: 'PUT',url: 'https://angapi.herokuapp.com/widgets/' + id + "/" , data : {'enable': enable}}).
    	then(function successCallback(data){
    		if (enable == false){
    			$scope.widgetdata.splice(index, 1)
    		}else{
    			$scope.widgetdata.push(data)
    			// console.log(data)
    		}
    	},function errorCallback(data){
    		$scope.error = data;
    	});
    }

    $http({method: 'GET',url: 'https://angapi.herokuapp.com/product/'}).
    then(function successCallback(data) {
        $scope.chartdata = []
        angular.forEach(data.data,function(data){
            $scope.chartdata.push(data)
        })
        var piechart  = []
        angular.forEach($scope.chartdata , function(data){ 
            var product = data.product_name;
            var count = data.count;
            var datay = {'name':product, 'y':count}
            piechart.push(datay)
        })
        Highcharts.chart('pichart', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Laptop Brands'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: piechart
        }]
    });
    },function errorCallback(data){
        $scope.error = data;
    });

    $http({method: 'GET',url: 'https://angapi.herokuapp.com/product/'}).
    then(function successCallback(data) {
        $scope.userdata = []
        angular.forEach(data.data,function(data){
            $scope.userdata.push(data);
        })
    }, function errorCallback(data) {
        $scope.error = data;
        
    });

    $http({method: 'GET',url: 'https://angapi.herokuapp.com/temprature/'}).
    then(function successCallback(data){
        $scope.chartdata = []
        angular.forEach(data.data,function(data){
            $scope.chartdata.push(data)
        })
        // console.log($scope.chartdata)
        var barchart  = []
        angular.forEach($scope.chartdata , function(data){
            
            var city = data.city_name;
            var temp = parseFloat(data.temprature);
            var datay = {'name':city, 'y':temp}
            barchart.push(datay)

        })
        // console.log(barchart);
        Highcharts.chart('barchart', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Temperature Statistics'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Temperature Celsius'
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: '{point.y:1f} Celsius'
                    }

                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:1f}  Celsius</b><br/>'
            },

            series: [{
                name: 'Temperature',
                colorByPoint: true,
                data:barchart
            }],
        });
    },function errorCallback(data){
        $scope.error = data;
    });

    $http({method: 'GET',url: 'https://angapi.herokuapp.com/temprature/'}).
    then(function successCallback(data) {
        $scope.temp_data = []
        angular.forEach(data.data,function(data){
            $scope.temp_data.push(data);
        })
    }, function errorCallback(data) {
        $scope.error = data.data;
        
    });
});