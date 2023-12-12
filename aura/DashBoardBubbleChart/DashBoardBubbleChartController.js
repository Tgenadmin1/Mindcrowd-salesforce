({
    ctr : function(cmp, event, helper) {
        let temp = cmp.get('v.chartData');
        console.log('chartData--',temp);
        helper.createGraph(cmp, temp);
    }
})