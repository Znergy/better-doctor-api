function Time() {
  var time;
}

Time.prototype.getCurrentTime = function() {
  return moment().format("hh:mm:ss a");
};

exports.timeModule = Time;
