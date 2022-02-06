import React from 'react';
import styled from 'styled-components';
import { Todo } from '../model';
import TodoItem from './TodoItem';

interface Props {
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
	return (
		<TodosWrapper>
			{todos.map((todo) => {
				return (
					<TodoItem
						key={todo.id}
						todo={todo}
						todos={todos}
						setTodos={setTodos}
					/>
				);
			})}
		</TodosWrapper>
	);
};

export default TodoList;

const TodosWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
