import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};

export default StackedBarChart;
