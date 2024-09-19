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
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: '월별 총 만족도 점수 분포도 (1-10)',
      align: 'center',
    },
  });

  return (
    <div id='chart'>
      <ApexCharts
        options={chartOptions}
        series={[{ data: valuesArray, name: '월별 만족도 점수' }]}
        type='bar'
        height='400'
      />
    </div>
  );
};

export default BarGraph;
