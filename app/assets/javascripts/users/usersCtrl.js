labIct.controller("UsersCtrl", ["$scope", "UsersService", function($scope, UsersService) {
    
    $scope.numeroRegistros = 5;
    $scope.user = {};
    $scope.users = [];
    $scope.paginaAtual = 0;

    $scope.numeroPaginas =function(){
      return Math.ceil($scope.users.length/$scope.numeroRegistros);                
    }

    $scope.mudaParaPaginaInicial = function () {
      $scope.paginaAtual = 1;
    }

    $scope.deletar = function (id) {
      if (window.confirm("Tem certeza que deseja excluir? ")) {
        UsersService.deletar(id).success(function(){
          $scope.users = $scope.users.filter(function( obj ) {
              return obj.id !== id;
          });
        }).error(function (erros) {
          //Configurar mensagem de erro ao usuário
          alert("deu erro nessa budega");
        });
      }
    }

    $scope.liberaTrava = function (id) {
      UsersService.liberarUsuario(id).success(function(){
        $scope.users.filter(function( obj ) {
            if(obj.id == id){
              obj.locked = !obj.locked;
            };
        });
      }).error(function (erros) {
        //Configurar mensagem de erro ao usuário
        alert("deu erro nessa budega");
      });
    }

    $scope.editar = function () {
      if ($scope.form_user.$valid) {
        UsersService.editar($scope.user).success(function(){
          window.location = "/users";
        }).error(function (erros) {
          //Configurar mensagem de erro ao usuário
          alert("deu erro nessa budega");
        });
      }
    }

    $scope.listar = function () {
      UsersService.listar().success(function (users) {
        $scope.users = users;
      }).error(function (erros) {
        //Configurar mensagem de erro ao usuário
        alert("deu erro nessa budega");
      });
    }

    $scope.carregar = function (user) {
    }


    $scope.listar();
}]);