import React, { useEffect, useState } from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';
import Typography from '@material-ui/core/Typography';

addStyles();

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

		return (
			<div style={{ marginBottom: '20px' }}>
				<Typography>Graph Type: {type}</Typography>
				<div>
					<StaticMathField>{`r^2 = ${chosen.r2}`}</StaticMathField>
				</div>
				<div>
					{type === 'Linear' ? (
						<StaticMathField>{`y = ${chosen.equation[0]}x+${chosen.equation[1]}`}</StaticMathField>
					) : (
						<StaticMathField>{`y = ${chosen.equation[0]}x^{\n${chosen.equation[1]}}`}</StaticMathField>
					)}
				</div>
			</div>
		);
	} else {
		return <div>No Data</div>;
	}
}

export default GraphCard;
