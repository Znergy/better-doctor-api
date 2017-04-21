var apiKey = require('./../.env').apiKey;
var Time = require('../js/time.js').timeModule;

$(function() {
  $("#currentTime").text(Time.getCurrentTime());
  $("#search").click(function() {
    var userLocation = $("#userLocation").val();
    $.ajax({
        type: "GET",
        url: "https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=" + api_key,
        dataType: "json",
        success: processJSON
      });

      function processJSON(json) {
        var doctorInformationArray = new Array();
        $(json).find("data").each(function() {
          var doctorName = json.data[0].profile.first_name;

          // var doctorInformation = {
          //   "name": doctorName,
          //   "location": doctorLocation
          // }
          $("#doctorList").append("<li>" + doctorName + "</li>");
          // doctorInformationArray.push(doctorInformation);
        });
        // localStorage.setItem("doctorInformationArray", JSON.stringify(doctorInformationArray));
      }
    });
});
