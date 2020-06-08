import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import Theme from "highcharts/themes/high-contrast-dark";
import HighchartsReact from "highcharts-react-official";
import WorldMap from "./WorldMap";
import moment from "moment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { cloneDeep } from "lodash";

Theme(Highcharts);

const length = 75;
const covidData = [
  {
    country: "Eritrea",
    series: [
      {
        name: "Total",
        data: new Array(length).fill(null).map((val, index) => index * 14)
      },
      {
        name: "Recoveries",
        data: new Array(length).fill(null).map((val, index) => index * 9)
      },
      {
        name: "Active",
        data: new Array(length).fill(null).map((val, index) => index * 3)
      },
      {
        name: "Deaths",
        data: new Array(length).fill(null).map((val, index) => index)
      }
    ]
  },
  {
    country: "Romania",
    series: [
      {
        name: "Total",
        data: new Array(length).fill(null).map((val, index) => index * 25)
      },
      {
        name: "Recoveries",
        data: new Array(length).fill(null).map((val, index) => index * 21)
      },
      {
        name: "Active",
        data: new Array(length).fill(null).map((val, index) => index * 3)
      },
      {
        name: "Deaths",
        data: new Array(length).fill(null).map((val, index) => index)
      }
    ]
  }
];
const countries = covidData.map(data => data.country);
console.log(countries);

function Charts() {
  const [country, setCountry] = useState(covidData[0].country);
  const [enableDataLabels, setEnableDataLabels] = useState(true);
  const [seriesData, setSeriesData] = useState();
  const [options, setOptions] = useState({
    chart: {
      type: "line"
    },
    title: {
      text: "Outbreak statistics"
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      x: 150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF"
    },
    xAxis: {
      categories: new Array(length).fill(null).map((val, index) =>
        moment("20200301", "YYYYMMDD")
          .add(index, "days")
          .format("DD/MM/YYYY")
      )
    },
    yAxis: {
      title: {
        text: "No."
      }
    },
    tooltip: {
      shared: true,
      valueSuffix: " people"
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: enableDataLabels
        }
      }
    },
    series: []
  });

  useEffect(() => {
    const newSeriesData = covidData.find(data => data.country === country).series;
    setSeriesData(newSeriesData);

    if (newSeriesData) {
      // console.log(newSeriesData);
      // console.log(new Array(...newSeriesData));
    }
  }, [country]);

  useEffect(() => {
    setOptions({
      ...options,
      plotOptions: {
        line: {
          dataLabels: {
            enabled: enableDataLabels
          }
        }
      }
    });
  }, [enableDataLabels]);

  useEffect(() => {
    setOptions({ ...options, series: cloneDeep(seriesData) });
    //  [Improvement] we use cloneDeep here because HighchartsReact screws our `covidData`'s arrays' values. This
    // might have something to do with the chart's animation, because it no longer plays after using cloneDeep.
  }, [seriesData]);

  return (
    <div>
      <WorldMap />

      <br />
      <InputLabel id="demo-simple-select-label">Country</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={country}
        onChange={e => setCountry(e.target.value)}
      >
        {countries.map(country => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
      <br />
      <br />

      <HighchartsReact highcharts={Highcharts} options={options} />

      <FormControlLabel
        control={
          <Checkbox
            checked={enableDataLabels}
            onChange={() => setEnableDataLabels(!enableDataLabels)}
            color="default"
          />
        }
        label="Value Labels"
      />
    </div>
  );
}

export default Charts;
