import React from 'react';
import {
    Card,
    CardContent,
    Typography
} from "@material-ui/core";
import "./Infobox.css";
function Infobox({title, cases,active,isRed,total, ...props}) {
    return (
       
        <Card className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--Red"}`} onClick={props.onClick}>
            <CardContent>
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                <h2 className={`infoBox_Cases ${!isRed && "infoBox--cases--green"}`}>
                    {cases}
                </h2>
                <Typography className="infoBox_total" color="textSecondary">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    );
}

export default Infobox
