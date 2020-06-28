import React, { useState, useEffect } from 'react';
import DataProcess from './DataProcess.component';
import Resources from './Resources.component';

function Board({ url, region, fetchProps, abbrv }) {
	const [ fetchResult, fetchResultSet ] = useState(undefined);
	const [ stateInfo, stateInfoSet ] = useState(undefined);

	useEffect(
		() => {
			const fetchData = () => {
				fetch(url).then((response) => response.json()).then((json) => fetchResultSet(json));
			};
			fetchData();
			const stateInfo = () => {
				fetch('https://covidtracking.com/api/v1/states/info.json')
					.then((response) => response.json())
					.then((json) => stateInfoSet(json));
			};
			stateInfo();
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
			{region !== 'United States' ? (
				<Resources stateData={stateInfo.filter((obj) => obj.state === abbrv)[0]} />
			) : null}
		</div>
	);
}

export default Board;
