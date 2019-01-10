$(document).ready(function () {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCs94eGyHzTZrzvNUOqzqdfXrgQL_YoTY8",
    authDomain: "train-57a8d.firebaseapp.com",
    databaseURL: "https://train-57a8d.firebaseio.com",
    projectId: "train-57a8d",
    storageBucket: "",
    messagingSenderId: "633321096708"
  };
  firebase.initializeApp(config);

  // save firebase database reference
  var database = firebase.database();

  $("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var trainData = {
      name: $("#name-input").val().trim(),
      destination: $("#destination-input").val().trim(),
      time: $("#time-input").val(),
      // frequency: $("frequency-input").val()
    };

    // //remember to conver time to unix
    // trainData.time = moment(trainData.time).format("X");
    //push data to firebase
    database.ref().push(trainData);

    //clear value in form input tags on page
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });



  //child_added event listener for firebase to send new information everytime a new train is added and when page loads
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var time = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    var $tr = $("<tr>");
    $tr
      .attr("train-key", childSnapshot.key)
      .append(`<td>${name}</td>`)
      .append(`<td>${destination}</td>`)
      .append(`<td>${time}</td>`)
      .append(`<td>${frequency}</td>`);

    $("tbody#train-info").append($tr);

  });
});