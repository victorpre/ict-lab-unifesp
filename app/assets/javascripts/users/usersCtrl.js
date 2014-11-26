labIct.controller("UsersCtrl", ["$scope", "UsersService", function($scope, UsersService) {
    
    $scope.numeroRegistros = 5;
    $scope.user = {};
    $scope.users = [];
    $scope.paginaAtual = 0;
    $scope.predicate = 'name'; //Ordenação da tabela
    
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
        for(var i=0;i<users.length;i++)
        {
          users[i].role = (users[i].role == 1)? "Admin" : (users[i].role == 2)? "Operador" : (users[i].role == 3)? "Usuário" :"";
          users[i].type = (users[i].type == "1")? "Professor" : (users[i].type == "2")? "Aluno" : "";
        }
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