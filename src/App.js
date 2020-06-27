import React from 'react';
import { makeStyles } from "@material-ui/core/styles"

import './App.css';
import Board from './components/MVPGraph/Board.component';
import Navbar from './components/MVPGraph/Navbar.component'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles((theme) => ({
	root: {
	  minHeight: "100vh", /* will cover the 100% of viewport */
	  overflow: "hidden",
	  display: "block",
	  position: "relative",
	  paddingBottom: "100px",
	  backgroundColor: "#e0e0e0"
	},
	main: {
	  marginTop: "20px",
	  paddingLeft: "20px",
	  paddingRight: "20px",
	  paddingTop: "20px",
	  textAlign: "center",
	}
  }));

function App() {
	const classes = useStyles()
	let url = 'https://covidtracking.com/api/v1/us/daily.json';

	return (
		<div className={classes.root}>
			{/* <div className="App"> */}
			<Navbar />
			<Container className={classes.main} >
				<Board url={url} />
			</Container>
			{/* </div> */}
		</div>
		
	);
}

export default App;
