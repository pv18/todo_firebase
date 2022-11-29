import React, {useState} from 'react';
import {addDoc, collection} from 'firebase/firestore';
import {db} from '../../../firebase';
import {uid} from 'uid';
import {Button} from '../../Button';
import {TextField} from '../../TextField';
import s from './style.module.scss';

export const AdditionPane = () => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const addTodo = async () => {
        if (title.trim() && description.trim() && date) {
            await addDoc(collection(db, 'todos'), {
                id: uid(),
                date: date,
                title,
                description,
                completed: false,
            })

            setTitle('')
            setDescription('')
            setDate('')
        }
    }

    return (
        <div className={s.additionPane}>
            <div className={s.additionPane__header}>Добавить новую задачу</div>
            <div className={s.additionPane__body}>
                <div className={s.formGroup}>
                    <TextField
                        type="text"
                        placeholder={'Заголовок задачи'}
                        value={title}
                        onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                    <TextField
                        type="text"
                        placeholder={'Описание задачи'}
                        value={description}
                        onChange={(e) => setDescription(e.currentTarget.value)}
                    />
                    <TextField
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.currentTarget.value)}
                    />
                    <small>Что делаем, сколько времени тратим, какой результат получаем.</small>
                </div>
                <Button onClick={addTodo}>Добавить</Button>
            </div>
        </div>
    );
};

