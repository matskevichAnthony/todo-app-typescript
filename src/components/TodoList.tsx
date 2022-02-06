import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Todo } from '../model';
import TodoItem from './TodoItem';

interface Props {
	todos: Todo[];
	completedTodos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
	setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

interface StyledProps {
	dragging: boolean;
}

const TodoList = ({
	todos,
	completedTodos,
	setTodos,
	setCompletedTodos,
}: Props) => {
	return (
		<TodosWrapper>
			<Droppable droppableId='TodosList'>
				{(provided, snapshot) => (
					<ActiveTasks
						dragging={snapshot.isDraggingOver}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{(todos.length > 0 || completedTodos.length > 0) && (
							<TasksHeader>Active tasks</TasksHeader>
						)}
						{todos.map((todo, index) => {
							return (
								<TodoItem
									index={index}
									key={todo.id}
									todo={todo}
									todos={todos}
									setTodos={setTodos}
								/>
							);
						})}
						{provided.placeholder}
					</ActiveTasks>
				)}
			</Droppable>
			<Droppable droppableId='TodosRemove'>
				{(provided, snapshot) => (
					<FinishedTasks
						dragging={snapshot.isDraggingOver}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{(todos.length > 0 || completedTodos.length > 0) && (
							<TasksHeader>Completed tasks</TasksHeader>
						)}
						{completedTodos.map((todo, index) => {
							return (
								<TodoItem
									index={index}
									key={todo.id}
									todo={todo}
									todos={completedTodos}
									setTodos={setCompletedTodos}
								/>
							);
						})}
						{provided.placeholder}
					</FinishedTasks>
				)}
			</Droppable>
		</TodosWrapper>
	);
};

export default TodoList;

const TodosWrapper = styled.div`
	width: 90%;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	gap: 1rem;
`;

const ActiveTasks = styled.div<StyledProps>`
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	width: 40%;
	border-radius: 1rem;
	background-color: ${(props) => (props.dragging ? '#dfdfdf' : '')};
`;

const FinishedTasks = styled.div<StyledProps>`
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	gap: 1rem;
	width: 40%;
	border-radius: 1rem;
	background-color: ${(props) => (props.dragging ? '#dfdfdf' : '')};
`;

const TasksHeader = styled.h2`
	padding-left: 2rem;
	font-size: 1rem;
	color: #b1b1b1;
	align-self: start;
`;
