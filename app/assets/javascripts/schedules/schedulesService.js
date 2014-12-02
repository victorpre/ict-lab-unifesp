labIct.factory('SchedulesService', ["$http", function ($http) {
  
  function listarPorEquipamento(equipamentId) {
    console.log(equipamentId);
    return $http({
      url: '/schedules/equip/'+equipamentId+'',
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
      	"end_date" : schedule.end,
        "user_id": schedule.userId,
      	"equip_id": schedule.equipamentId,
        "user_name": schedule.userName,
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