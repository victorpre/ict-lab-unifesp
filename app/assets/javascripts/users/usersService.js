labIct.factory('UsersService', ["$http", function ($http) {
  function listar() {
    return $http({
      url: '/users.json',
      method: 'GET',
      async: false,
    });
  }

  function liberarUsuario(id) {
    return $http({
      url: '/users/'+id+'',
      method: 'GET',
      async: false,
      data:
      {
        "id": id,
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
    liberarUsuario: liberarUsuario,
  };
}])