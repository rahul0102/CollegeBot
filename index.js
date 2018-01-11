const validate = require ("./Validation/validate.js");
const Response= require ("./ResponseModels/response.js");

//to generate responseCard
function createResponseCard(title,subTitle,options,callback){
  var responseCard=Response.ResponseCard;
  responseCard.genericAttachments[0].title=title;
  responseCard.genericAttachments[0].subTitle=subTitle;
  responseCard.genericAttachments[0].buttons=options;
  return callback(responseCard);
}

function createReadyForFulfillmentResponse(event,callback){
  let response=Response.ReadyForFulfillment;
  response.dialogAction.intentName=event.currentIntent.name;
  response.dialogAction.slots=event.currentIntent.slots;
  return callback(response);
}
function createCloseResponse(event,fulfillmentState,message,callback){
    let response=Response.Close;
    response.dialogAction.message.content=message;
    response.dialogAction.fulfillmentState=fulfillmentState;
    return callback(response);

}

function createConfirmIntent(event,message,callback){
  var response=Response.ConfirmIntent;
  delete response.dialogAction.responseCard;
  response.dialogAction.intentName=event.currentIntent.name;
  response.dialogAction.slots=event.currentIntent.slots;
  response.dialogAction.message.content=message;

    console.log("Response:",response);
    return callback(response);
}
function createElicitSlotResponse(event,slotToElicit,message,callback) {
  var response=Response.ElicitSlot;
  delete response.dialogAction.responseCard;
  response.dialogAction.intentName=event.currentIntent.name;
  response.dialogAction.slotToElicit=slotToElicit;
  response.dialogAction.slots=event.currentIntent.slots;
  response.dialogAction.message.content=message;
  return callback(response);
}

function validateSlots(event,Name, EnrollmentNo, Sem, callback){

  if (Name===null){
  createElicitSlotResponse(event,"Name","Can I have Your Good Name Please?.",function (response) {
    console.log("Response", response);
    return callback(response);
  });

  }
  else if (EnrollmentNo===null) {
      createElicitSlotResponse(event,"EnrollmentNo",`${Name},Please tell me your EnrollmentNo.`,function (response) {
        console.log("Response", response);
        return callback(response);
      });

  }

  else if (Sem===null||Sem==="next"){

    validate.validEnroll(EnrollmentNo,function (err,isValid,message) {
      if(err) console.log(err);
      else if(isValid){
        let options;
        createElicitSlotResponse(event,"SemDetails","Ok?",function (response) {
          if(Sem==="next"){
            options=[{text:"3",value:"3"},{text:"4",value:"4"}];
          }
          else{
            options=[{text:"1",value:"1"},{text:"2",value:"2"},{text:"More Options",value:"next"}];
          }
          createResponseCard("Semester?","Which Semester?",options,function(responseCard) {
            response.dialogAction[ "responseCard" ]=responseCard;
            console.log("Response", response);
            return callback(response);

          });
        });

      }
      else {
        createElicitSlotResponse(event,"EnrollmentNo",message,function (response) {
          console.log("Response", response);
          return callback(response);
        });
      }
    });
  }
  else return callback(null);
}

exports.handler=(event, context, callback)=>{

    const sessionAttributes=event.sessionAttributes;
    const slots=event.currentIntent.slots;
    const EnrollmentNo=slots.EnrollmentNo;
    const Name=slots.Name;

    const Sem=slots.SemDetails;
    const invocationSource=event.invocationSource;

    //var response=null;
    console.log("Event:",event);
    if(event.inputTranscript==="bye"||event.currentIntent.confirmationStatus==="Denied"){
      createCloseResponse(event,"Failed","Good Bye!",function (response) {
        callback(null,response);
      });
    }
    else if(event.currentIntent.confirmationStatus==="Confirmed"){

      createCloseResponse(event,"Fulfilled","Your CGPA is 9.0",function (response) {
        callback(null,response);
      });
    }
    else if(invocationSource==="FulfillmentCodeHook"){

      console.log("FullfillmentCodehook called..");
      createCloseResponse(event,"Fulfilled","Your CGPA is 9.0",function (response) {
        callback(null,response);
      });
    }
    else{

      validateSlots(event,Name,EnrollmentNo,Sem,function (response) {
        console.log("Response LAst:",response);
        if(response){
          console.log("validate called");
          callback(null,response);

        }
        else{
          console.log("createConfirmIntent calling. .");
          createConfirmIntent(event,`Name:${Name} \n EnrollmentNo: ${EnrollmentNo} \n Sem:${Sem}\n ok?`,function (response) {
            createResponseCard("Confirm","yes or no",[{text:"Yes",value:"yes"},{text:"No",value:"No"}],function (responseCard) {
              response.dialogAction["responseCard"]=responseCard;
              callback(null,response);
               delete response.responseCard;
              console.log("createConfirmIntent called. .");
          });


      });
      }
    });
    }
  }
