
import ReactEcharts from "echarts-for-react"; 
const Bar = ({ x, y }) => {
    const option = {
        xAxis: {
        type: 'category',
        data: x,
        },
        yAxis: {
        type: 'value'
        },
        series: [
        {
            data: y,
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
        }
        ]
    };
    return (
        <>
        <ReactEcharts option={option} />
        </>
    )
}
export default Bar;