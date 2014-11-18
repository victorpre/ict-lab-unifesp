labIct.factory('EquipsService', ["$http", function ($http) {
	function listar() {
		return $http({
			url: '/equips.json',
			method: 'GET',
			async: false,
		});
	}

	function cadastrar(equipamento){
		return $http({
			url: '/equips',
			method: 'POST',
			async: false,
			data:
			{
				"name": equipamento.name,
				"model": equipamento.model,
				"patrimony_id": equipamento.patrimony_id, 
				"cost": equipamento.cost,
			}
		});
	}

	function editar(equipamento){
		return $http({
			url: '/equips/'+equipamento.id+'',
			method: 'PUT',
			async: false,
			data:
			{
				"name": equipamento.name,
				"model": equipamento.model,
				"patrimony_id": equipamento.patrimony_id, 
				"cost": equipamento.cost,
			}
		});
	}

	function deletar (id) {
		console.log(id);
		return $http({
			url: '/equips/'+id+'',
			method: 'DELETE',
			async: false,
		});
	}

	return{
		listar: listar,
		deletar: deletar,
		cadastrar: cadastrar,
		editar: editar,
	};
}]);