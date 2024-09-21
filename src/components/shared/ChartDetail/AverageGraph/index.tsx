import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  averageScores: {
    totalSatisfaction: number;
    portionSatisfaction: number;
    hygieneSatisfaction: number;
    tasteSatisfaction: number;
  };
}
const scoreTitleTranslations: { [key: string]: string } = {
  totalSatisfaction: '총점',
  portionSatisfaction: '양',
  hygieneSatisfaction: '위생',
  tasteSatisfaction: '맛',
};

const AverageGraph = ({ averageScores }: Props) => {
  const scoreValueList = Object.values(averageScores);
  const titleList = Object.values(scoreTitleTranslations);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
      toolbar: { show: false },
    },
    legend: {
      show: true,
      markers: {
        shape: 'circle',
      },
      position: 'bottom',
    },
    labels: titleList,
    colors: ['#FFF9B1', '#FFD1A9', '#C9F4C5', '#A7D8F0'],
    // states: {
    //   hover: {
    //     filter: {
    //       type: 'none',
    // },
    //   },
    // },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 7,
          size: '20%',
          background: 'transparent',
          image: undefined,
          position: 'front',
        },
        track: {
          background: '#fff',
          strokeWidth: '75%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
            fontWeight: 600,
            offsetY: -10,
          },
          value: {
            show: false,
            fontWeight: 600,
            fontSize: '12px',
            offsetY: -5,
            formatter: function (val) {
              return val + ' (100점 기준)';
            },
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: false,
          offsetX: -20,
          fontSize: '12px',
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  return (
    <div id='chart'>
      <ApexCharts
        options={chartOptions}
        series={scoreValueList.map((item) => {
          return item * 10;
        })}
        type='radialBar'
        height='330'
      />
    </div>
  );
};

export default AverageGraph;
