import React, { useState } from 'react';

import {
	VictoryBar,
	VictoryScatter,
	VictoryChart,
	VictoryZoomContainer,
	VictoryLine,
	VictoryAxis,
	VictoryLabel,
	VictoryVoronoiContainer,
	VictoryTooltip
} from 'victory';

function LineGraph({ originalData, predictedData, currentFilterTerm, currentGraphType, currentGraphTypeSet }) {
	const [ selectedDomain, selectedDomainSet ] = useState(undefined);
	const [ zoomDomain, zoomDomainSet ] = useState(undefined);

	const handleZoom = (domain) => {
		selectedDomainSet(domain);
	};

	const handleBrush = (domain) => {
		zoomDomainSet(domain);
	};
	console.log(currentFilterTerm);
	return (
		<div>
			<VictoryChart
				width={1000}
				height={500}
				padding={{ top: 50, bottom: 50, left: 100, right: 70 }}
				containerComponent={
					// <VictoryZoomContainer
					// responsive={false}
					// zoomDimension='x'
					// zoomDomain={zoomDomain}
					// onZoomDomainChange={handleZoom}
					// />,
					<VictoryVoronoiContainer
						labels={({ datum }) => `Day: ${datum.x} \n ${datum.childName}: ${Math.floor(datum.y * 10000)}`}
						labelComponent={<VictoryTooltip />}
					/>
				}
			>
				{currentGraphType === 'line' ? (
					<VictoryLine
						size={2}
						style={{ data: { stroke: '#1167b1' }, labels: { fill: '#1167b1' } }}
						name={'Actual'}
						data={originalData}
					/>
				) : currentGraphType === 'bar' ? (
					<VictoryBar
						size={2}
						style={{ data: { fill: '#1167b1' }, labels: { fill: '#1167b1' } }}
						name={'Actual'}
						data={originalData}
					/>
				) : (
					<VictoryScatter
						size={2}
						style={{ data: { fill: '#1167b1' }, labels: { fill: '#1167b1' } }}
						name={'Actual'}
						data={originalData}
					/>
				)}

				<VictoryLine
					data={predictedData}
					name={'Predicted'}
					style={{ data: { strokeDasharray: '1em', strokeOpacity: 0.9 } }}
				/>
				<VictoryAxis
					dependentAxis
					label={`Number of ${currentFilterTerm
						.replace(/([A-Z]+)*([A-Z][a-z])/g, '$1 $2')
						.toUpperCase()} Cases (x 10,000)`}
					axisLabelComponent={<VictoryLabel dy={-25} />}
					style={{
						tickLabels: { angle: -45, paddingLeft: 0, color: '#595959' },
						axisLabel: { fontSize: '20px', padding: 30, fontWeight: 900 }
					}}
				/>
				<VictoryAxis
					style={{
						tickLabels: { color: '#595959' },
						axisLabel: { paddingTop: 30, fontSize: '20px', fontWeight: 'bold' }
					}}
					label="Day"
				/>
			</VictoryChart>
		</div>
	);
}

export default LineGraph;
