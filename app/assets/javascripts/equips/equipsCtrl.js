function EquipsCtrl ($scope, EquipsService) {
	$scope.numeroRegistros = 5;
	$scope.equipamentos = {};
	$scope.paginaAtual = 0;

	$scope.numeroPaginas =function(){
        return Math.ceil($scope.equipamentos.length/$scope.numeroRegistros);                
    }

	$scope.adicionaEquipamento = function() {
		// body...
	}

	$scope.deletar = function (idx) {
		var equipamento = $scope.equipamentos[idx];

		if ( window.confirm("Tem certeza que deseja excluir? ") ) {
            EquipsService.deletar(equipamento.id).success(function(){
				$scope.equipamentos.splice(idx, 1);
			}).error(function (erros) {
				//Configurar mensagem de erro ao usuário
				alert("deu erro nessa budega");
			});
        }

			
	}

	$scope.listar = function () {
		EquipsService.listar().success(function (equips) {
			$scope.equipamentos = equips;
		}).error(function (erros) {
			//Configurar mensagem de erro ao usuário
			alert("deu erro nessa budega");
		});
	}


  $scope.listar();
}