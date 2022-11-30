import React, {FC, useState} from 'react';
import IconPencil from '../../../../assets/svgs/pencil.svg';
import dayjs from 'dayjs';
import {doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../../firebase';
import {TodoType} from '../../../../types/shared';
import {TextField} from '../../../TextField';
import {IconButton} from '../../../IconButton';
import s from './style.module.scss';

type Props = {
    todo: TodoType
}

export const TodoDate: FC<Props> = ({todo}) => {
    const [date, setDate] = useState<string>(todo.date);
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const changeDateTodo = async (todo: TodoType, newDate: string) => {
        await updateDoc(doc(db, 'todos', todo.id), {date: newDate})
    }

    const onBlurDateHandler = (todo: TodoType) => {
        changeDateTodo(todo, date)
        setIsEditMode(false)
    }

    return (
        <div className={s.wrapper}>
            <IconButton disabled={isEditMode} onClick={() => setIsEditMode(true)}>
                <img src={IconPencil} alt="pencil"/>
            </IconButton>
            <span>дата:</span>
            {isEditMode
                ? <TextField
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.currentTarget.value)}
                    onClick={(e) => e.stopPropagation()}
                    onBlur={() => onBlurDateHandler(todo)}
                    autoFocus
                />
                : <span>{dayjs(date).format('DD.MM.YYYY')}</span>
            }
        </div>
    );
};

