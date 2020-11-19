import React from "react";
import { connect } from "react-redux";
import { fetchStatisticsData } from "../../actions";

import LineChart from 'react-highcharts';
import Highcharts from 'highcharts';
import Drilldown from 'highcharts-drilldown';
Drilldown(Highcharts);


Highcharts.setOptions({
  lang: {
      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      shortMonths: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      drillUpText: '◁ '
  }
});


class CardCountChartSelect extends React.Component{
  date_to_str(format, separator){
    let year = format.getFullYear();
    let month = format.getMonth() + 1;
    let date = format.getDate();

    return year + separator + ("0" + month).slice(-2) + separator + ("0" + date).slice(-2);
  }
  setChart(){
    if(this.props.info){
      const info = this.props.info;

      const overviewSeries = [];
      const drillDownSeries = [];
      var xAxisNumber = 0;
      var idStr = null;

      const startDate = this.date_to_str(new Date(info.date.startDate), "-").split('-');
      const endDate = this.date_to_str(new Date(info.date.endDate), "-").split('-');
      const dates = info.data.dates;
      const dailyTask = info.data.dailyTask;

      // 년도가 다를 경우
      if(Number(endDate[0]) - Number(startDate[0]) > 0){
        let year = new Array(Number(endDate[0]) - Number(startDate[0]) + 1)
        for(let i=0; i<year.length; i++){
          year[i] = i + Number(startDate[0]);
        }

        let monthDrill = new Array(year.length);

        for(let i=0; i<year.length; i++){
          let startMonths = 0;
          let endMonths = 12;
          if(i === 0) {
            startMonths = Number(startDate[1]) - 1;
          }
          else if(i === year.length - 1) {
            endMonths = Number(endDate[1]);
          } 

          monthDrill[i] = new Array(12);

          for(let j=startMonths; j<endMonths; j++){
            let startDays = 0;
            let endDays = 32 - new Date(Number(year[i]), j, 32).getDate();
            if(i === 0 && j === Number(startDate[1]) - 1) {
              startDays = Number(startDate[2]) - 1;
            }
            else if(i === year.length - 1 && j === Number(endDate[1]) - 1){
              endDays = Number(endDate[2]);
            }
            monthDrill[i][j] = new Array(endDays);
            for(let k=0; k<startDays; k++){
              let time = Math.floor(new Date(Number(year[i]), j, k+2).getTime() / 86400000) * 86400000
              monthDrill[i][j][k] = [time, null];
            }
            for(let k=startDays; k<endDays; k++){
              let time = Math.floor(new Date(Number(year[i]), j, k+2).getTime() / 86400000) * 86400000
              monthDrill[i][j][k] = [time, 0];
            }
          }
        }

        let firstYear = year[0];

        for(let i=0; i<dates.length; i++){
          let date = dates[i].split('-');
          monthDrill[Number(date[0]) - firstYear][Number(date[1]) - 1][Number(date[2]) - 1][1] = dailyTask[i];
        }

        for(let i=0; i<year.length; i++){
          let yearTask = 0;
          let data = {
            id: 'year' + year[i],
            data: [],
            xAxis: 2
          }

          for(let j=0; j<12; j++){
            let monthTask = 0;
            if(monthDrill[i][j] != null){
              for(let k=0; k<monthDrill[i][j].length; k++){
                if(monthDrill[i][j][k] != null) {
                  monthTask += monthDrill[i][j][k][1];  
                }
              }
              yearTask += monthTask;

              if(monthTask > 0){
                data['data'].push({
                  x: monthDrill[i][j][0][0],
                  y: monthTask,
                  drilldown: 'month' + year[i] + '' + (j + 1)
                })

                drillDownSeries.push({
                  id: 'month' + year[i] + '' + (j + 1),
                  data: monthDrill[i][j],
                  xAxis: 3
                })
              }
              else{
                data['data'].push({
                  x: monthDrill[i][j][0][0],
                  y: monthTask
                })
              }
            }
          }

          if(yearTask > 0){
            drillDownSeries.push(data);
            overviewSeries.push({
              x: Math.floor(new Date(Number(year[i]) * 1, 0, 2).getTime() / 86400000) * 86400000,
              y: yearTask,
              drilldown: 'year' + year[i]
            })
          }
          else{
            overviewSeries.push({
              x: Math.floor(new Date(Number(year[i]) * 1, 0, 2).getTime() / 86400000) * 86400000,
              y: yearTask
            })
          }
        }
      }
      // 년도가 같지만 월이 다를 경우
      else if(startDate[1] !== endDate[1]){
        idStr = 'y_m' + Number(startDate[0]);
        xAxisNumber = 2;

        let startMonths = Number(startDate[1]) - 1;
        let endMonths = Number(endDate[1]);

        let monthDrill = new Array(12);

        for(let i=startMonths; i<endMonths; i++){
          let startDays = 0;
          let endDays = 32 - new Date(Number(startDate[0]), i, 32).getDate();

          if(i === startMonths){
            startDays = Number(startDate[2]) - 1;
          }
          else if(i === endMonths - 1){
            endDays = Number(endDate[2]);
          }

          monthDrill[i] = new Array(endDays);

          for(let j=0; j<startDays; j++){
            let time = Math.floor(new Date(Number(startDate[0]), i, j+2).getTime() / 86400000) * 86400000
            monthDrill[i][j] = [time, null];
          }
          for(let j=startDays; j<endDays; j++){
            let time = Math.floor(new Date(Number(startDate[0]), i, j+2).getTime() / 86400000) * 86400000
            monthDrill[i][j] = [time, 0];
          }
        }

        for(let i=0; i<dates.length; i++){
          let date = dates[i].split('-');
          monthDrill[Number(date[1]) - 1][Number(date[2]) - 1][1] = dailyTask[i];
        }

        for(let i=0; i<12; i++){
          if(monthDrill[i] != null){
            let monthTask = 0;

            for(let j=0; j<monthDrill[i].length; j++){
              monthTask += monthDrill[i][j][1];  
            }

            if(monthTask > 0){
              overviewSeries.push({
                x: monthDrill[i][0][0],
                y: monthTask,
                drilldown: 'month' + Number(startDate[0]) + '' + (i + 1)
              })
        
              drillDownSeries.push({
                id: 'month' + Number(startDate[0]) + '' + (i + 1),
                data: monthDrill[i],
                xAxis: 3
              })
            }
            else{
              overviewSeries.push({
                x: monthDrill[i][0][0],
                y: monthTask
              })
            }
          }
        }
      }
      else{
        xAxisNumber = 3;

        let days = new Array(Number(endDate[2]) - Number(startDate[2]) + 1)
        let day = Number(startDate[2]);

        for(let i=0; i<days.length; i++){
          let time = Math.floor(new Date(Number(startDate[0]), Number(startDate[1]) - 1, i + Number(startDate[2]) + 1).getTime() / 86400000) * 86400000
          days[i] = [time, 0];
        }

        for(let i=0; i<dates.length; i++){
          let date = dates[i].split('-')
          days[Number(date[2]) - day][1] = dailyTask[i];
        }

        for(let i=0; i<days.length; i++){
          overviewSeries.push({
            x: days[i][0],
            y: days[i][1],
          })
        }
      }

      const config = {
        chart:{
          type: 'line',
          events: {
            drilldown: function(e) {
              if(e.seriesOptions.id.substr(0, 4) === "year"){
                this.setTitle({ text: e.seriesOptions.id.substr(4) + "년" });
              }
              else {
                this.setTitle({ text: e.seriesOptions.id.substr(5, 4) + "년 " + e.seriesOptions.id.substr(9) + "월"});
              }
            },
            drillup: function(e) {
              if(e.seriesOptions.id == null || e.seriesOptions.id.substr(0, 3) === "y_m"){
                this.setTitle({ text: startDate[0] + "." + ("0" + Number(startDate[1])).slice(-2) + "." +  ("0" + Number(startDate[2])).slice(-2) + " ~ " + endDate[0] + "." + ("0" + Number(endDate[1])).slice(-2) + "." +  ("0" + Number(endDate[2])).slice(-2) })
              }
              else {
                this.setTitle({ text: e.seriesOptions.id.substr(4) + "년" });
              }
            }
          }
        },
        title: {
            text: this.date_to_str(new Date(Number(startDate[0]), Number(startDate[1]) - 1, Number(startDate[2])), ".") + " ~ " + this.date_to_str(new Date(Number(endDate[0]), Number(endDate[1]) - 1, Number(endDate[2])), ".")
        },
        xAxis: [
          {
            id: 1,
            type: 'datetime',
            dateTimeLabelFormats:{
              day: '%b %e, %Y'
            }
          },
          {
            id: 3,
            type: 'datetime',
            labels: 
            {
              format: '{value:%e}'
            },
            tickInterval: 24 * 3600 * 1000
          },
          {
            id: 2,
            type: 'datetime',
            labels: 
            {
              format: '{value:%b}'
            }
          },
        ],
        yAxis: {
          allowDecimals: false,
          title: {
              text: '태스크 수'
          }
        },
        drilldown: {
          series: drillDownSeries
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
            xAxis: xAxisNumber,
            data: overviewSeries,
            id: idStr
        }],
        tooltip: {
          headerFormat: '',
          pointFormatter: function(){
            let weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
            let date = new Date(this.x);
            if(this.series.userOptions.id == null){
              if(this.hasOwnProperty("drilldown")){
                return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
                  + "<span style='font-size: 10px'>" + date.getFullYear() + "년<br/>"
                  + "<span style='fill:#7cb5ec'>● </span><span>태스크 수: </span>"
                  + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
              }
              else{
                return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
                  + "<span style='font-size: 10px'>" + date.getDate() + "일, " + weekdays[date.getDay()] + "</span><br/>"
                  + "<span style='fill:#7cb5ec'>● </span><span>태스크 수: </span>"
                  + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
              }
            }
            else{
              if(this.series.userOptions.id.substr(0, 4) === "year" || this.series.userOptions.id.substr(0, 3) === "y_m"){
                return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
                  + "<span style='font-size: 10px'>" + date.getFullYear() + "년 " + (date.getMonth() + 1) + "월</span><br/>"
                  + "<span style='fill:#7cb5ec'>● </span><span>태스크 수: </span>"
                  + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
              }
              else{
                return "<text data-z-index='1' style='font-size:12px;color:#333333;cursor:default;fill:#333333;'>"
                  + "<span style='font-size: 10px'>" + date.getDate() + "일, " + weekdays[date.getDay()] + "</span><br/>"
                  + "<span style='fill:#7cb5ec'>● </span><span>태스크 수: </span>"
                  + "<span style='font-weight:bold; color:black;'>" + this.y + "</span></text>"
              }
            }
          },
        }
      };
      return(
        <LineChart config={config}></LineChart>
      )
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

export default connect(mapStatetoProps, { fetchStatisticsData })(CardCountChartSelect);