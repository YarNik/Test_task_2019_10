	
			let quan_sn = 0;
			let quan_ssp = 0;
			let quan_sspap = 0;
			let quan_sdbp = 0;
			let quan_sdep = 0;
	
		var app = angular.module("registry-app", []);
		
		app.controller("data-controller", ($scope, $http) => {
		
			
				$http({method: 'GET',
					url: 'https://smida-dev.test.idoc.com.ua/api/registry/okpoCard',
					params: { code: "01130549" } }).then(answer => {
						$scope.data = answer.data;
						$scope.beneficiaries = answer.data.oCommonInfoBot.beneficiaries;
												
						for (let i=0; i<answer.data.aListRegistry.length; i++) {
							let {nID, sID_Registry, sName} = answer.data.aListRegistry[i];if (nID == 36 && sID_Registry == "PublicOffering" && sName=="Публічні пропозиції") {$scope.secondTable =true;
								break;
							};
						}
				});
								
			$scope.doSecondQuery = function() {
				if (!$scope.dataSeconds) {
					$http({method: 'GET',
						url: 'https://smida-dev.test.idoc.com.ua/api/registry/getTranslatedModels?sOKPO=01130549' }).then(answer => {
							$scope.dataSeconds = answer.data;
						});
					}
			};
									
			$scope.sortName = () => { $scope.sort_stat_pos = 0; $scope.sort_stock_paper = 0; $scope.sort_begin_public = 0; $scope.sort_end_public = 0;
				if (quan_sn%2 == 0) {$scope.sort_name = 'sNameOfferent.value'; quan_sn++}
					else {$scope.sort_name = '-sNameOfferent.value'; quan_sn++};
			};
			
			$scope.sortStatPos = () => { $scope.sort_name = 0; $scope.sort_stock_paper = 0; $scope.sort_begin_public = 0; $scope.sort_end_public = 0;
				if (quan_ssp%2 == 0) {$scope.sort_stat_pos = 'aoListEvents.value.sName'; quan_ssp++}
					else {$scope.sort_stat_pos = '-aoListEvents.value.sName'; quan_ssp++};
			};
			
			$scope.sortStockPaper = () => { $scope.sort_name = 0; $scope.sort_stat_pos = 0; $scope.sort_begin_public = 0; $scope.sort_end_public = 0;
				if (quan_sspap%2 == 0) {$scope.sort_stock_paper = 'sTypeStockPaper.value'; quan_sspap++}
					else {$scope.sort_stock_paper = '-sTypeStockPaper.value'; quan_sspap++};
			};
									
			$scope.sortDateBeginPublic = () => { $scope.sort_name = 0; $scope.sort_stat_pos = 0; $scope.sort_stock_paper = 0; $scope.sort_end_public = 0;
				if (quan_sdbp%2 == 0) {$scope.sort_begin_public = 'sDateBeginPublicOffering.value'; quan_sdbp++}
					else {$scope.sort_begin_public = '-sDateBeginPublicOffering.value'; quan_sdbp++};
			};
			
			$scope.sortDateEndPublic = () => { $scope.sort_name = 0; $scope.sort_stat_pos = 0; $scope.sort_stock_paper = 0; $scope.sort_begin_public = 0; 
				if (quan_sdep%2 == 0) {$scope.sort_end_public = 'sDateEndPublicOffering.value'; quan_sdep++}
					else {$scope.sort_end_public = '-sDateEndPublicOffering.value'; quan_sdep++};
			};
			
			$scope.today = new Date();
			
		});
			
		app.filter('dateFilter', () => {
            return (filterInput) => {
				let date = new Date();
				date.setTime(Date.parse(filterInput));
				return date.toString() === 'Invalid Date' 
						? '-' 
						: `${('0' + date.getDay()).slice(-2)}.${('0' + (date.getMonth()+1)).slice(-2)}.${date.getFullYear()}`;
			}
        });
