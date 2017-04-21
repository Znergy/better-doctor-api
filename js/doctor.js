function Doctor() {

}

Doctor.prototype.find = function(id) {
  var doctorInformationArray = JSON.parse(localStorage.getItem("doctorInformationArray"));
  for(var i = 0; i < doctorInformationArray.length; i++) {
    if(doctorInformationArray[i].id === id) {
      return doctorInformationArray[i];
    }
  }
};

exports.doctorModule = Doctor;
