import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';
import Typography from '@material-ui/core/Typography';

addStyles();

function GraphCard({ graphResult, region }) {
	let Linear, Exponential, type, chosen;

	if (graphResult.Linear) {
		Linear = graphResult.Linear;
		Exponential = graphResult.Exponential;
		if (Math.abs(Linear.r2) > Math.abs(Exponential.r2) || isNaN(Exponential.r2) || Exponential.equation[1]===0 ) {
			type = 'Linear';
			chosen = Linear;
		} else {
			type = 'Exponential';
			chosen = Exponential;
		}
	}

	return Linear ? (
		<div>
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
	) : (
		<div>No Data</div>
	);
}

export default GraphCard;
