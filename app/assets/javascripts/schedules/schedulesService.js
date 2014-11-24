labIct.factory('SchedulesService', ["$http", function ($http) {
  
  function listarPorEquipamento(equipamentId) {
    return $http({
      url: '/schedules/'+equipamentId+'',
      method: 'GET',
      async: false,
      data: {
      	"equip_id" : equipamentId,
      }
    });
  }

  function adicionar(schedule) {
  	return $http({
      url: '/schedules',
      method: 'POST',
      async: false,
      data: {
      	"start_date" : schedule.start,
      	"end_date" : schedule.endDate,
        "user_id": schedule.userId,
      	"equip_id": schedule.equipamentId,
      }
    });
  }

  function deletar(scheduleId)
  {
  	return $http({
      url: '/schedules/'+scheduleId+'',
      method: 'DELETE',
      async: false,
      data: {
      	"id" : scheduleId,
      }
    });
  }

  function listarEquipamentos() {
  	return $http({
	  url: '/equips.json',
	  method: 'GET',
	  async: false,
	});
  }

  return{
    listarPorEquipamento: listarPorEquipamento,
    adicionar : adicionar,
    deletar : deletar,
    listarEquipamentos: listarEquipamentos,
  };
}]);