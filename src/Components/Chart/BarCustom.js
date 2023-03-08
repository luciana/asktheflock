import ReactEcharts from "echarts-for-react"; 
const BarCustom = ({ title, x, y, callOut  }) => {
    const option = {
        title: {
          text: '',       
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: 'category',
            data: x
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: title,
            type: 'bar',
            data: y,
            markPoint: {
              itemStyle: {
                color: 'rgba(70,78,86,.9)',
              },
              label: {
                normal: {
                formatter: function (param) {
                  return 'call out' ;
                },
                textStyle: {
                  color: '#000'
                },
                position: 'top'
                }
              },
              data: [             
                {
                  name: 'callOut',
                  coord: [callOut, 1],
                  value: 10
                },           
              ]
            }
          }
        ]
      };
    return (
        <>
        <ReactEcharts option={option} />
        </>
    )
}
export default BarCustom;