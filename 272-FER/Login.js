
var config;
var database;
var fData;
var config = {
    apiKey: "AIzaSyBgY7NL2NMDqLymige7uk9IlXF6H7DSR0k",
    authDomain: "auth-db-9a87f.firebaseapp.com",
    databaseURL: "https://auth-db-9a87f.firebaseio.com",
    projectId: "auth-db-9a87f",
    storageBucket: "auth-db-9a87f.appspot.com",
    messagingSenderId: "8782950684"
  };
  firebase.initializeApp(config);
  console.log(firebase);
  database = firebase.firestore(); 

function validate(){
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var docRef = database.collection("UserLogin").doc(username);
  docRef.get().then(function(doc) {
    var credFailed = document.getElementById("credentialFailure");
    if (doc.exists) {
        var data = doc.data();
        var userpwd = data.password;
        if(password == userpwd){
          window.location.assign("./Review.html");
        } else{
          window.alert("Incorrect credentials");          
          if(credFailed){
            credFailed.innerHTML = "Incorrect password";
          }
        }
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        window.alert("Incorrect credentials");
        if(credFailed){
            credFailed.innerHTML = "Incorrect Username";
          }
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}


