import React from 'react';
import regression from 'regression';
import LineGraph from './LineGraph.component';

function Regression({ mappedData, currentFilterTerm, currentGraphType, currentGraphTypeSet }) {
	// const data = [[0, 1], [32, 67], [12, 79]]
	const data = mappedData;
	const resultlinear = regression.linear(data);
	console.log('linear equation:', resultlinear.string, resultlinear.r2, resultlinear);
	const resultexponetial = regression.exponential(data);
	console.log('exponentional equation:', resultexponetial.string, resultexponetial.r2, resultexponetial);
	let graphTypeName;
	let graph;
	if (Math.abs(resultlinear.r2) > Math.abs(resultexponetial) || isNaN(resultexponetial.r2)) {
		graphTypeName = 'Linear';
		graph = resultlinear;
	} else {
		graphTypeName = 'Exponential';
		graph = resultexponetial;
		graph = resultexponetial;
	}

	return (
		<div>
			{/* <div>
				<h1>Regression Component</h1>
				<h2>Graph Type: {graphTypeName}</h2>
				<h3>R^2: {graph.r2}</h3>
				<h3>Equation: {graph.string}</h3>
				<h3>Points: {graph.points.forEach((point) => `(${point[0]},${point[1]})`)}</h3>
				<h3>Prediction: {graph.predict(300)}</h3>
			</div> */}
			<LineGraph
				originalData={mappedData.map((data) => {
					return { x: data[0], y: data[1] / 10000 };
				})}
				predictedData={graph.points.map((data) => {
					return { x: data[0], y: data[1] / 10000 };
				})}
				currentFilterTerm={currentFilterTerm}
				currentGraphType={currentGraphType}
				currentGraphTypeSet={currentGraphTypeSet}
			/>
		</div>
	);
}

export default Regression;
