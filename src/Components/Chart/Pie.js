import ReactEcharts from "echarts-for-react"; 


const Pie = ({ data }) => {
    const option = {
        legend: {
         top: '5%',
         left: 'center'
       },
       series: [
         {
           name: 'Flocks Gender Pie',
           type: 'pie',
           radius: ['40%', '70%'],
           avoidLabelOverlap: false,
           itemStyle: {
             borderRadius: 8,
             borderColor: '#fff',
             borderWidth: 2
           },
           emphasis: {
             label: {
               show: true,
               fontSize: 20,
               fontWeight: 'bold'
             }
           },
           labelLine: {
             show: false
           },
          
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
           data: data
         }
       ]
     };

    return (
        <>
        <ReactEcharts option={option} />
        </>
    )
}

export default Pie;