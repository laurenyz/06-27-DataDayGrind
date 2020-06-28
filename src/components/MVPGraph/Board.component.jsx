import React, { useState, useEffect } from 'react';
import DataProcess from './DataProcess.component';

function Board({ url, region, fetchProps }) {
	const [ fetchResult, fetchResultSet ] = useState(undefined);

	useEffect(
		() => {
			const fetchData = () => {
				fetch(url).then((response) => response.json()).then((json) => fetchResultSet(json));
			};
			fetchData();
		},
		[ url ]
	);

	return !fetchResult ? (
		<div>Loading Data</div>
	) : !fetchResult[0] ? (
		<div>Data Load Error</div>
	) : (
		<div>
			<DataProcess data={fetchResult} region={region} fetchProps={fetchProps} />
		</div>
	);
}

export default Board;
