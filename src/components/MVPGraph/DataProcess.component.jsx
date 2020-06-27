import React from 'react';
import Regression from './Regression.component';

function DataProcess({ data }) {
	console.log(data);
	const mappedData = data.map((dataObj) => {
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
		let positiveCases = dataObj.positive;
		return [ daysIntoYear(date) + 1, positiveCases ];
	});
	console.log('Mapped Data', mappedData);
	return (
		<div>
			Data is loaded in console
			<Regression mappedData={mappedData} />
		</div>
	);
}

export default DataProcess;
