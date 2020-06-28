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
import FetchSelector from './FetchSelector.component';

function DataProcess({ data, region, fetchProps }) {
	const [ currentFilterTerm, currentFilterTermSet ] = useState('positive');

	const [ currentGraphType, currentGraphTypeSet ] = useState('scatter');
	const [ currentGraphResult, currentGraphResultSet ] = useState({});

	let possibleKeys = Object.keys(data[0]);
	let noGoKeys = [
		'positiveScore',
		'states',
		'date',
		'score',
		'negativeScore',
		'negativeRegularScore',
		'commercialScore'
	];
	let filteredKeys = possibleKeys.filter((key) => typeof data[0][key] === 'number' && !noGoKeys.includes(key));

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

	const namedTitles = {
		positive: 'Positive Cases',
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
		totalTestResultsIncrease: 'Increase in Total Test Results',
		positiveCasesViral: 'Positive Viral Cases',
		negativeCasesViral: 'Negative Viral Cases',
		totalTestsViral: 'Total Viral Tests'
	};

	return (
		<div>
			<Typography style={{ color: '#424242' }} variant="h3">
				{namedTitles[currentFilterTerm]}
			</Typography>
			<Typography style={{ color: '#424242' }} variant="h5">
				For {region}
			</Typography>
			<Grid alignItems='center' container direction="row" spacing={2} style={{ marginTop: '20px' }}>
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
					<Grid justify='space-between' container direction="column" spacing={3}>

						<Grid item>
						{/* <Paper variant="outlined" style={{padding: "10px"}}> */}
							<FetchSelector {...fetchProps} />
						{/* </Paper> */}
						</Grid>

						<Grid item>

						
						<Paper variant="outlined" style={{padding: "10px"}}>
						<Grid item>
							<Filter
								currentFilterTerm={currentFilterTerm}
								currentFilterTermSet={currentFilterTermSet}
								filteredKeys={filteredKeys}
							/>
						</Grid>
						<Grid item>
							
							<FormControl component="fieldset">
								<RadioGroup
									row
									style={{ color: '#424242' }}
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
							</Paper>
						</Grid>

						<Grid item>
							<Paper variant="outlined" style={{padding: "10px"}}>
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
