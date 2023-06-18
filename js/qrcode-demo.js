
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
	url = protocol + url;

	var qrcode = new QRCode(document.getElementById("qrcode"), {
		text: url,
		width: size,
		height: size,
		colorDark : foreColor,
		colorLight : bgColor,
		correctLevel : QRCode.CorrectLevel[level]
	});	
}

function printQRCode() 
{
  var margin = 15;
  var printSizeWidth = 700;
  var printSizeHeight = 1000;
  var size = parseInt($("#size").val());
  var printOption = $("#print-option").val();
  var newWin=window.open('','Print-Window');
  newWin.document.open();
  var htmlToPrint = '<html>';
  htmlToPrint += '<style type="text/css" media="print">@page{size:auto;margin:0;} html,body{height:100%;margin:0!important;padding:0!important;overflow:hidden;text-align-center;}</style>';
  htmlToPrint += '<body onload="window.print()"><div style="width:100%;text-align:center;margin:auto;">'
  if(printOption=='S'){
	htmlToPrint += '<div style="display:inline-block;margin:'+margin+'px">';
	htmlToPrint += $("#qrcode").children( "img" ).prop('outerHTML');
	htmlToPrint += '</div>';
  }else{
	let heightCount = Math.floor(printSizeHeight / (size + margin));
	let widthCount = Math.floor(printSizeWidth / (size + margin));
	for (let i = 1; i <= heightCount; i++) {
		for (let j = 1; j <= widthCount; j++) {
			htmlToPrint += '<div style="display:inline-block;margin:'+margin+'px">';
			htmlToPrint += $("#qrcode").children( "img" ).prop('outerHTML');
			htmlToPrint += '</div>';
		} 
	} 
  }
  
  htmlToPrint +='<div></body></html>'; 
  newWin.document.write(htmlToPrint);
  newWin.document.close();
  setTimeout(function(){newWin.close();},10);
}

$('#qrcode').bind('DOMSubtreeModified', function(){
	var imgsource = $("#qrcode").children( "img" ).attr('src');
	if (typeof imgsource  !== "undefined"){
		$("#download").attr("href", imgsource);
	}
  });

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

$("#print").
  	on("click", function () {
		printQRCode();
	});