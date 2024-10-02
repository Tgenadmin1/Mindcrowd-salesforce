import {LightningElement, track} from 'lwc';

import updateContact from '@salesforce/apex/TestContactCtrl.updateContact';
import getRecord from '@salesforce/apex/TestContactCtrl.getRecord';

export default class TestContactCreate extends LightningElement {
    
    @track recordId = '0030100000O5Nc2AAF';
    @track contactEmail='';
    @track contactFirstName='';
    @track contactLastName='';
    @track spinner;

    handeIdChange(event){
        this.recordId = event.detail.value;
        if(this.recordId){
            getRecord({recordId:this.recordId})
            .then(res=>{
                this.contactEmail = res.Email;
                this.contactFirstName = res.FirstName;
                this.contactLastName = res.LastName;
            });
        }
    };

    handleEmailChange(event){
        this.contactEmail = event.detail.value;
    };

    handleFirstNameChange(event){
        this.contactFirstName = event.detail.value;
    };

    handleLastNameChange(event){
        this.contactLastName = event.detail.value;
    };

    handleClick(){
        this.spinner = true;
        let data = {}
        if(this.recordId){
            data = {sobjectType:"Contact",Id:this.recordId,Email:this.contactEmail,FirstName:this.contactFirstName,LastName:this.contactLastName};
        }
        else{
            data = {sobjectType:"Contact",Email:this.contactEmail,FirstName:this.contactFirstName,LastName:this.contactLastName};
        }
        
        console.log(JSON.stringify(data));
        updateContact({conObj:data})
        .then(res=>{
            this.recordId = res.Id;
            this.contactEmail = res.Email;
            this.contactFirstName = res.FirstName;
            this.contactLastName = res.LastName;
            alert('Updated!');
        })
        .catch(error=>{
            console.error(JSON.stringify(error));
        })
        .finally(()=>{
            this.spinner = false;
        });
    }
}