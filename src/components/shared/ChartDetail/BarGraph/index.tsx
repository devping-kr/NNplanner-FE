import dynamic from 'next/dynamic';
import { useState } from 'react';
import { ApexOptions } from 'apexcharts';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

interface SatisfactionDistribution {
  data: {
    '1점': number;
    '2점': number;
    '3점': number;
    '4점': number;
    '5점': number;
    '6점': number;
    '7점': number;
    '8점': number;
    '9점': number;
    '10점': number;
  };
}

const BarGraph = ({ data }: SatisfactionDistribution) => {
  const valuesArray = Object.values(data);
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
        series={[{ data: valuesArray, name: '해당 점수 답변수' }]}
        type='bar'
        height='300'
      />
    </div>
  );
};

export default BarGraph;
