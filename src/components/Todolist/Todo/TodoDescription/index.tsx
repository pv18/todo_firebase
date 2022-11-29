import React, {FC, KeyboardEvent, useState} from 'react';
import IconPencil from '../../../../assets/svgs/pencil.svg';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../firebase';
import {TodoType} from '../../../../types/shared';
import {TextField} from '../../../TextField';
import s from './style.module.scss';
import {IconButton} from '../../../IconButton';

type Props = {
    todo: TodoType
}

export const TodoDescription: FC<Props> = ({todo}) => {
    const [description, setDescription] = useState<string>(todo.description);
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const changeDescriptionTodo = async (todo: TodoType, newDescription: string) => {
        await updateDoc(doc(db, 'todos', todo.id), {description: newDescription})
    }

    const onBlurDescriptionHandler = (todo: TodoType) => {
        changeDescriptionTodo(todo, description)
        setIsEditMode(false)
    }

    const onKeyDownDescriptionHandler = (e: KeyboardEvent<HTMLInputElement>, todo: TodoType) => {
        if (e.key === 'Enter') {
            changeDescriptionTodo(todo, description)
            setIsEditMode(false)
        }
    }

    return (
        <div className={s.wrapper}>
            <IconButton disabled={isEditMode} onClick={() => setIsEditMode(true)}>
                <img src={IconPencil} alt="pencil"/>
            </IconButton>
            {isEditMode
                ? <TextField
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => onBlurDescriptionHandler(todo)}
                    onKeyDown={(e) => onKeyDownDescriptionHandler(e, todo)}
                    autoFocus
                />
                : <span>{description}</span>
            }
        </div>
    );
};

