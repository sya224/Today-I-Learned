import React from "react";
import { connect } from "react-redux";
import { fetchStatisticsData } from "../../actions";

import PieChart from 'react-highcharts';

class TagFrequencyChart extends React.Component{
  setChart(){
    if(this.props.info){
      var tag_data = this.props.info.tag_data;
      var data = [];

      for(let i=0; i<tag_data.length; i++){
        data.push({
          name: tag_data[i].tag_name,
          y: tag_data[i].tag_id
        })
      }

      const config = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Tag Frequency'
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true,
            slicedOffset: 0,
            point: {
              events: {
                legendItemClick: function () {
                  return false;
                }
              }
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          data: data
        }],
        credits: {
          enabled: false
        }
      }

      return <PieChart config={config}></PieChart>
    }
  }
  render(){
    return(
      <div>{this.setChart()}</div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    info : state.statistics.info
  };
};

export default connect(mapStatetoProps, { fetchStatisticsData })(TagFrequencyChart);