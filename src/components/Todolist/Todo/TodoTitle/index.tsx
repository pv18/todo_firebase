import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../firebase';
import {TodoType} from '../../../../types/shared';
import {TextField} from '../../../TextField';

type Props = {
    todo: TodoType
    editMode: boolean
    closeEditMode: () => void
}

export const TodoTitle: FC<Props> = ({todo, editMode, closeEditMode}) => {
    const [title, setTitle] = useState<string>(todo.title)

    const changeTitleTodo = async (todo: TodoType, newTitle: string) => {
        await updateDoc(doc(db, 'todos', todo.id), {title: newTitle})
    }

    const setTitleTodoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.trim()) {
            setTitle(e.currentTarget.value)
        }
    }

    const onKeyDownTitleHandler = (e: KeyboardEvent<HTMLInputElement>, todo: TodoType) => {
        if (e.key === 'Enter') {
            changeTitleTodo(todo, title)
            closeEditMode()
        }
    }

    const onBlurTitleHandler = (todo: TodoType) => {
        changeTitleTodo(todo, title)
        closeEditMode()
    }

    return (
        <>
            {editMode
                ? <TextField
                    type="text"
                    value={title}
                    onChange={(e) => setTitleTodoHandler(e)}
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => onKeyDownTitleHandler(e, todo)}
                    onBlur={() => onBlurTitleHandler(todo)}
                    autoFocus
                />
                : <span>{title}</span>
            }
        </>
    );
};

