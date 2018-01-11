exports.validEnroll=function (EnrollmentNo,callback) {
  //var pattern= "/[0-9]{11}/";
  console.log("EnrollmentNo:",EnrollmentNo);
  if(EnrollmentNo==="" || !(/^([0-9]{11})$/.test(EnrollmentNo.toString()))){
    callback(null,false,"Please provide valid EnrollmentNo! e.g. 14012011045");
  }else{
    callback(null,true,"");
  }
};
