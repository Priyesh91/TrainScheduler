var app = "Train Scheduler"
console.log(app);

$(document).ready(function () {
// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEIIQtRptMVysnAgIgUzUca7aA868CKEM",
  authDomain: "train-a2963.firebaseapp.com",
  databaseURL: "https://train-a2963.firebaseio.com",
  projectId: "train-a2963",
  storageBucket: "train-a2963.appspot.com",
  messagingSenderId: "810021992109"
};
firebase.initializeApp(config);

// save firebase database reference
var database = firebase.database();

$("#submit-btn").on("click", function(event) {
  event.preventDefault();

  var 
})



})