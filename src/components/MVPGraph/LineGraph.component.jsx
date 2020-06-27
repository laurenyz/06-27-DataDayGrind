import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryLabel, VictoryVoronoiContainer, VictoryTooltip } from 'victory';


class LineGraph extends Component {
	constructor() {
        super();
        this.state= {}
    }
    
    handleZoom(domain) {
        this.setState({
            selectedDomain: domain
        })
    }

    handleBrush(domain) {
        this.setState({
            zoomDomain: domain
        })
    }

    render() {
        return (
            <div>
                <VictoryChart 
                width={1000}
                height={500}
                style={{parent: {marginLeft: '2em'}}}
                containerComponent={
                    // <VictoryZoomContainer 
                    // responsive={false}
                    // zoomDimension='x'
                    // zoomDomain={this.state.zoomDomain}
                    // onZoomDomainChange={this.handleZoom.bind(this)}
					// />,
					<VictoryVoronoiContainer 
					voronoiDimension='x'
					labels={({datum}) => `${datum.childName}: ${datum.y}`}
					labelComponent={<VictoryTooltip
					cornerRadius={0}
					flyoutStyle={{fill: 'white'}}
					/>}
					/>
                }
                >
                <VictoryLine 
				style={{data: {stroke: 'blue'}, labels: {fill: 'blue'}}}
				name={'Actual'}
                data={this.props.originalData}
                />
				<VictoryLine 
				data={this.props.predictedData}
				name={'Predicted'}
				style={{data: {strokeDasharray: '1em', strokeOpacity: 0.9}}}
				/>
                <VictoryAxis dependentAxis
                label="Number of Confirmed Cases (x 10,000)"
                axisLabelComponent={<VictoryLabel dy={-12}/>}
                />
                <VictoryAxis 
                label='Day'
                />
                </VictoryChart>
            </div>
        );
    }
}

export default LineGraph;

