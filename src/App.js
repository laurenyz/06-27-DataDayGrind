import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

	const stateTitle = {
		AL: 'Alabama',
		AK: 'Alaska',
		AS: 'American Samoa',
		AZ: 'Arizona',
		AR: 'Arkansas',
		CA: 'California',
		CO: 'Colorado',
		CT: 'Connecticut',
		DE: 'Delaware',
		DC: 'District Of Columbia',
		FM: 'Federated States Of Micronesia',
		FL: 'Florida',
		GA: 'Georgia',
		GU: 'Guam',
		HI: 'Hawaii',
		ID: 'Idaho',
		IL: 'Illinois',
		IN: 'Indiana',
		IA: 'Iowa',
		KS: 'Kansas',
		KY: 'Kentucky',
		LA: 'Louisiana',
		ME: 'Maine',
		MH: 'Marshall Islands',
		MD: 'Maryland',
		MA: 'Massachusetts',
		MI: 'Michigan',
		MN: 'Minnesota',
		MS: 'Mississippi',
		MO: 'Missouri',
		MT: 'Montana',
		NE: 'Nebraska',
		NV: 'Nevada',
		NH: 'New Hampshire',
		NJ: 'New Jersey',
		NM: 'New Mexico',
		NY: 'New York',
		NC: 'North Carolina',
		ND: 'North Dakota',
		MP: 'Northern Mariana Islands',
		OH: 'Ohio',
		OK: 'Oklahoma',
		OR: 'Oregon',
		PW: 'Palau',
		PA: 'Pennsylvania',
		PR: 'Puerto Rico',
		RI: 'Rhode Island',
		SC: 'South Carolina',
		SD: 'South Dakota',
		TN: 'Tennessee',
		TX: 'Texas',
		UT: 'Utah',
		VT: 'Vermont',
		VI: 'Virgin Islands',
		VA: 'Virginia',
		WA: 'Washington',
		WV: 'West Virginia',
		WI: 'Wisconsin',
		WY: 'Wyoming'
	};
	const [ selectedState, selectedStateSet ] = useState('');
	const [ stateView, stateViewSet ] = useState(false);
	let url = 'https://api.covidtracking.com/v1/us/daily.json';

	const handleCountryClick = () => {
		stateViewSet(false);
		selectedStateSet('');
	};

	const handleChange = (e) => {
		selectedStateSet(e.target.value);
		stateViewSet(true);
	};

	const fetchProps = {
		handleCountryClick: handleCountryClick,
		selectedState: selectedState,
		handleChange: handleChange
	};

	return (
		<div className={classes.root}>
			<Navbar />
			<Container className={classes.main}>
				{stateView ? (
					<Board
						url={`https://api.covidtracking.com/v1/states/${selectedState.toLowerCase()}/daily.json`}
						region={stateTitle[selectedState]}
						fetchProps={fetchProps}
						abbrv={selectedState}
					/>
				) : (
					<Board url={url} region="United States" fetchProps={fetchProps} />
				)}
			</Container>
		</div>
	);
}

export default App;
