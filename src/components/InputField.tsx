import React from 'react';
import styled from 'styled-components';

interface Props {
	todo: string;
	setTodo: React.Dispatch<React.SetStateAction<string>>;
	addTodoHandler: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, addTodoHandler }: Props) => {
	return (
		<AppForm onSubmit={addTodoHandler}>
			<AppInput
				type='input'
				placeholder='Enter a task'
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
			/>
			<AppSubmit>+</AppSubmit>
		</AppForm>
	);
};
const AppForm = styled.form`
	display: flex;
	width: 20%;
	justify-content: center;
	position: relative;
	align-items: center;
`;

const AppInput = styled.input`
	padding: 1rem;
	width: 100%;
	border-radius: 50px;
	border: none;
	transition: all 0.5s linear;
	-webkit-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	-moz-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
`;

const AppSubmit = styled.button`
	position: absolute;
	width: 2rem;
	height: 2rem;
	border-radius: 100%;
	right: 0px;
	margin-right: 0.5rem;
	border: none;
	font-size: 1rem;
	background: white;
	transition: all 0.3s linear;
	text-align: center;
	-webkit-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	-moz-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	cursor: pointer;
	&:hover {
		background: #dddddd;
	}
`;

export default InputField;
