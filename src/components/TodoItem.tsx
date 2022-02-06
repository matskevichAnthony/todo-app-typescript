import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
	index: number;
	todo: Todo;
	todos: Todo[];
	setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

interface StyledProps {
	isDone: boolean;
}

const TodoItem = ({ index, todo, todos, setTodos }: Props) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [editTodo, setEditTodo] = useState<string>(todo.todo);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, [edit]);

	//FIXME: WHEN TODO IS DONE PROBLEM WITH DRAGGING AND BUTTON
	const handleDone = (id: string) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
			),
		);
	};

	const handleEdit = (e: React.FormEvent, id: string) => {
		e.preventDefault();

		setTodos(
			todos.map((todo) => {
				return todo.id === id ? { ...todo, todo: editTodo } : todo;
			}),
		);
		setEdit(false);
	};

	const handleDelete = (id: string) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};
	console.log(todos);
	return (
		<Draggable draggableId={todo.id} index={index}>
			{(provided) => (
				<TodoWrapper
					isDone={todo.isDone}
					onSubmit={(e) => handleEdit(e, todo.id)}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<TaskWrapper>
						{edit ? (
							<StyledInput
								ref={inputRef}
								placeholder={editTodo}
								value={editTodo}
								onChange={(e) => setEditTodo(e.target.value)}
							/>
						) : (
							todo.todo
						)}
					</TaskWrapper>
					<ButtonsWrapper isDone={todo.isDone}>
						<AiFillEdit
							onClick={() => {
								setEdit(!edit);
							}}
						/>
						<AiFillDelete onClick={() => handleDelete(todo.id)} />
						<MdDone onClick={() => handleDone(todo.id)} />
					</ButtonsWrapper>
				</TodoWrapper>
			)}
		</Draggable>
	);
};

export default TodoItem;

const TodoWrapper = styled.form<StyledProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	width: 90%;
	border-radius: 50px;
	background-color: ${(props) => (props.isDone ? '#ffacac' : 'white')};
	text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
	color: ${(props) => (props.isDone ? '#ffffff' : '#1f1f1f')};
	border: none;
	transition: all 0.5s linear;
	-webkit-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	-moz-box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
	box-shadow: 0px 0px 12px 1px rgba(60, 60, 60, 0.2);
`;

const TaskWrapper = styled.div`
	width: 85%;
`;

const ButtonsWrapper = styled.div<StyledProps>`
	display: flex;
	justify-content: center;
	gap: 0.5rem;
	width: 15%;
	svg {
		width: 1.5rem;
		height: 1.5rem;
		fill: ${(props) => (props.isDone ? '#ffffff' : '#1f1f1f')};
		transition: all 0.3s linear;
		cursor: pointer;
		&:hover {
			fill: #b9b9b9;
		}
	}
`;

const StyledInput = styled.input``;
