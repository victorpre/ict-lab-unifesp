labIct.factory('SchedulingService', ["$http", function ($http) {
  
  function listarPorEquipamento(equipamentId) {
    return $http({
      url: '/scheduling/'+equipamentId+'',
      method: 'GET',
      async: false,
      data: {
      	"equipament_id" : equipamentId,
      }
    });
  }

  function adicionar(schedule) {
  	return $http({
      url: '/scheduling',
      method: 'POST',
      async: false,
      data: {
      	"startDate" : schedule.start,
      	"endDate" : schedule.endDate,
      	"equipament_id": schedule.equiapentId,
      	"user_id": schedule.userId,
      }
    });
  }

  function deletar(scheduleId)
  {
  	return $http({
      url: '/scheduling/'+scheduleId+'',
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