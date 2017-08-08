$(function() {
	$(".example").attr("contentEditable", true).css("cursor", "text");
	$(".run-example").click(function() {
		var exampleAttr = $(this).attr("example");
		var example = exampleAttr ? $(exampleAttr) : $(this).prev("pre");
		eval(example.text());
	});
});