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
    legend: {
      markers: {
        shape: 'circle',
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
      title: {},
    },
    yaxis: {
      min: yMin,
      max: adjustedYMax,
      labels: {
        formatter: (value) => `${value}%`,
      },
      title: {},
    },
    colors: [
      '#D0F0C0',
      '#B2F2BB',
      '#AEE1D8',
      '#CDE7BE',
      '#B2DFDB',
      '#C1DAB3',
      '#ACE1AF',
      '#A8E4A0',
      '#B3CC9F',
      '#77DD77',
    ],
    plotOptions: {
      bar: {
        borderRadiusApplication: 'end',
        borderRadius: 6,
        distributed: true,
        horizontal: false,
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
