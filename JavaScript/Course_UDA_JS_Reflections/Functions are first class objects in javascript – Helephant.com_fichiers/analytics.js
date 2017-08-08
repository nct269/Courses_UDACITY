$(document).ready(function() {
	$(".follow").click(function() {
		var link = $(this);
		trackEvent("subscription", "clicked", link.attr("href"));
	});
});

function trackEvent(category, event, label) {
	if(_gaq)
		_gaq.push(['_trackEvent', category, event, label]);
		
	if(console && console.log)
		console.log(category + " " + event + ": " + label);
}