import React, { useEffect } from 'react';
import regression from 'regression';
import LineGraph from './LineGraph.component';
import Typography from '@material-ui/core/Typography'

function Regression({
	mappedData,
	currentFilterTerm,
	currentGraphType,
	currentGraphTypeSet,
	currentGraphResultSet,
	region,
	daysFromNow
}) {
	// const data = [[0, 1], [32, 67], [12, 79]]
	const data = mappedData;
	const resultlinear = regression.linear(data, {precision: 3});
	const resultexponetial = regression.exponential(data, {precision: 3});
	const resultlogarithmic = regression.logarithmic(data, {precision: 3})
	const resultpower = regression.power(data, {precision: 3})
	
	let graph;
	let prediction
	let days = isNaN(daysFromNow)? 0 : daysFromNow
	console.log(data)

	console.log("Linear:", resultlinear.r2, "Exponential:", resultexponetial.r2, "Logarithmic:", resultlogarithmic.r2, "Power:", resultpower.r2)
	

	//testing for NaN or numbers outside the range of showing relationship
	if(isNaN(resultexponetial.r2)||Math.abs(resultexponetial.r2)>1){
		resultexponetial.r2 = 0
	}
	if(isNaN(resultlogarithmic.r2)||Math.abs(resultlogarithmic.r2)>1){
		resultlogarithmic.r2 = 0
	}
	if(isNaN(resultpower.r2)||Math.abs(resultpower.r2)>1){
		resultpower.r2 = 0
	}
	let maximum = Math.max(Math.abs(resultlogarithmic.r2), Math.abs(resultexponetial.r2), Math.abs(resultlinear.r2), Math.abs(resultpower.r2))
	if (Math.abs(resultlinear.r2) === maximum){
		graph = resultlinear;
		prediction = resultlinear.predict(data[0][0]+days)
	} else if (Math.abs(resultexponetial.r2) === maximum) {
		graph = resultexponetial;
		prediction = resultexponetial.predict(data[0][0]+days)
	} else if (Math.abs(resultlogarithmic.r2) === maximum) {
		graph = resultlogarithmic;
		prediction = resultlogarithmic.predict(data[0][0]+days)
	} else {
		graph = resultpower
		prediction = resultpower.predict(data[0][0]+days)
	}
	console.log("Linear:", resultlinear.r2, "Exponential:", resultexponetial.r2, "Logarithmic:", resultlogarithmic.r2, "Power:", resultpower.r2)
	console.log(maximum, graph)

	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start + (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	useEffect(
		() => {
			let data = { Linear: resultlinear, Exponential: resultexponetial, Logarithmic: resultlogarithmic, Power: resultpower};
			currentGraphResultSet(data);
		},
		// eslint-disable-next-line
		[ currentFilterTerm, region ]
	);
	return (
		
		<div>
			<LineGraph
				originalData={mappedData
					.map((data) => {
						return { x: data[0], y: data[1] / 10000 };
					})
					.filter((data) => data.x < day)}
				predictedData={graph.points
					.map((data) => {
						return { x: data[0], y: data[1] / 10000 };
					})
					.filter((data) => data.x < day)}
				currentFilterTerm={currentFilterTerm}
				currentGraphType={currentGraphType}
				currentGraphTypeSet={currentGraphTypeSet}
			/>
			<Typography style={{margin:"20px"}}>Prediction of {days} day(s) from now: {Math.floor(prediction[1])}</Typography>
		</div>
	);
}

export default Regression;
