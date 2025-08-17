import { ChartDataType } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AllProductsSaleChart({
  chartData,
}: {
  chartData: ChartDataType;
}) {

  const myMap = new Map();

  console.log("chartdata :::: ", chartData);

  chartData?.forEach(({date, quantity}) => {
    if(!myMap.has(date)) {
      myMap.set(date, {date, quantity : 0})
    }
    myMap.get(date).quantity += quantity;
  })

  const mergeredChartData = Array.from(myMap.values());

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={mergeredChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
