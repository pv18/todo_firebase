import React, {useEffect, useState} from 'react';
import {Todo} from './Todo';
import {EmptyList} from './EmptyList';
import {AdditionPane} from './AdditionPane';
import {collection, onSnapshot, query} from 'firebase/firestore';
import {db} from '../../firebase';
import {TodoType} from '../../types/shared';
import {Title} from '../Title';
import {Modal} from '../Modal';
import {Button} from '../Button';
import s from './style.module.scss';

export const Todolist = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [isModal, setIsModal] = useState<boolean>(false);

    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsub = onSnapshot(q, (querySnapshot) => {
            let todosArray: any[] = []
            querySnapshot.forEach((doc) => {
                todosArray.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArray)
        })
        return () => unsub()
    }, [])

    const openModalHandler = () => {
        setIsModal(true)
    }

    const closeModalHandler = () => {
        setIsModal(false)
    }

    return (
        <div className={s.container}>
            <Title/>
            <Button onClick={openModalHandler}>Добавить</Button>
            <div className={s.todolist}>
                {todos.length
                    ? todos.map(t => <Todo key={t.id} todo={t}/>)
                    : <EmptyList/>}
            </div>
            <Modal visibility={isModal} closeModal={closeModalHandler}>
                <AdditionPane/>
            </Modal>
        </div>
    );
};



