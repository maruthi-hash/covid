import React from "react";
import numeral from "numeral"
import { Circle, Popup } from "react-leaflet";

//dictionary
const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000
    },
}

export const sortData = (data) => {
    const sortedData = [...data];
    return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
    stat? `+${numeral(stat).format("0.0a")}`:"+0";

//Draw circles on the Map
export const showDataOnMap = (data, caseType = 'cases') =>
    data.map((country) => (
        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColors[caseType].hex}
            fillColor={casesTypeColors[caseType].hex}
            radius={Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier}>

            <Popup>
                <div className="pop_conatiner">
                    <div  className="pop_flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                    <div className="pop_name">{country.country}</div>
                    <div className="pop_cases">Cases :{numeral(country.cases).format("0.0")}</div>
                    <div className="pop_recovered">Recovered: {numeral(country.recovered).format("0.0")}</div>
                    <div className="pop_deaths">Deaths:{numeral(country.deaths).format("0.0")}</div>
                </div>

            </Popup>
        </Circle>
    ));


