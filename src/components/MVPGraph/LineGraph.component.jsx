import React, { useState } from 'react';

const xAxis = { title: 'Dates', increments: 10, min: '01/01/2020', max: '06/30/2020' };
const yXais = { title: 'Deaths', increments: 100, min: 0, max: 10000 };
const data = [
	{ xAxis: 0, yAxis: 100 },
	{ xAxis: 10, yAxis: 200 },
	{ xAxis: 20, yAxis: 400 },
	{ xAxis: 30, yAxis: 500 }
];
const equationPoints = [
	{ xAxis: 0, yAxis: 100 },
	{ xAxis: 10, yAxis: 200 },
	{ xAxis: 20, yAxis: 400 },
	{ xAxis: 30, yAxis: 500 }
];

function LineGraph({ data, equationPoints, xAxis, yAxis }) {
	return <div />;
}
