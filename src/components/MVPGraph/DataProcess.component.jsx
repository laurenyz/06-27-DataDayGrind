import React, { useState } from 'react';
import Regression from './Regression.component';
import Filter from './Filter.component';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import GraphCard from './GraphCard.component';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

function DataProcess({ data }) {
	const [ currentFilterTerm, currentFilterTermSet ] = useState('positive');

	const [ currentGraphType, currentGraphTypeSet ] = useState('scatter');
	const [ currentGraphResult, currentGraphResultSet ] = useState({});

	let possibleKeys = Object.keys(data[0]);
	let filteredKeys = possibleKeys.filter(
		(key) => typeof data[0][key] === 'number' && key !== 'date' && key !== 'states'
	);

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
	console.log(filteredKeys);
	const namedTitles = {
		positive: 'Confirmed Cumulative Positive Cases',
		negative: 'Negative Cases',
		pending: 'Pending Cases',
		hospitalizedCurrently: 'Currently Hospitalized Cases',
		hospitalizedCumulative: 'Cumulative Hospitalized Cases',
		inIcuCurrently: 'Currently in ICU',
		inIcuCumulative: 'Cumulative Cases in ICU ',
		onVentilatorCurrently: 'Cases Currently on Ventilator',
		onVentilatorCumulative: 'Cummulative Cases on Ventilator',
		recovered: 'Recovered Cases',
		death: 'Total Deaths',
		hospitalized: 'Total Hospitalized',
		total: 'Total Cases',
		totalTestResults: 'Total Test Results',
		posNeg: 'Combined Total of Positive and Negative Cases',
		deathIncrease: 'Increase in Death Rate',
		hospitalizedIncrease: 'Increase in Hospitalization',
		negativeIncrease: 'Increase in Negative Cases',
		positiveIncrease: 'Increase in Positive Cases',
		totalTestResultsIncrease: 'Increase in Total Test Results'
	};

	return (
		<div>
			<Typography style={{color: "#424242"}} variant="h3">{namedTitles[currentFilterTerm]}</Typography>
			<Typography style={{color: "#424242"}} variant="h5">For the United States</Typography>
			<Grid container direction="row" spacing={2} style={{ marginTop: '20px' }}>
				<Grid item xs={8}>
					<Paper variant="outlined">
						<Regression
							mappedData={mappedData}
							currentGraphResultSet={currentGraphResultSet}
							currentFilterTerm={currentFilterTerm}
							currentGraphType={currentGraphType}
							currentGraphTypeSet={currentGraphTypeSet}
						/>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Grid container direction="column" spacing={2}>
						<Grid item>
							<FormControl component="fieldset">
								<RadioGroup
									row
									style={{color: "#424242"}}
									aria-label="gender"
									name="gender1"
									value={currentGraphType}
									onChange={handleChange}
								>
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
							<Paper variant="outlined">
								<GraphCard graphResult={currentGraphResult} />
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default DataProcess;
