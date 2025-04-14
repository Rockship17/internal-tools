import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const labels = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"]
const data = {
  labels,
  datasets: [
    {
      label: "Số người có mặt",
      data: [45, 47, 46, 48, 45, 43, 40],
      borderColor: "rgb(59, 130, 246)",
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      fill: true,
      tension: 0.4
    }
  ]
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  },
  scales: {
    y: {
      min: 0,
      max: 50,
      ticks: {
        stepSize: 10
      }
    }
  }
}

export function AttendanceChart() {
  return (
    <div className="h-[300px]">
      <Line data={data} options={options} />
    </div>
  )
} 