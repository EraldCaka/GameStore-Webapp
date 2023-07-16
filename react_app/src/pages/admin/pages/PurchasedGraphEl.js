import { Chart, CategoryScale, Title, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

Chart.register(CategoryScale);
function PurchasedGraphEl({ purchased, games }) {
  console.log(purchased);
  console.log(games[0]);
  const data = {
    labels: [games[0], games[1], games[2]],
    datasets: [
      {
        label: `${purchased[0] + purchased[1] + purchased[2]}`,
        data: [purchased[0], purchased[1], purchased[2]],
        backgroundColor: ["rgba(255,99,132,0.2)"],
        borderColor: ["rgba(255,99,132,1)"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return (
    <div
      style={{
        width: "1750px",
        height: "500px",
        marginLeft: "50px",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}

export default PurchasedGraphEl;
