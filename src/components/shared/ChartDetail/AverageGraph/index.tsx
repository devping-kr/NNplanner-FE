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
      position: 'bottom',
      fontSize: '14px',
      height: 30,
      horizontalAlign: 'center',
      fontFamily: 'Pretendard',

      formatter: (seriesName: string) => {
        // const value = opts.w.globals.series[opts.seriesIndex];
        return `${seriesName}`;
      },
    },
    labels: titleList,
    colors: ['#98DAC2', '#33B988', '#008D5A', '#005637'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 8,
          size: '15%',
          background: 'transparent',
          image: undefined,
          position: 'front',
        },
        track: {
          background: '#fff',
          strokeWidth: '100%',
          margin: 3,
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
          offsetX: -10,
          fontSize: '12px',
          fontWeight: 400,
          fontFamily: 'Pretendard',
          formatter: function (seriesName, opts) {
            return (
              seriesName +
              ' ' +
              Number(opts.w.globals.series[opts.seriesIndex]).toFixed(0)
            );
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  };

  return (
    <div id='chart' className='-mt-3 h-[250px] w-full'>
      <ApexCharts
        options={chartOptions}
        series={scoreValueList.map((item) => item * 10 || 0)}
        type='radialBar'
        height='100%'
        width='100%'
      />
    </div>
  );
};

export default AverageGraph;
