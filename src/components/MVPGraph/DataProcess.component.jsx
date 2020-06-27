import React, { useState } from 'react';
import Regression from './Regression.component';
import Filter from './Filter.component';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GraphCard from './GraphCard.component';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function DataProcess({ data }) {
	const [ currentFilterTerm, currentFilterTermSet ] = useState('positive');

	const [ currentGraphType, currentGraphTypeSet ] = useState('scatter');
	const [ currentGraphResult, currentGraphResultSet ] = useState({});

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

	const handleChange = (e) => {
		currentGraphTypeSet(e.target.value);
	};

	console.log(currentGraphResult);

	return (
		<div>
			<Typography variant="h3">ENTER TITLE OF GRAPH HERE</Typography>
			<Grid container direction="row" spacing={2} style={{ marginTop: '20px' }}>
				<Grid item xs={8}>
					<Regression
						mappedData={mappedData}
						currentGraphResultSet={currentGraphResultSet}
						currentFilterTerm={currentFilterTerm}
						currentGraphType={currentGraphType}
						currentGraphTypeSet={currentGraphTypeSet}
					/>
				</Grid>
				<Grid item xs={4}>
					<Grid container direction="column" spacing={2}>
					<Grid item>
						<FormControl component="fieldset">
							<RadioGroup row aria-label="gender" name="gender1" value={currentGraphType} onChange={handleChange}>
								<FormControlLabel value={'scatter'} control={<Radio />} label="Scatter" />
								<FormControlLabel value={'line'} control={<Radio />} label="Line" />
								<FormControlLabel value={'bar'} control={<Radio />} label="Bar" />
							</RadioGroup>
						</FormControl>
						</Grid>
						<Grid item>
							<Filter
								currentFilterTerm={currentFilterTerm}
								currentFilterTermSet={currentFilterTermSet}
								filteredKeys={filteredKeys}
							/>
						</Grid>
						<Grid item>
							<GraphCard />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default DataProcess;
