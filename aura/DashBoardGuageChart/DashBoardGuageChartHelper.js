({
    createGraph : function(cmp, temp) {
        
        var el = cmp.find('guageChart').getElement();
        var ctx = el.getContext('2d');
        console.log('guageColor',cmp.get("v.guageColor"));
        console.log('el-->',el);
        
        new Chart(ctx, {
            type: 'gauge',
            padding: 0,
            data: {
               // labels: ['Low','Average','Max'],
                datasets: [{
                    data: [cmp.get("v.lowAverage"),cmp.get("v.highAverage"), cmp.get("v.maxValue")],
                    value: cmp.get("v.value"),
                    backgroundColor:cmp.get("v.guageColor"),
                    borderColor:'#C5B396',
                    borderWidth: 1
                }]
            },
            
            options: {
                responsive: true,
                title: {
                    display: true,
                    position: 'bottom',
                    fontSize: "18",
                    text: [cmp.get("v.chartLabel")],
                    color :'#33ffe3'
                },
                layout: {
                    padding: {
                        bottom: 0
                    }
                    
                },
                needle: {
                    // Needle circle radius as the percentage of the chart area width
                    radiusPercentage: 2,
                    // Needle width as the percentage of the chart area width
                    widthPercentage: 3.2,
                    // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
                    lengthPercentage: 80,
                    // The color of the needle
                    color: '#12233e'
                },
                valueLabel: {
                    formatter: Math.round
                    
                },
                plugins: {
                    datalabels:{
                        
                        display: true,
                        formatter:  function (value, context) {
                            return context.chart.data.labels[context.dataIndex];
                        },
                        color: function (context) {
                            return context.dataset.backgroundColor;
                        },
                        backgroundColor: '0',
                        borderWidth: 0,
                        borderRadius: 5,
                        font: {
                            weight: 'bold'
                        }
                    }
                }
            }
            
        });
    }
})