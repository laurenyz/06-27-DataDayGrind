import React, { Component } from 'react';
import { VictoryChart, VictoryZoomContainer, VictoryLine, VictoryAxis, VictoryLabel } from 'victory';


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
                width={2000}
                height={500}
                style={{parent: {marginLeft: '2em'}}}
                // scale={{x: 'time'}}
                containerComponent={
                    <VictoryZoomContainer 
                    responsive={false}
                    zoomDimension='x'
                    zoomDomain={this.state.zoomDomain}
                    onZoomDomainChange={this.handleZoom.bind(this)}
                    />
                }
                >
                <VictoryLine 
                style={{fill: 'tomato'}}
                data={this.props.originalData}
                />
				<VictoryLine 
				data={this.props.predictedData}
				style={{fill: {color: 'red'}}}
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

