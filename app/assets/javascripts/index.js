$(document).ready(function () {
	$('.show-sidebar').on('click', function (e) {
		e.preventDefault();
		$('div#main').toggleClass('sidebar-show');
	});
});
