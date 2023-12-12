import { LightningElement, track, api } from 'lwc';
import chartjs from '@salesforce/resourceUrl/ChartJs';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Date from '@salesforce/label/c.Date';
import Score from '@salesforce/label/c.Score';

export default class ChartExample extends LightningElement {
    isChartJsInitialized;
    chart;
    error;
    @api chartName;
    @api graphData;

    renderedCallback() {
        let configdata = {
            type: "line",
            data: {
                datasets: [{
                        fill: false,
                        label: "",
                        data: "",
                        backgroundColor: [
                            "rgba(18,35,62, 0.2)"
                        ],
                        borderColor: [
                            "rgba(18,35,62, 1)"
                        ],
                        pointBackgroundColor: "rgba(18,35,62, 0.2)",
                        pointBorderColor: "rgba(18,35,62, 1)",
                        pointRadius: 6, 
                        pointHoverRadius: 8 
                    }
      
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                elements: {
                    line: {
                        tension: 0
                    }
                },
      
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: "category",
                        labels: "",
                        scaleLabel: {
                        display: true,
                        labelString: Date,
                        fontSize: 20
                        }
                    }],
                    yAxes: [{
                        type: "linear",
                        ticks: {
                            autoSkip: true,
                            suggestedMin: 0,
                            stepSize: 5,
                        },
                        scaleLabel: {
                          display: true,
                          labelString: Score,
                          fontSize: 20
                        }
                    }]
                }
            }
          };
      
      if (this.chartName == 'Focus' || this.chartName == 'Concéntrate') {
        const flankdata = [...this.graphData.gamedataList.flankerdataList]
        configdata.data.datasets[0].data = flankdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsflanker];
        const maxscore = flankdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");
        configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+250;
        if(maxscore <= 2000 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =200;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =500;
        }       
      }
      if (this.chartName == 'Keep Track' || this.chartName == 'Seguimiento') {
        const keeptrackdata =[...this.graphData.gamedataList.keepTrackdataList];
        configdata.data.datasets[0].data =keeptrackdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelskeepTrack];
        const maxscore = keeptrackdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 15 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =1.5;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+1.5;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =3;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+3;
        }  
        //configdata.options.scales.yAxes[0].ticks.stepSize =3;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =30;
      }
      if (this.chartName == 'Faces and Names' || this.chartName == 'Rostros y Nombres') {
        const facenamedata =[...this.graphData.gamedataList.FaceNameList];
        configdata.data.datasets[0].data =facenamedata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsFaceName];
        const maxscore = facenamedata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 30 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =3;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+3;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =6;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+6;
        }  
        //configdata.options.scales.yAxes[0].ticks.stepSize =6;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =60;
      }
      if (this.chartName == 'Objects' || this.chartName == 'Objetos') {
        const objdata =[...this.graphData.gamedataList.objectsdataList];
        configdata.data.datasets[0].data =objdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsobjects];
        const maxscore = objdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 25 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =2.5;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+2.5;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+5;
        }
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =48;
      }
      if (this.chartName == 'Objects - Space' || this.chartName == 'Objetos y el Espacio') {
        const objspacedata =[...this.graphData.gamedataList.objectSpacedataList];
        configdata.data.datasets[0].data =objspacedata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsobjectSpace];
        const maxscore = objspacedata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 25 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =2.5;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+2.5;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+5;
        }
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =48;
      }
      if (this.chartName == 'Objects - Time' || this.chartName == 'Objetos en el Tiempo') {
        const objectstimedata =[...this.graphData.gamedataList.objectTimedataList];
        configdata.data.datasets[0].data = objectstimedata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsobjectTime];
        const maxscore = objectstimedata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 25 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =2.5;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+2.5;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+5;
        }
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =48;
      }
      if (this.chartName == 'React' || this.chartName == 'Reacción') {
        const reactdata =[...this.graphData.gamedataList.reactdataList];
        configdata.data.datasets[0].data = reactdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsreact];
        const maxscore = reactdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");
        configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+250;
        if(maxscore <= 1000 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =100;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =200;
        } 
      }
      if (this.chartName == 'Shapes' || this.chartName == 'Formas') {
        const shapesdata =[...this.graphData.gamedataList.shapesdataList];
        configdata.data.datasets[0].data = shapesdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsshapes];
        const maxscore = shapesdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 100 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =10;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+10;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =20;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+20;
        } 
        //configdata.options.scales.yAxes[0].ticks.stepSize =20;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =200;
      }
      if (this.chartName == 'Switching' || this.chartName == 'Cambios') {
        const switchdata =[...this.graphData.gamedataList.switchingdataList];
        configdata.data.datasets[0].data =switchdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsswitching];
        const maxscore = switchdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 100 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =10;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+10;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =20;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+20;
        } 
        //configdata.options.scales.yAxes[0].ticks.stepSize =20;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =192;
      }
      if (this.chartName == 'Word Pairs' || this.chartName == 'Pares de Palabras') {
        const wordpairdata =[...this.graphData.gamedataList.wordPairsdataList];
        configdata.data.datasets[0].data = wordpairdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelswordPairs];
        const maxscore = wordpairdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 18 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =2;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+2;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =4;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+4;
        } 
        //configdata.options.scales.yAxes[0].ticks.stepSize =4;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =36;
      }
      if (this.chartName == 'Fake News' || this.chartName == 'Fake News') {
        const fakenewsdata =[...this.graphData.gamedataList.fakenewsdataList];
        configdata.data.datasets[0].data = fakenewsdata;
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsfakenews];
        const maxscore = fakenewsdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");        
        if(maxscore <= 12 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =1;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+1;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =2;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+2;
        } 
      } 
      if (this.chartName == 'Bean Game' || this.chartName == 'Bean Game') {                    
        const beangameleftdata =[...this.graphData.gamedataList.beangameleftdataList];
        const beangamerightdata =[...this.graphData.gamedataList.beangamerightdataList];        
        configdata.data.datasets[0].data = beangameleftdata;
        configdata.data.datasets[0].label='Left Hand';
        configdata.options.legend.display=true;
        let newDataset = {...configdata.data.datasets[0]};        
        newDataset.data = beangamerightdata; 
        newDataset.label='Right Hand'; 
        console.log(JSON.stringify(newDataset));
        newDataset.pointBackgroundColor='rgba(30,144,255, 0.2)';     
        newDataset.pointBorderColor='rgba(30,144,255, 1)'; 
        newDataset.backgroundColor.filter(item => item !== 'rgba(18,35,62, 0.2)');  
        newDataset.borderColor.filter(item => item !== 'rgba(18,35,62, 1)'); 
        newDataset.backgroundColor.push('rgba(30,144,255, 1)');  
        newDataset.borderColor=('rgba(30,144,255, 1)'); 
        configdata.data.datasets.push(newDataset);        
        configdata.options.scales.xAxes[0].labels =[...this.graphData.xAxisLabelsbeangame];
        /*configdata.options.scales.yAxes[0].type="time"; 
        const time=   {
          parser: 'mm:ss.SS', // Format for the time data
          unit: 'minute',
          unitStepSize: 1,
          displayFormats: {
              'minute': 'mm:ss.SS'
            }
          };
        configdata.options.scales.yAxes[0].time=time;
        configdata.options.scales.yAxes.forEach((yAxis) => {
          delete yAxis.ticks;
        });*/
        console.log(JSON.stringify(configdata));      
        const leftmaxscore = beangameleftdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, "");    
        const rightmaxscore = beangamerightdata.reduce(function(acc, current) {
          if (current.y > acc) {
            return current.y;
          }
          return acc;
        }, ""); 
        let maxscore = Math.max(leftmaxscore, rightmaxscore);
        if(maxscore <= 400 )
        {
          configdata.options.scales.yAxes[0].ticks.stepSize =20;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+20;
        } 
        else{
          configdata.options.scales.yAxes[0].ticks.stepSize =25;
          configdata.options.scales.yAxes[0].ticks.suggestedMax =maxscore+25;
        }
        //configdata.options.scales.yAxes[0].ticks.stepSize =4;
        //configdata.options.scales.yAxes[0].ticks.suggestedMax =36;
      }        
    
      if (this.isChartJsInitialized) {
          return;
      }
      this.isChartJsInitialized = true;

      Promise.all([
          loadScript(this, chartjs)
      ]).then(() => {
          const ctx = this.template.querySelector('canvas.linechart').getContext('2d');
          this.chart = new window.Chart(ctx, configdata);
          this.chart.canvas.parentNode.style.height = '100%';
          this.chart.canvas.parentNode.style.width = '100%';
      }).catch(error => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Error loading ChartJS',
                  message: error.message,
                  variant: 'error',
              }),
          );
      });
  }
}