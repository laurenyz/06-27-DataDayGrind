import React from 'react';
import { addStyles, StaticMathField } from 'react-mathquill';
import Typography from '@material-ui/core/Typography';

addStyles();

function GraphCard({ graphResult, region }) {
	let Linear, Exponential, Logarithmic, Power, type, chosen, displayEquation;

	if (graphResult.Linear) {
		Linear = graphResult.Linear;
		Exponential = graphResult.Exponential;
		Logarithmic = graphResult.Logarithmic;
		Power = graphResult.Power;

		let maximum = Math.max(Math.abs(Logarithmic.r2), Math.abs(Exponential.r2), Math.abs(Linear.r2), Math.abs(Power.r2))
		if (Math.abs(Linear.r2) === maximum){
			type = "Linear"
			chosen = Linear
			displayEquation = `y = ${chosen.equation[0]}x+${chosen.equation[1]}`
		} else if (Math.abs(Exponential.r2) === maximum){
			type = "Exponential"
			chosen = Exponential
			displayEquation = `y = ${chosen.equation[0]}e^{\n${chosen.equation[1]}x}`
		} else if (Math.abs(Power.r2) === maximum){
			type = "Power"
			chosen = Power
			displayEquation = `y = ${chosen.equation[0]}x^{\n${chosen.equation[1]}}`
		} else {
			type = 'Logarithmic'
			chosen = Logarithmic
			displayEquation = `y = ${chosen.equation[0]}+${chosen.equation[1]}ln(x)`
		}
	}

	return Linear ? (
		<div>
			<Typography>Graph Type: {type}</Typography>
			<div>
				<StaticMathField>{`r^2 = ${chosen.r2}`}</StaticMathField>
			</div>
			<div>
				<StaticMathField>{displayEquation}</StaticMathField>
			</div>
		</div>
	) : (
		<div>No Data</div>
	);
}

export default GraphCard;
