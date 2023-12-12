({
    createGraph : function(cmp, temp) {
        console.log('chartData age--',cmp.get("v.age"));
         console.log('chartData--memoryTestScore',cmp.get("v.memoryTestScore"));
        var el = cmp.find('bubbleChart').getElement();
        var ctx = el.getContext('2d');
        console.log('el-->',el);
        
        new Chart(ctx, {
            type: 'bubble',
            data: {
                datasets: [{
                   // label: [cmp.get("v.chartLabel")],
                    data: [{
                        x: cmp.get("v.xAxisValue"),
                        y: cmp.get("v.yAxisValue"),
                        r: 10   //,name: "Performance", label: 'Your Score'
                    }],
                    backgroundColor: "#546",
                    borderWidth:"2",
                    borderColor:"#784"
                }]
            },
            options: {
                 legend: {
                display: false
            },
                
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                       // id: 'first-y-axis',
                       // type: 'linear',
                        ticks: {
                            min: cmp.get("v.yAxisMinValue"),
                            max: cmp.get("v.yAxisMaxValue"),
                            stepSize: cmp.get("v.yAxisStepSize"),
                            display: true
                           
                        },
                        gridLines: {
                               display: true,
                               drawBorder: true,
                               drawOnChartArea: false,
                            color: "orange"
                            }
                    }],
                    xAxes: [{
                        ticks: {
                            min: cmp.get("v.xAxisMinValue"), // Controls where axis starts
                            max: cmp.get("v.xAxisMaxValue"), // Controls where axis finishes
                            stepSize: cmp.get("v.xAxisStepSize"),
                            display: true
                        },
                         gridLines: {
                              display: true,
                              drawBorder: true,
                              drawOnChartArea: false,
                             color: "orange"
                            }
                    }]
                }
            }
            
            
        });
        
    }
})