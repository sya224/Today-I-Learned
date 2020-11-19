import React from "react";
import { connect } from "react-redux";
import { fetchStatisticsData } from "../../actions";

import LineChart from 'react-highcharts';
import Highcharts from 'highcharts';

import moment from "moment";

Highcharts.setOptions({
  lang: {
    shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  }
});

class CardCountChartWeek extends React.Component{
  date_to_str(format, separator){
    let year = format.getFullYear();
    let month = format.getMonth() + 1;
    let date = format.getDate();

    return year + separator + ("0" + month).slice(-2) + separator + ("0" + date).slice(-2);
  }
  setChart(){
    if(this.props.info && this.date_to_str(new Date(moment(this.props.info.date.startDate).add(6, 'days')), "-") === this.date_to_str(new Date(moment(this.props.info.date.endDate)), "-")){
      const info = this.props.info

      const startDate = this.date_to_str(new Date(info.date.startDate), "-").split('-');
      const endDate = this.date_to_str(new Date(info.date.endDate), "-").split('-');

      const dates = info.data.dates;
      const dailyTask = info.data.dailyTask;

      const year = startDate[0];
      const month = startDate[1];
      const day = startDate[2];
      
      const overviewSeries = []
      
      let days = new Array(7)
      for(let i=0; i<days.length; i++){
        let time = Math.floor(new Date(Number(year), Number(month) - 1, i + Number(day) + 1).getTime() / 86400000) * 86400000
        days[i] = [time, 0];
      }
      
      for(let i=0; i<dates.length; i++){
        let date = dates[i].split('-')
        if(Number(date[2]) >= day){
          days[Number(date[2]) - day][1] = dailyTask[i];
        }
        else{
          days[Number(date[2])][1] = dailyTask[i];
        }
      }
      
      for(let i=0; i<days.length; i++){
        overviewSeries.push({
          x: days[i][0],
          y: days[i][1]
        })
      }
      
      const config = {
        chart:{
          type: 'line'
        },
        title: {
          text: this.date_to_str(new Date(Number(startDate[0]), Number(startDate[1]) - 1, Number(startDate[2])), ".") + " ~ " + this.date_to_str(new Date(Number(endDate[0]), Number(endDate[1]) - 1, Number(endDate[2])), ".")
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats:{
            day: '%e'
          },
          tickInterval: 24 * 3600 * 1000
        },
        yAxis: {
          allowDecimals: false,
          title: {
              text: '태스크 수'
          }
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          series: {
            name: '태스크 수',
              dataLabels: {
                  enabled:false
              },
              shadow: false
          },
          line:{
            size:'10%'
          }
        },
        series: [{
            name: '태스크 수',
            //colorByPoint: true,
            data: overviewSeries
        }],
        tooltip: {
          formatter: function(){
            let weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            let date = new Date(this.x);
            return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
              + "<span style='font-size: 10px'>" + date.getDate() + "일, " + weekdays[date.getDay()] + "</span><br/>"
              + "<span style='fill:#7cb5ec'>● </span><span>" + this.series.userOptions.name + ": </span>"
              + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
          }
        }
      };

      return <LineChart config={config}></LineChart>
    }
  }
	render() {
    return (
      <div>{this.setChart()}</div>
    );
	}
}

const mapStatetoProps = state => {
  return {
    info: state.statistics.info
  };
};

export default connect(mapStatetoProps, { fetchStatisticsData })(CardCountChartWeek);