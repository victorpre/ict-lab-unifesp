function EquipsCtrl ($scope, EquipsService) {
	$scope.numeroRegistros = 5;
	$scope.equipament = {};
	$scope.equipaments = {};
	$scope.paginaAtual = 0;

	$scope.numeroPaginas =function(){
        return Math.ceil($scope.equipaments.length/$scope.numeroRegistros);                
    }

    $scope.cadastrar = function() {
    	if ($scope.form_equipament.$valid) {
			EquipsService.cadastrar($scope.equipament).success(function(){
				window.location = "/equips";
			}).error(function (erros) {
				//Configurar mensagem de erro ao usuário
				alert("deu erro nessa budega");
			});
	    }
    }

	$scope.deletar = function (idx) {
		var equipament = $scope.equipaments[idx];

		if (window.confirm("Tem certeza que deseja excluir? ")) {
            EquipsService.deletar(equipament.id).success(function(){
				$scope.equipaments.splice(idx, 1);
			}).error(function (erros) {
				//Configurar mensagem de erro ao usuário
				alert("deu erro nessa budega");
			});
        }
	}

	$scope.listar = function () {
		EquipsService.listar().success(function (equips) {
			$scope.equipaments = equips;
		}).error(function (erros) {
			//Configurar mensagem de erro ao usuário
			alert("deu erro nessa budega");
		});
	}

  	$scope.listar();
}