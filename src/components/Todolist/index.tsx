import React, {useState} from 'react';
import './style.scss';
import {Todo} from './Todo';
import {EmptyList} from '../EmptyList';
import dayjs from 'dayjs';

dayjs.locale('ru')

type TodoType = {
    id: number
    date: string
    title: string
    description: string
    completed: boolean
}

const data: TodoType[] = [
    {id: 1, date: '2021-12-05', title: 'First Task', description: 'aaaaaa', completed: false},
    {id: 2, date: '2023-05-05', title: 'Second Task', description: 'ffffffff', completed: false},
    {id: 3, date: '2021-05-05', title: 'Third Task', description: 'ddddddddd', completed: false},
]

export const Todolist = () => {
    const [tasks, setTasks] = useState<TodoType[]>(data);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const addTaskHandler = () => {
        if (title.trim() && description.trim() && date) {
            setTasks([
                {
                    id: new Date().getMilliseconds(),
                    date: date,
                    title,
                    description,
                    completed: false,
                },
                ...tasks
            ])
            setTitle('')
            setDescription('')
            setDate('')
        }
    }

    const onDeleteTaskHandler = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const onChangeStatusTodo = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t))
    }

    return (
        <div className={'container'}>
            <div className={'title'}>ToDo приложение</div>
            <div className={'todo-list'}>
                <div className={'task-list'}>
                    {tasks.length
                        ? tasks.map(t =>
                            <Todo
                                key={t.id}
                                title={t.title}
                                date={t.date}
                                description={t.description}
                                completed={t.completed}
                                changeStatusTodo={() => onChangeStatusTodo(t.id)}
                                deleteTodo={() => onDeleteTaskHandler(t.id)}/>
                        )
                        : <EmptyList/>
                    }
                </div>
            </div>
            <div className={'addition-pane'}>
                <div className={'addition-pane__header'}>Добавить новую задачу</div>
                <div className={'addition-pane__body'}>
                    <div className={'form-group'}>
                        <input
                            className={'form-control'}
                            type="text"
                            placeholder={'Заголовок задачи'}
                            value={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />
                        <input
                            className={'form-control'}
                            type="text"
                            placeholder={'Описание задачи'}
                            value={description}
                            onChange={(e) => setDescription(e.currentTarget.value)}
                        />
                        <input
                            className={'form-control'}
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.currentTarget.value)}
                        />
                        <small>Что делаем, сколько времени тратим, какой результат получаем.</small>
                    </div>
                    <button className={'form-button'} onClick={addTaskHandler}>Добавить</button>
                </div>
            </div>
        </div>
    );
};



