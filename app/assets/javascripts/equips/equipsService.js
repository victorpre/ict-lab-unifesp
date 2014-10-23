labIct.factory('EquipsService', function ($http) {
	function adiciona(equipamento) {
		
	}

	function listar() {
		return $http({
			url: '/equips.json',
			method: 'GET',
			async: false,
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
		adiciona: adiciona,
		listar: listar,
		deletar: deletar,
	};
})