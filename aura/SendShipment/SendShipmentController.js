({
  
      callKeyUp: function (component, event, helper) {

        if (event.keyCode == 13)
          var a = component.get('c.submitDetails');
        $A.enqueueAction(a);

      },
      submitDetails: function (component, event, helper) {

        //Add your code to call apex method or do some processing

        console.log('in save n new');
        var responseShow = '';
        var ship = component.get("v.ShipmenttoSend.Barcode__c");
        console.log('-----', ship);
        console.log('-----', JSON.stringify(component.get("v.ShipmenttoSend")));
        console.log('insubmit--');

        var action = component.get("c.UpdateShippingDetails");
        action.setParams({
          "barcode": ship
        });

        action.setCallback(this, function (response) {
          var state = response.getState();
          //console.log('state--'+state);  
          if (state == "SUCCESS") {
            //component.set("v.ShipmenttoSend",response.getReturnValue());
            component.set("v.ShipmenttoSend");
            console.log('--response.getreturn value is-------' + response.getReturnValue());
            // $A.get('e.force:showToast').fire();   

            ///////////////////
            // var toastRef = $A.get("e.force:showToast");
            // console.log('value of toast event--'+toastRef);
            if (response.getReturnValue() == true) {
              responseShow = 'Success';

              // toastRef.setParams({

              //     "type" : "Success",
              //     "title" : "Success",
              //     "message" : "shipment is Sent.",
              //     "mode" : "dismissible"
              // });
              // toastRef.fire();
              // component.set("v.message","Shipment sent successfully");
              // component.set("v.isSuccess",true);
              // alert('Shipment created successfully');
              //  var succesmsg = 'Shipment Sent successfully';
              //  console.log(succesmsg);
            }

            else {
              responseShow = 'ERROR';
              //  console.log('value of toast event in else part--'+toastRef);
              //     toastRef.setParams({
              //         "type" : "Error",
              //         "title" : "Error",
              //         "message" : response.getReturnValue(),
              //         "mode" : "sticky"
              //     }); 
              //     toastRef.fire();
              //     console.log('error toast fired');
            }

            $A.createComponents([
              ["aura:html", {
                'tag': 'div',
                'HTMLAttributes': { "class": "slds-grid slds-box slds-box_x-small" }
              }],
              ["aura:html", {
                'tag': 'span',
                'body': ship,
                'HTMLAttributes': { "class": "slds-size_8-of-12" }
              }],
              ["aura:html", {
                'tag': 'span',
                'body': responseShow,
                'HTMLAttributes': { "class": "slds-size_3-of-12" }
              }]
            ],
              function (components, status) {
                if (status === "SUCCESS") {
                  var objs = [];

                  var div = components[0];
                  //var span1 = components[1];
                  //var span2 = components[2];
                  objs.push(components[1]);
                  objs.push(components[2]);
                  div.set("v.body", objs);
                  var outerDiv = component.find('barcodeList').get('v.body');
                  outerDiv.unshift(div);
                  // outerDiv.push(div);
                  component.find('barcodeList').set('v.body', outerDiv);
                }
              }
            );


            // $A.get("e.force:refreshView").fire();
          }
        });

        $A.enqueueAction(action);


      },
     


})