var labIct = angular.module("labIct", ['ui.calendar']);

labIct.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});

labIct.config([
  "$httpProvider", function($httpProvider) {
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

/*Alterar para padrão angularjs*/
$(document).ready(function () {
	$('.show-sidebar').on('click', function (e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
	});
});
