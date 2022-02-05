import React, { useState } from 'react';
import styled from 'styled-components';
import InputField from '../components/InputField';

const Main: React.FC = () => {
	const [todo, setTodo] = useState<string>('');

	return (
		<AppWrapper>
			<AppHeader>TASKIFY</AppHeader>
			<InputField todo={todo} setTodo={setTodo} />
		</AppWrapper>
	);
};
export default Main;

const AppWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const AppHeader = styled.h1`
	font-size: 2rem;
	font-weight: 800;
`;
