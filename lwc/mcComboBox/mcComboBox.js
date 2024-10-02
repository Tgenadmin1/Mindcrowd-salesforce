import { LightningElement,api } from 'lwc';

export default class McComboBox extends LightningElement {

    @api label; // Label for the dropdown
    @api values = []; // Array of values for the dropdown
    @api selectedValue='Please Choose'; // Selected value
    @api dropdownid;
  
    handleClick() {
        console.log('click');
        this.template.querySelector('.slds-dropdown-trigger').classList.add('slds-is-open');
    }
  
    handleOptionClick(event) {
        console.log('selected value: '+event.currentTarget.dataset.value);
        this.selectedValue = event.currentTarget.dataset.value;  
        //this.template.querySelector('.slds-is-selected').classList.remove('slds-is-selected');
        //this.template.querySelector('[id="${this.selectedValue}"]').add('slds-is-selected');
        this.template.querySelector('.slds-is-open').classList.remove('slds-is-open');
        this.dispatchEvent(new CustomEvent('select', { detail: { value: this.selectedValue}}));
    }
}