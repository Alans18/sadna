import { Box, Spinner } from "@chakra-ui/react";
import { Chart, GoogleChartWrapperChartType } from "react-google-charts";


type PieChartProps = {
  type:GoogleChartWrapperChartType | undefined
  options:{
    title:string
  },
  data?:(string | number)[][] 
}

const Loader = function(){
  return <span>Loading...</span>
}

const PieChart = function(props:PieChartProps) {

  if(!props.data){
    return <Box width={"100%"} height={"400px"}>
      <Spinner/>
    </Box>
  }

  return  <Chart
  chartType={props.type}
  data={props.data}
  loader={<Loader/>}
  options={props.options}
  width={"100%"}
  height={"400px"}
/>
 
}

export default PieChart
