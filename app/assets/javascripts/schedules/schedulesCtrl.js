labIct.controller("SchedulesCtrl", ["$scope", "SchedulesService", function($scope, SchedulesService){
  
  $scope.schedule = {}
  $scope.userName = userName;
  $scope.schedules = [];
  $scope.userId = userId;
  $scope.equipamentId = null;
  $scope.equips = [];
  $scope.temErros = false;
  $scope.EscondeBotaoRemoverEvento = true;
  $scope.EscondeBotaoAdicionarEvento = false;

  angular.element('#calendar').fullCalendar(
  {
    ignoreTimezone:	false,
	  contentHeight: 400,
	  defaultView: 'month',
		
    eventMouseover: function(calEvent, jsEvent, view) {
		},

		dayClick: function(date, allDay, jsEvent, view) {
			angular.element('#divErros li').remove();
	    $scope.temErros = false;
	    $scope.resetFormSchedule();
	    $scope.schedule.startDate = moment(date).format("YYYY-MM-DD");
	    $scope.$digest();
	    angular.element('#modalAgendamento').modal('show');
		},
		
		eventClick: function(calEvent, jsEvent, view) {
      $('#divErros li').remove();
      $scope.temErros = false;
			$scope.schedule.scheduleId = calEvent.scheduleId;
	    $scope.schedule.startDate = moment(calEvent.start).format("YYYY-MM-DD");
	    $scope.schedule.startTime = moment(calEvent.start).format("HH:mm");
	    $scope.schedule.endTime = moment(calEvent.end).format("HH:mm");
      $scope.EscondeBotaoAdicionarEvento = true;
      if(userId == calEvent.userId){
        $scope.EscondeBotaoRemoverEvento = false;
      }else{
        $scope.EscondeBotaoRemoverEvento = true;
      }
	    $scope.$digest();
	    angular.element('#modalAgendamento').modal('show');
		},
  });

  $scope.listarEquipamentos = function () {
    SchedulesService.listarEquipamentos().success(function (equips) {
      $scope.equips = equips;
    }).error(function (erros) {
      //Configurar mensagem de erro ao usuário
      console.log("Erro");
    });
  }

  $scope.listarEquipamentos();

  $scope.listSchedulesByEquipament = function() {

    SchedulesService.listarPorEquipamento($scope.equipamentId).success(function(data){
      angular.element("#calendar").fullCalendar('removeEvents');

      for(var i=0;i<data.length;i++)
      {
        var startDate = moment(data[i].start_date).toDate();
        var endTime = moment(data[i].end_date).toDate();
        var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
        var endDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime.getHours(), endTime.getMinutes());

        var schedule = {
          id: data[i].id,
          scheduleId: data[i].id, 
          title: data[i].user_name, //modificar
          start: startDateEvent,
          end: endDateEvent,
          equipamentId: data[i].equip_id,
          userId: data[i].user_id,
          allDay: false,
        };

        angular.element('#calendar').fullCalendar('renderEvent', schedule, true);
      }
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      console.log(err);
    });
  }

  $scope.newSchedule = function() {
    $('#divErros li').remove();
    $scope.temErros = false;
    $scope.resetFormSchedule();
    angular.element('#modalAgendamento').modal('show');
  }
 
  $scope.addEvent = function() {

    /*Obtendo os dados*/
    var startDate = moment($scope.schedule.startDate, "YYYY-MM-DD").toDate();
    var startTime = $scope.schedule.startTime.split(":");
    var endTime = $scope.schedule.endTime.split(":");

    var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime[0], startTime[1]);
    var endDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime[0], endTime[1]);

    var schedule = {
      id: null,
      scheduleId: null, //modificar
      title: $scope.userName,
      start: startDateEvent,
      end: endDateEvent,
      equipamentId: $scope.equipamentId,
      userId: $scope.userId,
      user_name: $scope.userName,
      allDay: false,
    };

    $('#divErros li').remove();
    SchedulesService.adicionar(schedule).success(function(data){
      if(data.errors)
      {
        $scope.temErros = true;
        var divErros = angular.element("#divErros");
        var newLi = angular.element("<li class='erroSchedule'>"+data.errors+"</li>");
        divErros.append(newLi);
      }else{
        schedule.scheduleId = data;
        schedule.id = data;
        angular.element('#calendar').fullCalendar('renderEvent', schedule);
        $scope.resetFormSchedule();
        angular.element('#modalAgendamento').modal('hide');
      }
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      console.log(err);
    });   
  };

  /* Remover um evento */
  $scope.removeEvent = function() {
  	SchedulesService.deletar($scope.schedule.scheduleId).success(function(data){
    	angular.element('#calendar').fullCalendar('removeEvents', $scope.schedule.scheduleId);
    	$scope.resetFormSchedule();
    	angular.element('#modalAgendamento').modal('hide');
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      console.log(err);
    });
  };

  /*Limpar os campos*/
  $scope.resetFormSchedule = function () {
    $scope.schedule.scheduleId = null;
    $scope.schedule.startDate = "";
    $scope.schedule.startTime = "";
    $scope.schedule.endTime = "";
    $scope.EscondeBotaoRemoverEvento = true;
    $scope.EscondeBotaoAdicionarEvento = false;
  }
}]);
/* EOF */