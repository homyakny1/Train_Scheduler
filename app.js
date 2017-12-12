// Connecting Firebase
var config = {
    apiKey: "AIzaSyAcsQtfKYcE4S_wWU5TCuLBXzv_4XDisRY",
    authDomain: "my-awesome-project-24604.firebaseapp.com",
    databaseURL: "https://my-awesome-project-24604.firebaseio.com",
    projectId: "my-awesome-project-24604",
    storageBucket: "my-awesome-project-24604.appspot.com",
    messagingSenderId: "236505507474"
};

firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// When submit click button pressed
$("#submit").on("click", function () {

    event.preventDefault();
    // Grab user INput
    var name = $("#name-input").val().trim();
    var destination = $("#dest-input").val().trim();
    var time = moment($("#time-input").val().trim(), "HH:mm").format();
    var minutes = $("#min-input").val().trim();

    // Create var that will be pushed in to database
    var newTrain = {
        emName: name,
        emDestination: destination,
        emTime: time,
        emMinutes: minutes
    };

    // Push data into Firebase
    database.ref().push(newTrain);

    //Clear input values
    $("#name-input").val("");
    $("#dest-input").val("");
    $("#time-input").val("");
    $("#min-input").val("");
})

//Create Firebase event for adding a child to the database
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var cs = childSnapshot.val();

    var nameFire = (cs.emName);
    var destinationFire = (cs.emDestination);
    var timeFire = (cs.emTime);
    var minutesFire = (cs.emMinutes);

    // First Train Time convertion
    var convertedTime = moment(timeFire, "HH:mm");
    
    // Difference
    var timeDif = moment().diff(moment(convertedTime), "minutes");

    //Time Apart
    var timeApart = (timeDif % minutesFire)*(-1);

    //Next Train
    var nextTrain = moment().add(timeApart, "minutes");

    // Append everything into HTML
    $("#trainList").append("<tr><td>" + nameFire + "</td><td>" + destinationFire + "</td><td>" + minutesFire + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + timeApart + "</td></tr>")


})