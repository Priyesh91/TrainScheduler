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
      trainName: $("#t-name-input").val().trim(),
      trainDestination: $("#t-destination-input").val().trim(),
      firstTime: $("#first-time-input").val().trim(),
      trainFrequency: $("t-frequency-input").val().trim()
    }
    
    //push data to firebase
    database.ref().push(trainData);

    //clear value in form input tags on page
    $("#t-name-input").val("");
    $("#t-destination-input").val("");
    $("#first-time-input").val("");
    $("#t-frequency-input").val("");
  });



  //child_added event listener for firebase to send new information everytime a new train is added and when page loads
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().trainName;
    var trainDestination = childSnapshot.val().trainDestination;
    var firstTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().trainFrequency;

// First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

    //current time defined in military time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
    
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


    var $tr = $("<tr>");
    $tr
      .attr("train-key", childSnapshot.key)
      .append(`<td>${trainName}</td>`)
      .append(`<td>${trainDestination}</td>`)
      .append(`<td>${trainFrequency}</td>`)
      .append(`<td>${nextTrain.format("hh:mm")}</td>`)
      .append(`<td>${tMinutesTillTrain}</td>`);

    $("tbody#train-info").append($tr);

  })
})