import React from 'react';
import Select from '@material-ui/core/Select';

function Filter({ filteredKeys, currentFilterTerm, currentFilterTermSet }) {
	const handleChange = (e) => {
		console.log('handleChange', e.target.value);
		currentFilterTermSet(e.target.value);
	};

	return (
		<div>
			<Select
				native
				value={currentFilterTerm}
				onChange={handleChange}
				inputProps={{
					name: 'age',
					id: 'age-native-simple'
				}}
			>
				{filteredKeys.map((filterTerm, index) => {
					return (
						<option value={filterTerm} key={index}>
                            {filterTerm.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2").toUpperCase()}
                        </option>
					);
				})}
			</Select>
		</div>
	);
}

export default Filter;
