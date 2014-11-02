labIct.factory('UsersService', function ($http) {
  function listar() {
    return $http({
      url: '/users.json',
      method: 'GET',
      async: false,
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
    return $http({
      url: '/users/'+id+'',
      method: 'DELETE',
      async: false,
    });
  }

  return{
    listar: listar,
    deletar: deletar,
    editar: editar,
  };
})