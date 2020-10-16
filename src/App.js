import React, { useState, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent
} from "@material-ui/core";
import Infobox from './Infobox';
import Map from './Map';
import './App.css';
import Table from './Table';
import {sortData,prettyPrintStat} from './util';
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setcountries] = useState([]);/* HOOKS */
  const [country1, setcountry] = useState("WorldWide");/* HOOKS */
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat:34.80746, lng: - 40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] =useState("cases");

  useEffect(() =>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
      
    });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          /* console.log(countries) */
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setcountries(countries);
        });
    };
    getCountriesData();
    
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'WorldWide' ? 'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(countryCode)
      setcountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
  };
  
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h3>COVID-19 TRACKER</h3>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country1} onChange={onCountryChange}>
              <MenuItem value="WorldWide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stat">
          <Infobox 
            isRed 
            active={caseType==="cases"}  
            onClick={(e) => setCaseType("cases")} 
            title="Coronavirus Cases" 
            cases={prettyPrintStat(countryInfo.todayCases)} 
            total={prettyPrintStat(countryInfo.cases)}></Infobox>

          <Infobox 
            active={caseType==="recovered"} 
            onClick={(e) => setCaseType("recovered")} 
            title="Recovered" 
            cases={prettyPrintStat(countryInfo.todayRecovered)} 
            total={prettyPrintStat(countryInfo.recovered)}></Infobox>

          <Infobox 
            isRed 
            active={caseType==="deaths"} 
            onClick={(e) => setCaseType("deaths")} 
            title="Deaths" 
            cases={prettyPrintStat(countryInfo.todayDeaths)} 
            total={prettyPrintStat(countryInfo.deaths)}></Infobox>
        </div>

        {/* MAP */}
        
          <Map caseType ={caseType} countries={mapCountries} center ={mapCenter} zoom={mapZoom}
          ></Map>
        
      </div>

      
      <Card className="app_right">
        <CardContent>
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries ={tableData}></Table>
          {/* Graph */}
              <h3>Graph {caseType}</h3>
          <LineGraph caseType={caseType}></LineGraph>
        </CardContent>
      </Card>
           
      

    </div>
  );
}

export default App;
