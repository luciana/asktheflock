import ReactEcharts from "echarts-for-react"; 

const Nightingale = ({ data }) => {
    const option = {
      legend: {
        top: 'top'
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Winner',
          type: 'pie',
          radius: [50, 250],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
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