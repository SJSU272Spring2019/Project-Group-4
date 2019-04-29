
var config;
var database;
var fData;

function connect_to_db() {
  config = {
      apiKey: "",
      authDomain: "fer272-237805.firebaseapp.com",
      databaseURL: "https://fer272-237805.firebaseio.com",
      projectId: "fer272-237805",
      storageBucket: "fer272-237805.appspot.com",
      messagingSenderId: "981629924823"
    };
  
  firebase.initializeApp(config);
  console.log(firebase);
  database = firebase.firestore();  
};

function add_user_to_db() {
  connect_to_db();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var db_input = {};
  db_input['username'] = String(username);
  db_input['password'] = String(password);

  database.collection("user_login_details").doc("logins").add(db_input)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function add_review_to_db(joy, sorrow, anger, surprise) {
  connect_to_db();
  var db_input = {};
  db_input['joy'] = joy;
  db_input['sorrow'] = sorrow;
  db_input['anger'] = anger;
  db_input['surprise'] = surprise;
  window.alert(db_input);
  
  database.collection("user_login_details").add(db_input)
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
}

function triggerCamera(){
 var cameraAccessDiv = document.getElementById("CameraAccess");
 if(cameraAccessDiv){
 	cameraAccessDiv.style = "visibility:visible";
 	cameraTrigger();
 }
}

function blobToBase64(blob, cb) {
  var reader = new window.FileReader();
  reader.readAsDataURL(blob); 
  reader.onloadend = function() {           
    cb(reader.result);
  }
}

function canvasToBase64(canvas, cb) {
  canvas.toBlob(function(blob) {
    blobToBase64(blob, cb);
  }, 'image/jpeg');
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
	setTimeout(function(){ snap();}, 2000);
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
	imageUpload(canvas)


}

function redo(){
	var canvas = document.getElementById('canvas');
	canvas.style="display:none";
	var video = document.getElementById('video');
	video.style = "visibility:visible";
	setTimeout(function(){ snap();}, 2000);
	canvas.style="visibility:visible";
}

function imageUpload(canvas) {
    canvasToBase64(canvas, function(b64) {
      b64 = b64.replace('data:image/jpeg;base64,', ''); // remove content type
      request = {
        "requests":[
          {
            "image":{ "content": b64 },
            "features":[
              {
                "type":"FACE_DETECTION",
                "maxResults":1
              }
            ]
          }
        ]
      };
      
      $.ajax({
        method: 'POST',
        url: 'https://vision.googleapis.com/v1/images:annotate?key=',
        contentType: 'application/json',
        data: JSON.stringify(request),
        processData: false,
        success: function(data){
          output = data;
          var faceData = data.responses[0].faceAnnotations[0];
          console.log('joy: ' + faceData.joyLikelihood);
          console.log('sorrow: ' + faceData.sorrowLikelihood);
          console.log('anger: ' + faceData.angerLikelihood);
          console.log('surprise: ' + faceData.surpriseLikelihood);
          add_review_to_db(faceData.joyLikelihood, faceData.sorrowLikelihood, faceData.angerLikelihood, faceData.surpriseLikelihood);
        },
        error: function (data, textStatus, errorThrown) {
          console.log('error: ' + data);
        }
      })
    }) 
}