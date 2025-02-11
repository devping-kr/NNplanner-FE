import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ApexOptions } from 'apexcharts';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SatisfactionDistribution {
  data: {
    [key: string]: number;
  };
}

const BarGraph = ({ data }: SatisfactionDistribution) => {
  const totalVotes = Object.values(data).reduce((acc, cur) => acc + cur, 0);

  const valuesArray = Object.values(data).map((score) =>
    Math.floor((score / totalVotes) * 100),
  );

  const yMin = 0;
  const yMax = Math.ceil(Math.max(...valuesArray) / 10) * 10;
  const adjustedYMax = yMax < 100 ? yMax + 10 : 100;

  const [chartOptions] = useState<ApexOptions>({
    chart: {
      type: 'bar',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, dataPointIndex, w }) => {
        return `<div class='tooltip_container'>
            <span class='tooltip_label'>${w.globals.labels[dataPointIndex]}</span>
            <Body3Black class='tooltip_data'>${series[seriesIndex][dataPointIndex]}%</Body3Black>
          </div>`;
      },
    },
    xaxis: {
      categories: [
        '1점',
        '2점',
        '3점',
        '4점',
        '5점',
        '6점',
        '7점',
        '8점',
        '9점',
        '10점',
      ],
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      title: {},
    },
    yaxis: {
      min: yMin,
      max: adjustedYMax,
      labels: {
        formatter: (value) => `${value}%`,
        style: {
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      title: {},
    },
    colors: ['#00A86B'],
    plotOptions: {
      bar: {
        borderRadiusApplication: 'end',
        borderRadius: 4,
        distributed: true,
        horizontal: false,
        columnWidth: '24px',
      },
    },
    dataLabels: {
      enabled: false,
    },
  });

  return (
    <div id='chart'>
      <ApexCharts
        options={chartOptions}
        series={[{ data: valuesArray, name: '해당 점수 비율' }]}
        type='bar'
        height={325}
        width='100%'
      />
    </div>
  );
};

export default BarGraph;
