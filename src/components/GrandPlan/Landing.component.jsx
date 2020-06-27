import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`border: solid red 2px;`;
const Submit = styled.button``;
function Landing() {
	const [ inputValue, inputValueSet ] = useState;

	const handleChange = () => {};

	return (
		<div>
			<Input value={inputValue} onChange={handleChange} />
			<Submit>Submit</Submit>
		</div>
	);
}
export default Landing;
