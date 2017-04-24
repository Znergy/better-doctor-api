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
    var userSearch = $("#userSearch").val();
    if(userSearch !== "") {
    var filter = $("#selectFilter").val();
    var searchParamater;
    var query;
    if(filter.includes("Location")) {
      searchParamater = "query";
      query = "doctors";
    } else if(filter.includes("Name")) {
      searchParamater = "name";
      query = "doctors";
    } else if(filter.includes("Medical")) {
      searchParamater = "query";
      query = "doctors";
    } else if(filter.includes("Speciality")) {
      searchParamater = "query";
      query = "doctors";
    }

    $.ajax({
      type: "GET",
      url: "https://api.betterdoctor.com/2016-03-01/" + query + "?" + searchParamater + "=" + userSearch + "&skip=2&limit=10&user_key=" + apiKey,
      dataType: "json",
      success: processJSON
    });

    function processJSON(json) {
      $("#doctorList").empty();
      var doctorInformationArray = new Array();
      for(var i = 0; i < json.data.length; i++){
        var name = json.data[i].profile.first_name + " " + json.data[i].profile.last_name;
        var id = json.data[i].uid;
        var imageSrc = json.data[i].profile.image_url;
        var bio = json.data[i].profile.bio;

        var doctor = {
          "name": name,
          "id": id
        }
        doctorInformationArray.push(doctor);
        if(bio !== "") {
          $("#doctorList").append(
            "<div class='row'>" +
              "<div class='doctor-profile'>" +
                "<div class='col-md-6'>" +
                  "<h3>" + name + "</h3>" +
                  "<p>" + bio + "</p>" +
                "</div>" +
                "<div class='col-md-4'>" +
                  "<img class='img-responsive' src='" + imageSrc + "' alt='" + name + "'>" +
                "</div>" +
                "<div class='col-md-2'></div>" +
              "</div>" +
            "</div>"
          );
        }

        // $("#doctorList").append("<li class='doctor' value='" + id + "'><a href='/doctor/" + id +"'>" + name + "</a></li>");
      }
      localStorage.setItem("doctorInformationArray", JSON.stringify(doctorInformationArray));
    }
  } else {
    alert("Invalid Input");
  }
  });

  $("#selectFilter").change(function() {
    var filter = $("#selectFilter").val();
    $("#span-search-name").text(filter);
  });

  // function showDoctorPersonalPage() {
  //   console.log("inside doctorlist li click event");
  //   $(".search-doctor").hide();
  //   $(".doctor-page").show();
    // var doctorId = parseInt($(this).attr('value'));
    // var doctorObject = doctor.find(doctorId);
    // console.log(doctorObject);
    // $("#doctorName").text(doctorObject.name);
    // $("#doctorBio").text(doctorObject.bio);
    // $(".doctor-image img").attr('src', doctorObject.image);
  // }

  // $("#doctorList li").click(function() {
  //   console.log("inside doctorlist li click event");
  //   $(".search-doctor").hide();
  //   $(".doctor-page").show();
  //   var doctorId = parseInt($(this).attr('value'));
  //   var doctorObject = doctor.find(doctorId);
  //   console.log(doctorObject);
  //   $("#doctorName").text(doctorObject.name);
  //   $("#doctorBio").text(doctorObject.bio);
  //   $(".doctor-image img").attr('src', doctorObject.image);
  // });

});

// app.get('/doctor/:id', function (req, res) {
//   var doctorId = parseInt(request.params(':id'));
//   var newDoctor = doctor.find(doctorId);
//
//   res.send('');
// });
