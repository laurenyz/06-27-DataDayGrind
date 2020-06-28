import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Select } from '@material-ui/core';
import './App.css';
import Board from './components/MVPGraph/Board.component';
import Navbar from './components/MVPGraph/Navbar.component';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: '100vh' /* will cover the 100% of viewport */,
		overflow: 'hidden',
		display: 'block',
		position: 'relative',
		paddingBottom: '100px',
		backgroundColor: '#e0e0e0'
	},
	main: {
		marginTop: '20px',
		paddingLeft: '20px',
		paddingRight: '20px',
		paddingTop: '20px',
		textAlign: 'center'
	}
}));

function App() {
	const classes = useStyles();
	const states = [
		'AL',
		'AK',

		'AZ',
		'AR',
		'CA',
		'CO',
		'CT',
		'DE',
		'DC',

		'FL',
		'GA',

		'HI',
		'ID',
		'IL',
		'IN',
		'IA',
		'KS',
		'KY',
		'LA',
		'ME',

		'MD',
		'MA',
		'MI',
		'MN',
		'MS',
		'MO',
		'MT',
		'NE',
		'NV',
		'NH',
		'NJ',
		'NM',
		'NY',
		'NC',
		'ND',
		'MP',
		'OH',
		'OK',
		'OR',

		'PA',
		'PR',
		'RI',
		'SC',
		'SD',
		'TN',
		'TX',
		'UT',
		'VT',
		'VI',
		'VA',
		'WA',
		'WV',
		'WI',
		'WY'
	];
	const stateTitle = {};
	const [ selectedState, selectedStateSet ] = useState('');
	const [ stateView, stateViewSet ] = useState(false);
	let url = 'https://covidtracking.com/api/v1/us/daily.json';

	const handleCountryClick = () => {
		stateViewSet(false);
		selectedStateSet('');
	};

	const handleChange = (e) => {
		selectedStateSet(e.target.value);
		stateViewSet(true);
	};

	return (
		<div className={classes.root}>
			<Navbar />
			<div>
				<Button variant="contained" onClick={handleCountryClick}>
					USA
				</Button>
				<Select style={{ marginBottom: '20x' }} native value={selectedState} onChange={handleChange}>
					<option value={''}>STATES</option>
					{states.map((state, index) => {
						return (
							<option value={state} key={index}>
								{state}
							</option>
						);
					})}
				</Select>
			</div>
			<Container className={classes.main}>
				{stateView ? (
					<Board
						url={`https://covidtracking.com/api/v1/states/${selectedState.toLowerCase()}/daily.json`}
						region={selectedState}
					/>
				) : (
					<Board url={url} region="United States" />
				)}
			</Container>
		</div>
	);
}

export default App;
