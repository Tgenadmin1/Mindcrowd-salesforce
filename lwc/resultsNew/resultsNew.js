import { LightningElement, track, wire } from 'lwc';

export default class ResultsNew extends LightningElement {
    @track attempts = [{Id:1,Name:'Attempt1'},{Id:1,Name:'Attempt2'},{Id:1,Name:'Attempt3'},{Id:1,Name:'Attempt4'},
    {Id:1,Name:'Attempt5'},{Id:1,Name:'Attempt6'},{Id:1,Name:'Attempt7'},{Id:1,Name:'Attempt8'}];
    @track visibleAttempts = [{Id:1,Name:'Attempt1'},{Id:1,Name:'Attempt2'},{Id:1,Name:'Attempt3'},{Id:1,Name:'Attempt4'}];
    @track hiddenAttempts = [{Name:'Attempt5'},{Id:1,Name:'Attempt6'},{Id:1,Name:'Attempt7'},{Id:1,Name:'Attempt8'}];
    @track selectedTab;

   /* @wire(getAttempts) 
    wiredAttempts({ error, data }) {
        if (data) {
            this.attempts = data;
            this.visibleAttempts = this.attempts.slice(0,4);
            this.hiddenAttempts = this.attempts.slice(4);
        } else if (error) {
            console.error(error);
        }
    }*/

    get hasAttempts() {
        return this.attempts.length > 0;
    }

    get hasMoreAttempts() {
        return this.hiddenAttempts.length > 0;
    }

    handleActiveTab(event) {
        this.selectedTab = event.detail.tabId;
    }

    handleMoreTab(event) {
        this.visibleAttempts.push(event.target.label);
        const index = this.hiddenAttempts.findIndex(attempt => attempt.Name === event.target.label);
        this.hiddenAttempts.splice(index, 1);
        this.selectedTab = event.target.label;
    }
}