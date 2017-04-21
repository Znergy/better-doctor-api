var apiKey = require('./../.env').apiKey;
var Time = require('../js/time.js').timeModule;

$(function() {
  var time = new Time();
  $("#currentTime").text(time.getCurrentTime());
  $("#search").click(function() {
    var userLocation = $("#userLocation").val();
    $.ajax({
      type: "GET",
      url: "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" + apiKey,
      dataType: "json",
      success: processJSON
    });

    function processJSON(json) {
      for(var i = 0; i < json.data.length; i++){
        var doctorName = json.data[i].profile.first_name;
        $("#doctorList").append("<li><a href=''>" + doctorName + "</li>");
      }
    }
  });
});
