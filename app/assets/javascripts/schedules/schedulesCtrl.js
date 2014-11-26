labIct.controller("SchedulesCtrl", ["$scope", "SchedulesService", function($scope, SchedulesService){
  
  $scope.schedule = {}
  $scope.schedule.userName = userName;
  $scope.schedules = [];
  $scope.userId = userId;
  $scope.equipamentId = null;
  $scope.equips = [];
  $scope.temErros = false;

  $scope.botaoRemoverEvento = false;

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
      console.log(data);
      if(data.length == 0)
      {
        $scope.schedules = [];
        $("#calendar").fullCalendar('removeEvents');
      }
      for(var i=0;i<data.length;i++)
      {
        var startDate = moment(data[i].start_date).toDate();
        var endTime = moment(data[i].end_date).toDate();
        var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes());
        var endDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime.getHours(), endTime.getMinutes());

        var agedamento = {
          scheduleId: data[i].id, //modificar
          title: "User1 Oliveira",
          start: startDateEvent,
          end: endDateEvent,
          equipamentId: data[i].equip_id,
          userId: data[i].user_id,
          allDay: false,
        };
        $scope.schedules.push(agedamento);

        //$('#calendar').fullCalendar('renderEvent', agedamento);
      }
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      console.log(err);
    });
  }

  //{scheduleId: 1, title: 'User 1',start: new Date(2014, 10, 10 + 1, 19, 0),end: new Date(2014, 10, 10 + 1, 22, 30), idEquipament: 1, allDay: false},

  /* alert on eventClick */
  $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
    $scope.schedule.scheduleId = event.scheduleId;
    $scope.schedule.startDate = event.start.format("YYYY-MM-DD");
    $scope.schedule.startTime = event.start.format("HH:mm");
    $scope.schedule.endTime = event.end.format("HH:mm");
    $scope.botaoRemoverEvento = true;
    angular.element('#modalAgendamento').modal('show');
  };

  $scope.newSchedule = function() {
    $('#divErros li').remove();
    $scope.temErros = false;
    $scope.resetFormSchedule();
    angular.element('#modalAgendamento').modal('show');
  }

  $scope.openDialogDay = function (date, allDay, jsEvent, view) {
    $('#divErros li').remove();
    $scope.temErros = false;
    $scope.resetFormSchedule();
    $scope.schedule.startDate = date.format("YYYY-MM-DD");
    angular.element('#modalAgendamento').modal('show');
  }
 
  $scope.addEvent = function() {

    /*Obtendo os dados*/
    // var schedule =  null;
    var startDate = moment($scope.schedule.startDate, "YYYY-MM-DD").toDate();
    var startTime = $scope.schedule.startTime.split(":");
    var endTime = $scope.schedule.endTime.split(":");

    var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime[0], startTime[1]);
    var endDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime[0], endTime[1]);

    console.log("Nome: " + $scope.schedule.userName);

    $scope.schedule = {
      scheduleId: null, //modificar
      title: $scope.schedule.userName,
      start: startDateEvent,
      end: endDateEvent,
      equipamentId: $scope.equipamentId,
      userId: $scope.userId,
      allDay: false,
    };
    $('#divErros li').remove();
    SchedulesService.adicionar($scope.schedule).success(function(data){
      if(data.errors)
      {
        $scope.temErros = true;
        var divErros = angular.element("#divErros");
        var newLi = angular.element("<li class='erroSchedule'>"+data.errors+"</li>");
        divErros.append(newLi);
      }else{
        $scope.schedule.scheduleId = data;
        $scope.schedules.push($scope.schedule);
        $scope.resetFormSchedule();
        console.log($scope.schedules);
        angular.element('#modalAgendamento').modal('hide');
        $scope.$digest();
      }
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      console.log(err);
    });

    
  };

  /* Remover um evento */
  $scope.removeEvent = function(scheduleId) {

    var teste = $scope.schedules.filter(function( obj ) {
      return obj.scheduleId == scheduleId;
    });

    console.log(teste);
    console.log("Index: " + $scope.schedules.indexOf(teste));
    $scope.schedules.splice($scope.schedules.indexOf(teste),1);
    console.log($scope.schedules);
    angular.element('#modalAgendamento').modal('hide');
  };

  /*Limpar os campos*/
  $scope.resetFormSchedule = function () {
    $scope.schedule.scheduleId = null;
    $scope.schedule.startDate = "";
    $scope.schedule.startTime = "";
    $scope.schedule.endTime = "";
    $scope.botaoRemoverEvento = false;
  }

  $scope.uiConfig = {
    calendar:{
      height: 450,
      editable: true,
      header:{
        left: 'today prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      buttonText: {
        prev: "<<",
        next: ">>",
        today: "Hoje",
        month: "Mês",
        week: "Semana",
        day: "Dia",
      },
      eventClick: $scope.alertOnEventClick,
      dayClick: $scope.openDialogDay,
    }
  };
  $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  $scope.uiConfig.calendar.axisFormat = 'H:mm';
  $scope.uiConfig.calendar.timeFormat = {
    '': 'H:mm',
    agenda: 'H:mm'
  };
  $scope.uiConfig.calendar.titleFormat = {
    month:  'MMMM YYYY',
    week: "D MMMM YYYY ",
    day: 'dddd, D MMMM YYYY',
  };

  $scope.uiConfig.calendar.columnFormat = {
    week: 'dddd, D',
    day: '',
  };
  /* event sources array*/
  $scope.eventSources = [$scope.schedules];
}]);
/* EOF */