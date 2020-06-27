import React, { useEffect } from 'react';
import regression from 'regression';
import LineGraph from './LineGraph.component';

function Regression({ mappedData, currentFilterTerm, currentGraphType, currentGraphTypeSet, currentGraphResultSet }) {
	// const data = [[0, 1], [32, 67], [12, 79]]
	const data = mappedData;
	const resultlinear = regression.linear(data);
	// console.log('linear equation:', resultlinear.string, resultlinear.r2, resultlinear);
	const resultexponetial = regression.exponential(data);
	// console.log('exponentional equation:', resultexponetial.string, resultexponetial.r2, resultexponetial);
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

	useEffect(
		() => {
			let data = { Linear: resultlinear, Exponential: resultexponetial };
			currentGraphResultSet(data);
		},
		[ currentFilterTerm ]
	);

	return (
		<div>
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
