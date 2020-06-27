import React, { useState, useEffect } from 'react';
import DataProcess from './DataProcess.component';
import LineGraph from './LineGraph.component';

function Board({ url }) {
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
			<DataProcess data={fetchResult} />
			<LineGraph data={fetchResult}/>
		</div>
	);
}

export default Board;
