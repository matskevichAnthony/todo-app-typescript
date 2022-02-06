import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import InputField from '../components/InputField';
import TodoList from '../components/TodoList';
import { Todo } from '../model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
const Main: React.FC = () => {
	const [todo, setTodo] = useState<string>('');
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	const addTodoHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (todo) {
			setTodos([...todos, { id: uuidv4(), todo: todo, isDone: false }]);
			setTodo('');
		}
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		let add,
			active = todos,
			complete = completedTodos;

		if (source.droppableId === 'TodosList') {
			add = active[source.index];
			active.splice(source.index, 1);
			add.isDone = true;
		} else {
			add = complete[source.index];
			complete.splice(source.index, 1);
			add.isDone = false;
		}

		if (destination.droppableId === 'TodosList') {
			active.splice(destination.index, 0, add);
		} else {
			complete.splice(destination.index, 0, add);
		}

		setCompletedTodos(complete);
		setTodos(active);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<AppWrapper>
				<AppHeader>TASKIFY</AppHeader>
				<InputField
					todo={todo}
					setTodo={setTodo}
					addTodoHandler={addTodoHandler}
				/>
				<TodoList
					todos={todos}
					setTodos={setTodos}
					completedTodos={completedTodos}
					setCompletedTodos={setCompletedTodos}
				/>
			</AppWrapper>
		</DragDropContext>
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
