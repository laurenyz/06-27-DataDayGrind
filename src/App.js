import React from 'react';

import './App.css';
import Board from './components/MVPGraph/Board.component';

function App() {
	let url = 'https://covidtracking.com/api/v1/us/daily.json';

	return (
		<div className="App">
			<Board url={url} />
		</div>
	);
}

export default App;
