import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import InputField from '../components/InputField';
import TodoList from '../components/TodoList';
import { Todo } from '../model';
const Main: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Todo[]>([]);

	const addTodoHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (todo) {
			setTodos([...todos, { id: uuidv4(), todo: todo, isDone: false }]);
			setTodo('');
		}
	};

	return (
		<AppWrapper>
			<AppHeader>TASKIFY</AppHeader>
			<InputField
				todo={todo}
				setTodo={setTodo}
				addTodoHandler={addTodoHandler}
			/>
			<TodoList todos={todos} setTodos={setTodos} />
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
	gap: 1rem;
`;

const AppHeader = styled.h1`
	font-size: 2rem;
	font-weight: 800;
`;
