import React, { Component } from 'react';
import {Bar, Chart} from 'react-chartjs-2';

export default class BarChart extends Component {
    constructor(props){
        super(props);
        this.state = { //set state to some props - used to check if graph is updated
            propdata: this.props.datasets[this.props.data],
            data: this.props.data,
            graphIDX: this.props.graphIDX ? (this.props.graphIDX) : (0), //for editable charts usage
            rowIDX: this.props.rowIDX ? (this.props.rowIDX) : (0),   //for editable charts usage
            maxTickLimit: this.props.tickValues
        }

        //This is to create a plugin to display all tooltips for graph
        // Basically copy pasted from here https://github.com/chartjs/Chart.js/issues/1861
        Chart.pluginService.register({
            beforeRender: function (chart) {
                if (chart.config.options.showAllTooltips) {
                    // create an array of tooltips
                    // we can't use the chart tooltip because there is only one tooltip per chart
                    chart.pluginTooltips = [];
                    chart.config.data.datasets.forEach(function (dataset, i) {
                        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                            chart.pluginTooltips.push(new Chart.Tooltip({
                                _chart: chart.chart,
                                _chartInstance: chart,
                                _data: chart.data,
                                _options: chart.options.tooltips,
                                _active: [sector]
                            }, chart));
                        });
                    });
        
                    // turn off normal tooltips
                    chart.options.tooltips.enabled = false;
                }
            },
            afterDraw: function (chart, easing) {
                if (chart.config.options.showAllTooltips) {
                    // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                    if (!chart.allTooltipsOnce) {
                        if (easing !== 1)
                            return;
                        chart.allTooltipsOnce = true;
                    }
        
                    // turn on tooltips
                    chart.options.tooltips.enabled = true;
                    Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
                        tooltip.initialize();
                        tooltip.update();
                        // we don't actually need this since we are not animating tooltips
                        tooltip.pivot();
                        tooltip.transition(easing).draw();
                    });
                    chart.options.tooltips.enabled = false;
                }
            }
        });
    }
    render(){
        var graphTitle = this.props.title;
        if (graphTitle == "") //set graph title if no title
        {
            graphTitle = "Graph Title";
        }

        if (this.state.data != this.props.data) //Update Chart Data if it did not rerender
        {
            this.setState( {
                propdata: this.props.datasets[this.props.data],
                data: this.props.data}
            );
        }

        return (
            <div className = "BarChart">
                <Bar //sets width and height to 200 if not explicitly set
                    data={this.state.propdata}
                    width={
                        this.props.width ? (
                            this.props.width
                        )
                        :
                        (
                            200
                        )
                    }
                    height={
                        this.props.height ? (
                            this.props.height
                        )
                        :
                        (
                            200
                        )
                    }
                    options={{
                        maintainAspectRatio: false,
                        // displays title if this.props.title is true defaults false
                        title: {
                            display: this.props.displayTitle,
                            text: graphTitle
                        },
                        // displays legend if this.props.legend is true defaults false
                        legend: {
                            display: this.props.legend
                        },
                        // shows all tooltips if this.props.showAllTooltips is true defaults false
                        showAllTooltips: this.props.showAllTooltips,
                        tooltips :{
                            backgroundColor: '#44444477',
                        },
                        // puts numbers on top of each bar copy pasted from https://stackoverflow.com/questions/31631354/how-to-display-data-values-on-chart-js
                        animation: { 
                            duration: 1,
                            onComplete: function () {
                                var chartInstance = this.chart,
                                    ctx = chartInstance.ctx;
                                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'bottom';
                    
                                this.data.datasets.forEach(function (dataset, i) {
                                    var meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        var data = dataset.data[index];                            
                                        ctx.fillText(data, bar._model.x, bar._model.y - 5);
                                    });
                                });
                            }
                        },
                        // sets max amount of ticks and sets max value if provided
                        scales :{
                            yAxes: [{
                                ticks : {
                                    max: this.props.maxYaxis,
                                    min: this.props.minYaxis,
                                    maxTicksLimit: this.state.maxTicksLimit,
                                },
                            }],
                        },
                    }}
                />
            </div>
        );
}}