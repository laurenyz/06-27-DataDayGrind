import React, { useState } from 'react';
import Regression from './Regression.component';
import Filter from './Filter.component';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GraphCard from './GraphCard.component'

function DataProcess({ data }) {
	const [ currentFilterTerm, currentFilterTermSet ] = useState('positive');
	const [ currentGraph, currentGraphSet ] = useState({})

	let possibleKeys = Object.keys(data[0]);
	let filteredKeys = possibleKeys.filter((key) => typeof data[0][key] === 'number' && key !== 'date');

	const mappedData = data
		.map((dataObj) => {
			let date = new Date(dataObj.dateChecked);
			function daysIntoYear(date) {
				return (
					(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) /
					24 /
					60 /
					60 /
					1000
				);
			}

			return [ daysIntoYear(date) + 1, dataObj[currentFilterTerm] ];
		})
		.filter((dataArr) => dataArr[1] != null && dataArr[1] !== 0); //Filters out points where data is null

	console.log('Mapped Data:', mappedData);
	return (
		<div>
			<Typography variant="h3">ENTER TITLE OF GRAPH HERE</Typography>
			<Grid container direction = "row" spacing={2} style={{marginTop:"20px"}}>
				<Grid item xs={8}>
					<Regression mappedData={mappedData} currentGraphSet={currentGraphSet}/>
				</Grid>
				<Grid item xs={4}>
					<Grid container direction="column" spacing = {2}>
						<Grid item>
							<Filter
								currentFilterTerm={currentFilterTerm}
								currentFilterTermSet={currentFilterTermSet}
								filteredKeys={filteredKeys}
							/>
						</Grid>
						<Grid item>
							<GraphCard/>
						</Grid>	
					</Grid>	
				</Grid>
			</Grid>
		</div>
	);
}

export default DataProcess;
