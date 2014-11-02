labIct.controller("UsersCtrl", function($scope, UsersService) {
    
    $scope.numeroRegistros = 5;
    $scope.user = {};
    $scope.users = [];
    $scope.paginaAtual = 0;

    $scope.numeroPaginas =function(){
      return Math.ceil($scope.users.length/$scope.numeroRegistros);                
    }

    $scope.deletar = function (idx) {
      var user = $scope.users[idx];

      if (window.confirm("Tem certeza que deseja excluir? ")) {
        UsersService.deletar(user.id).success(function(){
          $scope.users.splice(idx, 1);
        }).error(function (erros) {
          //Configurar mensagem de erro ao usuário
          alert("deu erro nessa budega");
        });
      }
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
});