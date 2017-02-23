/**
 * Created by Severin on 12.11.2015.
 * sevi_buehler@hotmail.com
 */


C3Chart = function(divId,fields){
    var these = this;
    these.divId = divId;
    these.fields = fields;
    these.chart = null;
    var monitored = {};

    these.init = function(){
        these.chart = c3.generate({
            bindto:'#' + these.divId,
            data: {
                x: 'epoch',
                columns: []
            }
        });
    };
    these.update = function(newData){
        fillToMonitored(newData);
        updateChart();
    };
    var fillToMonitored = function(newData){
        for (key in newData) {
            if (key in monitored) {
                monitored[key].push(newData[key]);
            } else {
                monitored[key] = [key, newData[key]];
            }
        }
    };
    var updateChart = function(){
        chartColumns = []
        chartColumns.push(monitored["epoch"]);
        for(key in monitored){
            for(var i in these.fields){
                field = these.fields[i];
                if(key==field){
                    chartColumns.push(monitored[key]);
                }
            }
        }
        these.chart.load({
            columns:chartColumns
        });
    };
};