import React from 'react';

import './App.css';
import Board from './components/MVPGraph/Board.component';

import Regression from './components/MVPGraph/Regression.component'

function App() {
	let url = 'https://covidtracking.com/api/v1/us/daily.json';

	return (
		<div className="App">
			<Board url={url} />
			<Regression />
		</div>
	);
}

export default App;
