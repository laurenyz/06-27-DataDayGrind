import React, { useState } from 'react';
import { Button, Select, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

function FetchSelector({ handleCountryClick, selectedState, handleChange }) {
	const [ disabled, disabledSet ] = useState(true);
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
	function handleButtonOnClick(event) {
		disabledSet(true);
		handleCountryClick(event);
	}

	function handleSelectOnChange(event) {
		disabledSet(false);
		handleChange(event);
	}
	return (
		<div>
			<Grid container justify="center" spacing={2}>
				<Grid item>
					<Button disabled={disabled} variant="contained" onClick={(event) => handleButtonOnClick(event)}>
						<Typography>USA</Typography>
					</Button>
				</Grid>
				<Grid item>
					<Select
						style={{ marginBottom: '20x' }}
						native
						value={selectedState}
						onChange={(event) => handleSelectOnChange(event)}
					>
						<option value={''} disabled>
							STATES
						</option>
						{states.map((state, index) => {
							return (
								<option value={state} key={index}>
									{state}
								</option>
							);
						})}
					</Select>
				</Grid>
			</Grid>
		</div>
	);
}

export default FetchSelector;
