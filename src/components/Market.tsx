import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  //ChartData,
} from "chart.js";
import Combobox from "./Combobox.tsx";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
);

const BASE_URL = "https://api.coingecko.com/api/v3";
async function getBitcoinPriceHistory(
  days: number,
): Promise<{ timestamp: Date; price: number }[] | null> {
  const response = await fetch(
    `${BASE_URL}/coins/bitcoin/market_chart?vs_currency=usd&days=${days}`,
  );
  if (!response.ok) return null;

  const data = await response.json();
  const prices = data.prices;

  return prices.map((price: [number, number]) => ({
    timestamp: new Date(price[0]), // Convert the timestamp to a Date object
    price: price[1],
  }));
}

const options: ChartOptions<"line"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.dataset.label}: ${context.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: "Months",
      },
    },
    y: {
      title: {
        display: false,
        text: "Values",
      },
    },
  },
};

function Market() {
  const [marketData, setMarketData] = useState<
    { timestamp: Date; price: number }[] | null
  >(null);

  useEffect(() => {
    getBitcoinPriceHistory(1).then((resp) => {
      if (resp) setMarketData(resp);
    });
  }, []);

  const data = {
    labels: marketData?.map((d) => d.timestamp.toLocaleString()), // Use local time string for x-axis labels
    datasets: [
      {
        label: "Bitcoin Price (USD)",
        data: marketData?.map((d) => d.price),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div>
            <div>
              <Combobox data={["test"]} defaultValue={"test"} />
              <Line data={data} options={options} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Market;
