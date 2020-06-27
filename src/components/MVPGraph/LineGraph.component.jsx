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

function LineGraph({ originalData, predictedData }) {
	const [ selectedDomain, selectedDomainSet ] = useState(undefined);
	const [ zoomDomain, zoomDomainSet ] = useState(undefined);

	const handleZoom = (domain) => {
		selectedDomainSet(domain);
	};

	const handleBrush = (domain) => {
		zoomDomainSet(domain);
	};

	return (
		<div>
			<VictoryChart
				width={1000}
				height={500}
				style={{ parent: { marginLeft: '2em' } }}
				containerComponent={
					// <VictoryZoomContainer
					// responsive={false}
					// zoomDimension='x'
					// zoomDomain={zoomDomain}
					// onZoomDomainChange={handleZoom}
					// />,
					<VictoryVoronoiContainer
						voronoiDimension="x"
						labels={({ datum }) => `${datum.childName}: ${Math.floor(datum.y * 10000)}`}
						labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: 'white' }} />}
					/>
				}
			>
				<VictoryBar
					size={2}
					style={{ data: { fill: 'blue' }, labels: { fill: 'blue' } }}
					name={'Actual'}
					data={originalData}
				/>
				<VictoryLine
					data={predictedData}
					name={'Predicted'}
					style={{ data: { strokeDasharray: '1em', strokeOpacity: 0.9 } }}
				/>
				<VictoryAxis
					dependentAxis
					label="Number of Confirmed Cases (x 10,000)"
					axisLabelComponent={<VictoryLabel dy={-12} />}
				/>
				<VictoryAxis label="Day" />
			</VictoryChart>
		</div>
	);
}

export default LineGraph;
