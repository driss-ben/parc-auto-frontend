import React, {useEffect} from "react"

import ReactApexChart from "react-apexcharts"

const Chartapex = ({data}) => {

  let months = []
  let consommation = []
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    months.push(element.month)
    consommation.push(element.cost)
   
    
  }

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      months.push(element.month)
      consommation.push(element.cost)
      // setmonths([
      //   ...months,element.month
      // ])
      // setconsommation([
      //   ...consommation,element.cost
      // ])
      
    }
  
    return () => {
      
    }
  }, [])
  
  const series = [
    { name: "High - 2018", data: consommation },
  ]
  const options = {
    chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
    colors: ['#5b73e8', '#f1b44c'],
    dataLabels: {
      enabled: !1,
    },
    stroke: {
      width: [3, 3],
      curve: 'straight'
    },
    title: {
    //   text: 'Consommation',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.2
      },
      borderColor: '#f1f1f1'
    },
    markers: {
      style: 'inverted',
      size: 6
    },
    xaxis: {
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      categories: months,
      title: {
        text: 'Month'
      }
    },
    yaxis: {
      title: {
        text: 'Argent'
      },
      min: 5,
      max: Math.max(...consommation)
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5
    },
    responsive: [{
      breakpoint: 600,
      options: {
        chart: {
          toolbar: {
            show: false
          }
        },
        legend: {
          show: false
        },
      }
    }]
  }
  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height="280"
      className="apex-charts"
    />
  )
}

export default Chartapex
