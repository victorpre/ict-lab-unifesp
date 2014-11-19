labIct.controller("SchedulingCtrl", ["$scope", "SchedulingService", function($scope, SchedulingService){
  
  $scope.schedule = {}
  $scope.schedule.userName = userName;
  $scope.shedulings = [{scheduleId: 1, title: 'User 1',start: new Date(2014, 10, 10 + 1, 19, 30),end: new Date(2014, 10, 10 + 1, 22, 30), idEquipament: 1, allDay: false}];
  $scope.userId = userId;
  $scope.equipamentId = null;
  $scope.equips = [];

  $scope.listarEquipamentos = function () {
    SchedulingService.listarEquipamentos().success(function (equips) {
      $scope.equips = equips;
    }).error(function (erros) {
      //Configurar mensagem de erro ao usuário
      alert("deu erro nessa budega");
    });
  }

  $scope.listarEquipamentos();

  //{scheduleId: 1, title: 'User 1',start: new Date(2014, 10, 10 + 1, 19, 0),end: new Date(2014, 10, 10 + 1, 22, 30), idEquipament: 1, allDay: false},

  /* alert on eventClick */
  $scope.alertOnEventClick = function(event, allDay, jsEvent, view ){
    $scope.schedule.scheduleId = event.scheduleId;
    $scope.schedule.startDate = event.start.format("YYYY-MM-DD");
    $scope.schedule.startTime = event.start.format("HH:mm");
    $scope.schedule.endTime = event.end.format("HH:mm");
    angular.element('#modalAgendamento').modal('show');
  };

  $scope.newSchedule = function() {
    $scope.resetFormSchedule();
    angular.element('#modalAgendamento').modal('show');
  }

  $scope.openDialogDay = function (date, allDay, jsEvent, view) {
    $scope.resetFormSchedule();
    $scope.schedule.startDate = date.format("YYYY-MM-DD");
    angular.element('#modalAgendamento').modal('show');
  }
 
  $scope.addEvent = function() {

    /*Obtendo os dados*/
    var startDate = moment($scope.schedule.startDate, "YYYY-MM-DD").toDate();
    var startTime = $scope.schedule.startTime.split(":");
    var endTime = $scope.schedule.endTime.split(":");

    var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime[0], startTime[1]);
    var endDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), endTime[0], endTime[1]);

    var agendamento = {
      scheduleId: null, //modificar
      title: $scope.schedule.userName,
      start: startDateEvent,
      end: endDateEvent,
      allDay: false,
      equipamentId: $scope.equipamentId,
      userId: $scope.userId,
    };

    $scope.shedulings.push(agendamento);

    /*SchedulingService.adicionar(agendamento).success(function(idAgendamento){
      agendamento.idAgendamento = idAgendamento;
      $scope.shedulings.push(agendamento);
    }).error(function (xhr, err) {
      //Configurar mensagem de erro ao usuário
      alert(err);
    });*/

    $scope.resetFormSchedule();

    angular.element('#modalAgendamento').modal('hide');
  };

  /* remove event */
  $scope.remove = function(index) {
    $scope.shedulings.splice(index,1);
  };

  /*Limpar os campos*/
  $scope.resetFormSchedule = function () {
    $scope.schedule.scheduleId = null;
    $scope.schedule.startDate = "";
    $scope.schedule.startTime = "";
    $scope.schedule.endTime = "";
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
        day: "Dia"
      },
      eventClick: $scope.alertOnEventClick,
      dayClick: $scope.openDialogDay,
    }
  };
  $scope.uiConfig.calendar.dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  $scope.uiConfig.calendar.dayNamesShort = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  $scope.uiConfig.calendar.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  /* event sources array*/
  $scope.eventSources = [$scope.shedulings];
}]);
/* EOF */