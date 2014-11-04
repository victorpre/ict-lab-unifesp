function SchedulingCtrl($scope) {
    $scope.schedule = {}
    $scope.schedule.nomeUsuario = nomeUsuario;

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    
    /* event source that contains custom events on the scope */
    $scope.events = [
      {title: 'User 1',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30), idEquipament: 1, allDay: false},
      {title: 'User 2',start: new Date(y, m, d + 2, 19, 0),end: new Date(y, m, d + 2, 22, 30), idEquipament: 1, allDay: false},
      {title: 'User 3',start: new Date(y, m, d + 3, 19, 0),end: new Date(y, m, d + 3, 22, 30), idEquipament: 1, allDay: false},
      {title: 'User 4',start: new Date(y, m, d + 4, 19, 0),end: new Date(y, m, d + 4, 22, 30), idEquipament: 3, allDay: false},
      {title: 'User 5',start: new Date(y, m, d + 5, 19, 0),end: new Date(y, m, d + 5, 22, 30), idEquipament: 3, allDay: false},
    ];

    /* alert on eventClick */
    $scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
      $scope.alertMessage = (event.title + ' was clicked ');
    };

    $scope.openDialogDay = function (date, allDay, jsEvent, view) {
      
    }
   
    /* add custom event*/
    $scope.addEvent = function() {


      var startDate = moment($scope.schedule.startDate, "YYYY-MM-DD");
      startDate = startDate.toDate();
      var endDate = moment($scope.schedule.endDate, "YYYY-MM-DD");
      endDate = endDate.toDate();
      var startTime = $scope.schedule.startTime.split(":");
      var endTime = $scope.schedule.endTime.split(":");

      var startDateEvent = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startTime[0], startTime[1]);
      var endDateEvent = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), endTime[0], endTime[1]);

      $scope.events.push({
        title: $scope.schedule.nomeUsuario,
        start: startDateEvent,
        end: endDateEvent,
        allDay: false,
        idEquipament: $scope.idEquipament,
      });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };


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
    $scope.eventSources = [$scope.events];
}
/* EOF */