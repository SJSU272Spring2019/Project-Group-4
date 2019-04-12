function triggerCamera(){
 var reviewScreenDiv = document.getElementById("ReviewScreen");
 var cameraAccessDiv = document.getElementById("CameraAccess");
 if(cameraAccessDiv && reviewScreenDiv){
 	cameraAccessDiv.style = "visibility:visible";
 	reviewScreenDiv.style = "visibility:hidden";
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
	//video.src = window.URL.createObjectURL(stream);
	video.srcObject = stream;
	video.play();
}

function throwError(e){
	alert(e.name);
}

function snap() {
	canvas.width = video.clientWidth;
	canvas.height = video.clientHeight;
	var context = canvas.getContext('2d');

	context.drawImage(video, 0, 0);

}