var config ={
	apiKey:"AIzaSyCohigWthShmIVvtOaZIfydYLRXIA6uAwU",
	authDomain:"demo.firebaseapp.com",
	databaseURL:"https://demo.firebaseio.com",
	projectId:"demo",
	storageBucket:"demo.appspot.com",
	messagingSenderId:"593410636385"
};
firebase.initializeApp(config);
var db = firebase.firestore();
function check(){

db.collection("sample").get();
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
};
