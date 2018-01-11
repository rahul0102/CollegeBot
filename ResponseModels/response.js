exports.Close={
  dialogAction:{
    type:"Close",
    fulfillmentState:"Fulfilled",//required
    message:{ //optional
      contentType:"PlainText",
      content:"message"
    }
  }
};

exports.Delegate={
  sessionAttributes:{}, //required
  dialogAction:{
    type:"Delegate",
    slots:{}//required
  }
};

exports.ConfirmIntent={
  sessionAttributes:{},
  dialogAction:{
    type:"ConfirmIntent",
    message:{
      contentType:"PlainText",
      content:""
    },
    intentName:"",//required
    slots:{}//required
  }
};

exports.ElicitSlot={
  sessionAttributes:{},
  dialogAction:{
    type:"ElicitSlot",
    message:{
      contentType:"PlainText",
      content:""
    },
    intentName:"",//required
    slots:{},//required
    slotToElicit:""//required
  }
};

exports.ResponseCard={
  version:1,
  contentType:"application/vnd.amazonaws.card.generic",
  genericAttachments:[
    {
      title:"",
      subTitle:"",
      imageUrl:null,
      attachmentLinkUrl:null,
      buttons:[]
    }
  ]
};

exports.ElicitIntent={
  sessionAttributes:{},
  dialogAction:{
    type:"ElicitIntent",
    message:{
      contentType:"PlainText",
      content:""
    }
  }
};

exports.ReadyForFulfillment={
  sessionAttributes:{},
  dialogAction:{
    type:"ReadyForFulfillment",
    slots:{},
    intentName:""
  }
};
