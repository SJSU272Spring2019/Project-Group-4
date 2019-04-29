
//var rootRef = firebase.database().ref();

	const docRef  =  firestore.doc("sample/login");

	const userName = document.querySelector("#userName");
	const pwd = document.querySelector("#password");
	const login = document.querySelector("#login");
	<script>
		window.alert(5 + 6);
	</script>
	console.log("Script");
	if(login){
		login.addEventListener("click", function(){

		var config = {
    		apiKey: "",
    		authDomain: "fer272-237805.firebaseapp.com",
    		databaseURL: "https://fer272-237805.firebaseio.com",
    		projectId: "fer272-237805",
    		storageBucket: "fer272-237805.appspot.com",
    		messagingSenderId: "981629924823"
  		};
  		firebase.initializeApp(config);
  		console.log(firebase);


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