import React from 'react';
import regression from 'regression';

function Regression({ mappedData }) {
	// const data = [[0, 1], [32, 67], [12, 79]]
	const data = mappedData;
	const resultlinear = regression.linear(data);
	console.log('linear equation:', resultlinear.string, resultlinear.r2, resultlinear);
	const resultexponetial = regression.exponential(data);
	console.log('exponention equation:', resultexponetial.string, resultexponetial.r2);
	let graphTypeName;
	let graph;
	if (Math.abs(resultlinear.r2) > Math.abs(resultexponetial)) {
		graphTypeName = 'Linear';
		graph = resultlinear;
	} else {
		graphTypeName = 'Exponential';
		graph = resultexponetial;
		graph = resultexponetial;
	}

	return (
		<div>
			<h1>Regression Component</h1>
			<h2>Graph Type: {graphTypeName}</h2>
			<h3>R^2: {graph.r2}</h3>
			<h3>Equation: {graph.string}</h3>
			<h3>Points: {graph.points.forEach((point) => `(${point[0]},${point[1]})`)}</h3>
			<h3>Prediction: {graph.predict(300)}</h3>
		</div>
	);
}

export default Regression;
