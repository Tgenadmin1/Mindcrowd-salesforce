({

    doInit: function (component, event, helper) {
        setTimeout(function () {
            component.find("barcode").focus();
        }, 500);

    },
    callKeyUp: function (component, event, helper) {
        if (event.keyCode == 13) {
            $A.enqueueAction(component.get('c.submitDetails'));
        }


    },
    submitDetails: function (component, event, helper) {
        console.log("in save n new");
        var responseShow = "";
        var ship = component.get("v.ShipmenttoReceive.Barcode__c");


        console.log("-----", JSON.stringify(component.get("v.ShipmenttoReceive")));


        var action = component.get("c.UpdateShippingDetails");
        action.setParams({
            barcode: ship
        });

        action.setCallback(this, function (response) {
            var state = response.getState();
            console.log("ship-----", state);
            //console.log('state--'+state);
            component.find("barcode").focus();
            if (state == "SUCCESS") {
                var inputCmp = component.find("barcode");
                var value = inputCmp.get("v.value");
                console.log(
                    "--response.getreturn value is-------" + response.getReturnValue()
                );
                if (response.getReturnValue() == false) {
                    inputCmp.setCustomValidity("Please Enter Valid BarCode");
                } else if (value === "" || value == null) {
                    //console.log('value'+value);
                    inputCmp.setCustomValidity("Please Enter BarCode");
                } else {
                    //console.log("value",searchName);
                    inputCmp.setCustomValidity("");
                    component.set("v.ShipmenttoReceive");


                    if (response.getReturnValue() == true) {
                        responseShow = "Received";
                    } else {
                        responseShow = "ERROR";
                    }

                    $A.createComponents(
                        [
                            [
                                "aura:html",
                                {
                                    tag: "div",
                                    HTMLAttributes: { class: "slds-grid slds-box slds-box_x-small" }
                                }
                            ],
                            [
                                "aura:html",
                                {
                                    tag: "span",
                                    body: ship,
                                    HTMLAttributes: { class: "slds-size_8-of-12" }
                                }
                            ],
                            [
                                "aura:html",
                                {
                                    tag: "span",
                                    body: responseShow,
                                    HTMLAttributes: { class: "slds-size_3-of-12" }
                                }
                            ]
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
                                var outerDiv = component.find("barcodeList").get("v.body");
                                outerDiv.unshift(div);
                                // outerDiv.push(div);
                                component.find("barcodeList").set("v.body", outerDiv);
                            }
                        }
                    );

                    // $A.get("e.force:refreshView").fire();
                }
                inputCmp.reportValidity();
            }
        });

        $A.enqueueAction(action);
    }
});