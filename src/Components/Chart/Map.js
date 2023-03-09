
import ReactEcharts from "echarts-for-react"; 
import * as echarts from "echarts";
import geoJson from './../../Constants/MapData/USMapData.json';

const Map = ({ data }) => {   
    echarts.registerMap('USA', geoJson, {
        Alaska: {     
          left: -149,
          top: 49,
          width: 23
        },
        Hawaii: {
          left: -141,
          top: 28,
          width: 5
        },
        'Puerto Rico': {     
          left: -76,
          top: 20,
          width: 2
        }
      });

      const option = {                          
          visualMap: {
            left: 'right',           
          },                    
        series: [
          {
            name: 'USA',
            type: 'map',
            roam: true,
            map: 'USA',
            emphasis: {
            label: {
                show: true
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
export default Map;