import { Chart, GoogleChartWrapperChartType } from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};

type PieChartProps = {
  type:GoogleChartWrapperChartType | undefined
  options:{
    title:string
  },
  data:(string | number)[][]
}

const PieChart = function(props:PieChartProps) {
  return  <Chart
  chartType={props.type}
  data={props.data}
  options={props.options}
  width={"100%"}
  height={"400px"}
/>
 
}

export default PieChart
