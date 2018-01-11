const mysql= require ('mysql');
const db = mysql.createConnection(require('mysql.js'));

//connect
db.connect(function (err,callback) {
  if(err) console.log(err);
  else {
    callback(console.log("Db connected"));
  }
});
exports.getResult=function (EnrollmentNo,Sem) {
  let sql= "SELECT Sem${Sem} From Results WHERE EnrollmentNo=${EnrollmentNo}";
  db.query(sql,function (err,result) {
    if(err) console.log(err);
    else{
      return result;
      console.log(result);
    }
  });
};
