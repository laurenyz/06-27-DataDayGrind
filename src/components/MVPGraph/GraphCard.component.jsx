import React, { useEffect, useState } from 'react';

function GraphCard({ graphResult }) {
	const [ graphCard, graphCardSet ] = useState(undefined);
	useEffect(
		() => {
			graphCardSet(graphResult);
		},
		[ graphResult ]
	);

	if (graphResult.Linear) {
		const { Linear, Exponential } = graphResult;

		let type;
		let chosen;
		if (Math.abs(Linear.r2) > Math.abs(Exponential) || isNaN(Exponential.r2)) {
			type = 'Linear';
			chosen = Linear;
		} else {
			type = 'Exponential';
			chosen = Exponential;
			chosen = Exponential;
		}

		console.log(chosen);

		return (
			<div>
				<h2>Graph Type: {type} </h2>
				<h3>R^2: {chosen.r2}</h3>
				<h3>{chosen.string}</h3>
			</div>
		);
	} else {
		return <div>No Data</div>;
	}
}

export default GraphCard;
