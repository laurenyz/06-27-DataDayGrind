import React from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

function Filter({ filteredKeys, currentFilterTerm, currentFilterTermSet }) {
	const handleChange = (e) => {
		console.log('handleChange', e.target.value);
		currentFilterTermSet(e.target.value);
	};

	return (
		<div>
	  		<InputLabel style={{marginBottom:"5x"}} id="demo-simple-select-helper-label">Select Data Type</InputLabel>
			<Select style={{marginBottom:"20x"}} native value={currentFilterTerm} onChange={handleChange}>
				{filteredKeys.map((filterTerm, index) => {
					return (
						<option value={filterTerm} key={index}>
							{filterTerm.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2').toUpperCase()}
						</option>
					);
				})}
			</Select>
		</div>
	);
}

export default Filter;
