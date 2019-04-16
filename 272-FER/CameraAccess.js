function triggerCamera(){
 var cameraAccessDiv = document.getElementById("CameraAccess");
 if(cameraAccessDiv){
 	cameraAccessDiv.style = "visibility:visible";
 	cameraTrigger();
 }
}

function cameraTrigger(){
	var video = document.getElementById('video');
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.oGetUserMedia || navigator.msGetUserMedia;

	if(navigator.getUserMedia){
		navigator.getUserMedia({video:true}, streamWebCam, throwError);
	}
}

function streamWebCam (stream) {
	video.srcObject = stream;
	video.play();
	setTimeout(function(){ snap();}, 3000);
}

function throwError(e){
	alert(e.name);
}

function snap() {
	var video = document.getElementById('video');
	canvas.width = video.clientWidth;
	canvas.height = video.clientHeight;
	var context = canvas.getContext('2d');
	context.drawImage(video, 0, 0);
	video.style = "display:none";
}