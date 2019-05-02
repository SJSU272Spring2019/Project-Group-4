
var config;
var database;
var billnum;
var finalTrans='';

    
function speechTotext(){   
        if('webkitSpeechRecognition'in window){
            var speech =new webkitSpeechRecognition();
            speech.continuous= true;
            speech.interimResults= true;
            speech.lang="en-IN";
            speech.start();

            // var finalTrans='';
            speech.onresult= function(event){
                
                var interimTrans='';
                for(var i=event.resultIndex; i<event.results.length; i++){
                    var transcript= event.results[i][0].transcript;
                    transcript.replace("\n", "<br>");
                    if(event.results[i].isFinal){
                        finalTrans += transcript;
                    }
                    else{
                        interimTrans += transcript;
                    }
                }
                r.innerHTML= finalTrans + '<span style="color:#999">' + interimTrans + '</span>';
            };
            speech.onerror= function(event){

            };
        }
        else{
            r.innerHTML=" Browser not supported";
        }
       
}



var config = {
        
};

firebase.initializeApp(config);
console.log(firebase);
 database = firebase.firestore();


function sendTodb(){
    
   var res= document.getElementById("result");
   var val = res.innerText;
   billnum = document.getElementById("userInput").value;
   console.log(billnum);

        
        database.collection("speech").doc(billnum).set({
            review: val
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
}