import React, { useState, useEffect } from 'react';
import DataProcess from './DataProcess.component';
import Resources from './Resources.component';
import Grid from '@material-ui/core/Grid'

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
			<Grid container direction="column" spacing = {2}>
				<Grid item>
				<DataProcess data={fetchResult} region={region} fetchProps={fetchProps} />
				</Grid>
				{region !== 'United States' ? (
					<Grid item>
						<Resources stateData={stateInfo.filter((obj) => obj.state === abbrv)[0]} />
					</Grid>
				) : null}
			</Grid>
			
			
		</div>
	);
}

export default Board;
