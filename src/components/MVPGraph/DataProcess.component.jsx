import React, { useState } from 'react';
import Regression from './Regression.component';
import Filter from './Filter.component';

function DataProcess({ data }) {
	const [ currentFilterTerm, currentFilterTermSet ] = useState('positive');

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
			<Filter
				currentFilterTerm={currentFilterTerm}
				currentFilterTermSet={currentFilterTermSet}
				filteredKeys={filteredKeys}
			/>
			<Regression mappedData={mappedData} currentFilterTerm={currentFilterTerm} />
		</div>
	);
}

export default DataProcess;
