import ReactEcharts from "echarts-for-react"; 

const Nightingale = ({ data }) => {
  console.log("Nightingale data", data);
    const option = {
      legend: {
        top: 'top'
      },      
      series: [
        {
          name: 'Winner',
          type: 'pie',
          radius: [30, 1500],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 12
          },
          data: data,
          label: {
            show: true,
            position: 'inner',
            formatter: '{c} \n{br|}\n {per|{d}%}  ',
            rich: {
              b: {
                color: '#4C5058',
                fontSize: 14,
                fontWeight: 'bold',
                lineHeight: 33
              },
              per: {
                color: '#fff',
                backgroundColor: '#4C5058',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
        }
      ]
    };
  
    return (
        <>
        <ReactEcharts option={option} />
        </>
    )
};

export default Nightingale;