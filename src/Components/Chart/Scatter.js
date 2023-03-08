import ReactEcharts from "echarts-for-react"; 
const Scatter = ({ data }) => {
    const option = {
        xAxis: {},
        yAxis: {},
        series: [
          {
            symbolSize: 20,
            data: data,
            type: 'scatter'
          }
        ]
      };
    return (
        <>
        <ReactEcharts option={option} />
        </>
    )
}
export default Scatter;