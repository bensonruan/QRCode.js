
$( document ).ready(function() {
	generateQRCode();
});

function generateQRCode () {  
	$("#qrcode").empty();

	var protocol = $("#protocol").val();
	var url = $("#url").val();
	var size = $("#size").val();
	var level = $("#level").val();
	var bgColor = $("#background-color").val();
	var foreColor = $("#foreground-color").val();

	if (!url) {
		document.getElementById("url").focus();
		return;
	}
	url = protocol + "://" + url;

	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: url,
		width: size,
		height: size,
		colorDark : foreColor,
		colorLight : bgColor,
		correctLevel : QRCode.CorrectLevel[level]
	});
}



$("#url").
  	on("blur", function () {
    	generateQRCode();
  	}).
  	on("keydown", function (e) {
    	if (e.keyCode == 13) {
			generateQRCode();
    	}
	});

$("#protocol").
  	on("change", function () {
		generateQRCode();
	});

$("#size").
	on("change", function () {
	  generateQRCode();
  });

$("#level").
  on("change", function () {
	generateQRCode();
});

$("#background-color").
  on("change", function () {
	generateQRCode();
});

$("#foreground-color").
  on("change", function () {
	generateQRCode();
});