var apiKey = require('./../.env').apiKey;
var Time = require('../js/time.js').timeModule;
var Doctor = require('../js/doctor.js').doctorModule;
// var express = require('express');
// var app = express();

$(function() {
  var time = new Time();
  var doctor = new Doctor();
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
      var doctorInformationArray = new Array();
      for(var i = 0; i < json.data.length; i++){
        var name = json.data[i].profile.first_name;
        var id = json.data[i].uid;

        var doctor = {
          "name": name,
          "id": id
        }
        doctorInformationArray.push(doctor);

        $("#doctorList").append("<li class='doctor' value='" + id + "'>" + name + "</li>");

        // $("#doctorList").append("<li class='doctor' value='" + id + "'><a href='/doctor/" + id +"'>" + name + "</a></li>");
      }
      localStorage.setItem("doctorInformationArray", JSON.stringify(doctorInformationArray));
    }
  });

  $("#selectFilter").change(function() {
    var filter = $("#selectFilter").val();
    $("#span-search-name").text(filter);
  });

  $("#doctorList li").click(function() {
    alert("working!");
    $(".search-doctor").hide();
    $(".doctor-page").show();
    var $this = $(this);
    var doctorId = parseInt($this.attr('value'));
    var doctorObject = doctor.find(doctorId);
    $("#doctorName").text(doctorObject.name);
    $("#doctorBio").text(doctorObject.bio);
    $(".doctor-image img").attr('src', doctorObject.image);
  });

});

// app.get('/doctor/:id', function (req, res) {
//   var doctorId = parseInt(request.params(':id'));
//   var newDoctor = doctor.find(doctorId);
//
//   res.send('');
// });
