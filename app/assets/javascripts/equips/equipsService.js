labIct.factory('EquipsService', function ($http) {
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
				"patrimony_id": equipamento.patrimony, 
				"cost": equipamento.cost,
			}
		});
	}

	function deletar (id) {
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
	};
})