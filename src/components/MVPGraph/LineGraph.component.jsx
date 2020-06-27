import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
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

function LineGraph({ originalData, predictedData, currentFilterTerm }) {
	const [ selectedDomain, selectedDomainSet ] = useState(undefined);
	const [ zoomDomain, zoomDomainSet ] = useState(undefined);
	const [ graphType, graphTypeSet ] = useState('scatter');

	const handleZoom = (domain) => {
		selectedDomainSet(domain);
	};

	const handleBrush = (domain) => {
		zoomDomainSet(domain);
	};

	const handleChange = (e) => {
		graphTypeSet(e.target.value);
	};

	return (
		<div>
			<div>
				<Select native value={graphType} onChange={handleChange}>
					<option value={'scatter'}>Scatter</option>
					<option value={'line'}>Line</option>
					<option value={'bar'}>Bar</option>
				</Select>
			</div>
			<VictoryChart
				width={1000}
				height={500}
				style={{ parent: { marginLeft: '2em' } }}
				animate={{duration: 500}}
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
				{graphType === 'line' ? (
					<VictoryLine
						size={2}
						style={{ data: { stroke: 'blue' }, labels: { fill: 'blue' } }}
						name={'Actual'}
						data={originalData}
					/>
				) : graphType === 'bar' ? (
					<VictoryBar
						size={2}
						style={{ data: { fill: 'blue' }, labels: { fill: 'blue' } }}
						name={'Actual'}
						data={originalData}
					/>
				) : (
					<VictoryScatter
						size={2}
						style={{ data: { fill: 'blue' }, labels: { fill: 'blue' } }}
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
					label={`Number of ${currentFilterTerm} Cases (x 10,000)`}
					axisLabelComponent={<VictoryLabel dy={-12} />}
				/>
				<VictoryAxis label="Day" />
			</VictoryChart>
		</div>
	);
}

export default LineGraph;
