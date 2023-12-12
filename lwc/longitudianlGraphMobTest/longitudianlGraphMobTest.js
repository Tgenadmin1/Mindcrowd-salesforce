import { LightningElement, track, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
//import chartjs from '@salesforce/resourceUrl/Chartsjs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getGraphdData  from '@salesforce/apex/LongitudinalMobTestController.getGraphdData';

import WordPairs from '@salesforce/label/c.game_name_1';
import React from '@salesforce/label/c.game_name_2';
import Shapes from '@salesforce/label/c.game_name_3';
import Focus from '@salesforce/label/c.game_name_4';
import FacesName from '@salesforce/label/c.face_name_game_text_0';
import Switching from '@salesforce/label/c.game_name_6';
import KeepTrack from '@salesforce/label/c.game_name_7';
import Objects from '@salesforce/label/c.game_name_8';
import ObjectsTime from '@salesforce/label/c.game_name_9';
import ObjectsSpace from '@salesforce/label/c.game_name_10';
import graphtitle from '@salesforce/label/c.graphtitle';
import Games from '@salesforce/label/c.Games';



export default class ChartExample extends LightningElement {
    @track isChartJsInitialized;
    chart;
    configdata ={};
    error;
    graphtitle = graphtitle;
    @api reactChart=false;
    @api objectChart=false;

    renderedCallback() {
       if (this.isChartJsInitialized) {
            return;
        }
        this.isChartJsInitialized = true;
        getGraphdData()
        .then(result => {
           result.hasError = false;           
           console.log('result: '+  JSON.stringify(result));
           if(!this.reactChart)
           {
            const custEvent = new CustomEvent('passvalue', { detail: {result} });
            this.dispatchEvent(custEvent);
           }
          
             this.configdata = {
              type: "line",
              data: {
                datasets: [
                  {
                    fill: false,
                    label: Focus,
                    data: result.gamedataList.flankerdataList,
                    backgroundColor: [
                      "rgba(47, 85, 151, 0.2)"
                    ],
                    borderColor: [
                      "rgba(47, 85, 151, 1)"
                    ],
                    pointBackgroundColor: "rgba(47, 85, 151, 0.2)",
                    pointBorderColor: "rgba(47, 85, 151, 1)"
                  },
                  {
                    fill: false,
                    label: FacesName,
                    data: result.gamedataList.FaceNameList,
                    backgroundColor: [
                      "rgba(46, 204, 113, 0.2)"
                    ],
                    borderColor: [
                      "rgba(46, 204, 113, 1)"
                    ],
                    pointBackgroundColor: "rgba(46, 204, 113, 0.2)",
                    pointBorderColor: "rgba(46, 204, 113, 1)"
                  },
                  {
                    fill: false,
                    label: KeepTrack,
                    data: result.gamedataList.keepTrackdataList,
                    backgroundColor: [
                      "rgba(230, 126, 34, 0.2)"
                    ],
                    borderColor: [
                      "rgba(230, 126, 34, 1)"
                    ],
                    pointBackgroundColor: "rgba(230, 126, 34, 0.2)",
                    pointBorderColor: "rgba(230, 126, 34, 1)"
                  },                  
                  {
                    fill: false,
                    label: Switching,
                    data: result.gamedataList.switchingdataList,
                    backgroundColor: [
                      "rgba(48, 79, 82, 0.2)"
                    ],
                    borderColor: [
                      "rgba(48, 79, 82, 1)"
                    ],
                    pointBackgroundColor: "rgba(48, 79, 82, 0.2)",
                    pointBorderColor: "rgba(48, 79, 82, 1)"
                  },
                  {
                    fill: false,
                    label: WordPairs,
                    data: result.gamedataList.wordPairsdataList,
                    backgroundColor: [
                      "rgba(131,147,33, 0.2)"
                    ],
                    borderColor: [
                      "rgba(131,147,33, 1)"
                    ],
                    pointBackgroundColor: "rgba(131,147,33, 0.2)",
                    pointBorderColor: "rgba(131,147,33, 1)"
                  },
                  {
                    fill: false,
                    label: Objects,
                    data: result.gamedataList.objectsdataList,
                    backgroundColor: [
                      "rgba(99, 57, 116, 0.2)"
                    ],
                    borderColor: [
                      "rgba(999, 57, 116, 1)"
                    ],
                    pointBackgroundColor: "rgba(99, 57, 116, 0.2)",
                    pointBorderColor: "rgba(99, 57, 116, 1)"
                  },
                  {
                    fill: false,
                    label: ObjectsSpace,
                    data: result.gamedataList.objectSpacedataList,
                    backgroundColor: [
                      "rgba(255, 255, 0, 0.2)"
                    ],
                    borderColor: [
                      "rgba(255, 255, 0, 1)"
                    ],
                    pointBackgroundColor: "rgba(255, 255, 0, 0.2)",
                    pointBorderColor: "rgba(255, 255, 0, 1)"
                  },
                  {
                    fill: false,
                    label: ObjectsTime,
                    data: result.gamedataList.objectTimedataList,
                    backgroundColor: [
                      "rgba(255, 0, 0, 0.2)"
                    ],
                    borderColor: [
                      "rgba(255, 0, 0, 1)"
                    ],
                    pointBackgroundColor: "rgba(255, 0, 0, 0.2)",
                    pointBorderColor: "rgba(255, 0, 0, 1)"
                  },
                  {
                    fill: false,
                    label: Shapes,
                    data: result.gamedataList.shapesdataList,
                    backgroundColor: [
                      "rgba(89, 34, 34, 0.2)"
                    ],
                    borderColor: [
                      "rgba(89, 34, 34, 1)"
                    ],
                    pointBackgroundColor: "rgba(89, 34, 34, 0.2)",
                    pointBorderColor: "rgba(89, 34, 34, 1)"
                  }
                ]
              },
              options: {
                responsive : true,
                maintainAspectRatio : false,
                elements: {
                  line: {
                      tension: 0
                  }
              },
              /*legend: {
                labels: {
                  fontSize: 20 // set font size here
                }
              },
                title: {
                  display: true,
                  //text: Games,
                  fontSize: 24
                },*/
                scales: {
                  xAxes: [
                    {
                      type: "category",
                      labels: result.xAxisLabels
                    }
                  ],
                  yAxes: [
                    {
                      type: "linear",
                      ticks: {
                        autoSkip: true,
                        suggestedMin: 0,
                        suggestedMax: 100,
                        stepSize: 20
                      }
                    }
                  ]
                }
              }
            };
           
           
          return Promise.all([
           // loadScript(this, chartjs+'/Chart.js')
           loadScript(this, chartjs)
        ])
        })
        .then(() => {
          const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
          this.chart = new window.Chart(ctx, this.configdata);
          this.chart.canvas.parentNode.style.height = '100%';
          this.chart.canvas.parentNode.style.width = '100%';
        }).catch(error => {
          this.dispatchEvent(
            //Pending, need to add error here
              new ShowToastEvent({
                  title: 'Error loading ChartJS',
                  message: error.message,
                  variant: 'error',
              }),
          );
      })
      .catch(error => {
          this.error = error;
          console.log('error'+ JSON.stringify(this.error));
      });


    }
}