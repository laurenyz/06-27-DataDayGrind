import React from 'react';
import { Button, Select } from '@material-ui/core';

function FetchSelector({ handleCountryClick, selectedState, handleChange }) {
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
	return (
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
	);
}

export default FetchSelector;
