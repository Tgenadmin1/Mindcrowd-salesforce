({
    createGraph : function(cmp, temp) {
        
      if (!temp || typeof temp !== 'object') {
            console.error('Invalid temp data:', temp);
            return;
        } 
        
        var dataMap = {"chartLabels": Object.keys(temp),
                       "chartData": Object.values(temp)
                      };
        console.log('dataMap-->',dataMap);
        var el = cmp.find('barChart').getElement();
        var ctx = el.getContext('2d'); 
        console.log('el-->',el);
        var data={
            labels: dataMap.chartLabels,
            datasets: [
                {
                    label: cmp.get("v.chartLabel") +" Score",
                    // backgroundColor: "#40E0D0",
                    backgroundColor : cmp.get("v.bgColors"),
                   
                    data: dataMap.chartData,
                    barThickness :40,
                    hoverBackgroundColor :"#004d00",
                    borderColor:"#004d00",
                    borderWidth: 1
                }
                
            ]
        };
        new Chart(ctx, {
            type: 'bar',
            data: data,
            
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                
                                min: cmp.get("v.minScale"),
                              //  max: cmp.get("v.maxScale"),
                                callback: function(value){return value}
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            }
                            
                        }],
                    
                    xAxes :[
                        {
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            }
                        }
                    ]
                    
                },
                responsive: true,
                legend: {
                    position: 'bottom',
                    display: false,
                    
                },
                "hover": {
                    "animationDuration": 0
                },
                
                "animation": {
                    "duration": 1,
                    "onComplete": function() {
                        var chartInstance = this.chart,
                            ctx1 = chartInstance.ctx;
                        
                        ctx1.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx1.textAlign = 'center';
                        ctx1.textBaseline = 'bottom';
                        
                        this.data.datasets.forEach(function(dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i); 
                            meta.data.forEach(function(bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            }
            
        });
    }
})