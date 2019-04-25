var config ={
	apiKey:"AIzaSyCohigWthShmIVvtOaZIfydYLRXIA6uAwU",
	authDomain:"demo.firebaseapp.com",
	databaseURL:"https://demo.firebaseio.com",
	projectId:"demo",
	storageBucket:"demo.appspot.com"
	messagingSenderId:""
};
firebase.initializeApp(config);
//var rootRef = firebase.database().ref();
var firestore = firebase.firestore();
const docRef  =  firestore.doc("sample/login");

	const userName = document.querySelector("#userName");
	const pwd = document.querySelector("#password");
	const login = document.querySelector("#login");
	console.log("Script");
	if(login){
		login.addEventListener("click", function(){
		console.log("addEventListener");
		const user = userName.value;
		console.log("GGGGG"+user+"999");
		docRef.set({
	uName:user
	}).then(function(docRef){
		console.log("Saved!")
	}).catch(function(error){
		console.log("OOPS!!");
	});
	})
};
/*function validate(){
	var userName = document.getElementById("userName");
	var pwd = document.getElementById("password");
	alert("jJJJJ"+userName.value);
	console.log(userName);
	console.log(pwd);
}*/