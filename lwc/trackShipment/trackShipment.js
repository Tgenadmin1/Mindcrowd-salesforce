import { LightningElement, api, track } from 'lwc';
import GetTrackingDetails from '@salesforce/apex/TrackShipment.GetTrackingDetails';
import UpdateTrackingDetails from '@salesforce/apex/ShippingDetailsController.UpdateTrackingDetails';
import getTrackingIdByRecordId from '@salesforce/apex/ShippingDetailsController.getTrackingIdByRecordId';
import { CloseActionScreenEvent } from 'lightning/actions';
import { updateRecord } from 'lightning/uiRecordApi';

export default class TrackShipment extends LightningElement {


    isModalOpen = true;
    @track error;
    @track spinner = false;
    @api label;
    @api recordId;
    // @api isLoaded = false;
    trackingId;
    uspsstatus;
    uspsstatuscode;
    tracksummary;
    returnTrackingId;

    connectedCallback() {
        console.log('CONNECTED CALLBACK');
        this.spinner = true;
        setTimeout(() => { this.getTrackingId(); }, 2000);


    }


    getTrackingId() {
        console.log('recordid id---', this.recordId);
        getTrackingIdByRecordId({ recordId: this.recordId })
            .then(result => {
                console.log('result for record id----', result);
                if (result) {
                    this.uspsstatus = result[0].Shipment_Status__c;
                    console.log('---in result of gettracking id by record id--ALL VALUES ARE SAVED IN JS VARIABLE');
                    if (this.uspsstatus == 'Sent' || this.uspsstatus == 'Delivered') {
                        if (this.uspsstatus == 'Sent') {
                            this.trackingId = result[0].Tracking_Id__c;
                        } else if (this.uspsstatus == 'Delivered') {
                            this.trackingId = result[0].Return_TrackingId__c;
                        }
                        
                        this.getTrackingDetailsFromApi();
                        console.log('IN SENT USPS STATUS AFTER API CALLING--');
                    } else if (this.uspsstatus == 'Received') {
                        this.returnTrackingId = result[0].Return_TrackingId__c;
                        console.log('IN DELIVERED USPS STATUS BEFORE API CALLING--');
                        this.getTrackingDetailsFromApi();
                    }

                } else {
                    console.log('record id NOT found', result);
                }
            })//then close
            .catch(error => {
                console.log('error: ', error);
            });//CATCH CLOSE
    }
    getTrackingDetailsFromApi() {
        GetTrackingDetails({ 'trackId': this.trackingId })
            .then(result => {
                console.log('----results are in get tracking details start---', result);
                if (result) {
                    this.uspsstatus = result.StatusCategory;
                    this.tracksummary = result.StatusSummary;
                    //console.log('track summary ----',this.tracksummary);
                    this.uspsstatuscode = result.EventCode;
                    if(this.uspsstatuscode=="")
                   this.uspsstatuscode=result.USPS_ERROR_CODE;
                  // console.log('--- error codee-----',this.uspsstatuscode);
                   if(this.tracksummary=="")
                   this.tracksummary=result.USPS_ERROR_DESC;
                   //console.log('---track summary error desc-----',this.tracksummary);
                    this.UpdateTrackingDetailsNew();
                    
                    console.log('response is----', JSON.stringify(result));
                } else {
                    console.log('Fields NOT updated', result);
                }//else close
            })//then close
            .catch(error => {
                console.log('error: ', error);
            });//catch close
    }

    UpdateTrackingDetailsNew() {
        console.log('IN updatetrackingfields', this.trackingId);
       
        console.log('value of track--', this.tracksummary);
        UpdateTrackingDetails({
            trackingId: this.trackingId,
            returnTrackingId: this.returnTrackingId,
            uspsstatus: this.uspsstatus,
            uspsstatuscode: this.uspsstatuscode,
            tracksummary: this.tracksummary,
            recordId: this.recordId
        })
            .then(result => {
                console.log('result is----', result);
                if (result) {
                    console.log('---in result of update tracking--');
                    this.spinner = false;
                    this.closeQuickAction();
                    updateRecord({ fields: { Id: this.recordId } });
                    } else {
                    console.log('Fields NOT updated', result);
                }
            })//then close
            .catch(error => {
                console.log('error: ', error);
            });//CATCH CLOSE

               
    }
    closeQuickAction() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
}