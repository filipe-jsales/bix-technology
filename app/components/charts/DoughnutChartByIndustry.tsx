import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Title, Tooltip, Legend);

const DoughnutChartByIndustry = ({ data, options }) => {
  return <Doughnut data={data} options={options} />;
};

export default DoughnutChartByIndustry;
