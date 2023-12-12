({
    createGraph : function(cmp, temp) {
        /*
        var dataMap = {"chartLabels": Object.keys(temp),
                       "chartData": Object.values(temp)
                      };*/
        let ds = [];
         let colors = cmp.get("v.bg-colors");
        //let colors = cmp.get("v.bgcolorsMap");
        console.log('colors-->', colors);
        console.log('temptemptemptemp-->',temp);
        for ( var key in temp )  {
            console.log('key-->',key);
              console.log('value-->',temp[key]);
            let entyVal ={};
            entyVal['label'] = key;
            entyVal['backgroundColor'] = colors[key];
            entyVal['data'] = temp[key];
            entyVal['barThickness'] = 40;
           
            entyVal['borderColor'] = "#004d00";
            entyVal['borderWidth'] = 1;
         	ds.push(entyVal);
        }
        console.log('ds-->',ds);
        var el = cmp.find('barChart').getElement();
        var ctx = el.getContext('2d');
        console.log('el-->',el);
        var data={
            labels: ['Ready to send','kit sent','Kits Delivered','Kits not received in 30 days','Kits returned'],
            datasets: ds
        };
        new Chart(ctx, {
            type: 'bar',
            data: data,
            
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            
                            min: 0,
                            max: 200,
                            callback: function(value){return value}
                        },
                        
                        
                    }],
                    
                },
				 responsive: true,
				legend: {
					position: 'bottom',
					display: true,

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