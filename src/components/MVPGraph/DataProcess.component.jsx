import React from 'react';
import Regression from './Regression.component'

function DataProcess({ data }) {
	console.log(data);
	const mappedData = data.map(dataObj => [dataObj.date-20200303, dataObj.positive])
	return <div>
		Data is loaded in console
		<Regression mappedData={mappedData}/>
		</div>;
}

export default DataProcess;
