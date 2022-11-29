import React, {FC, MouseEvent, useEffect, useState} from 'react';
import classNames from 'classnames';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import IconTick from '../../../assets/svgs/tick.svg';
import IconCross from '../../../assets/svgs/cross.svg';
import IconArrowDown from '../../../assets/svgs/arrow_down.svg';
import IconPencil from '../../../assets/svgs/pencil.svg';
import dayjs from 'dayjs';
import {TodoDate} from './TodoDate';
import {TodoDescription} from './TodoDescription';
import {TodoTitle} from './TodoTitle';
import {deleteDoc, doc, updateDoc} from 'firebase/firestore';
import {db} from '../../../firebase';
import {TodoType} from '../../../types/shared';
import {IconButton} from '../../IconButton';
import s from './style.module.scss';
import {verifyRunDateTodo} from '../../../utils/verifyRunDateTodo';

dayjs.locale('ru')

type Props = {
    todo: TodoType
}

export const Todo: FC<Props> = ({todo}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEditModeTitle, setIsEditModeTitle] = useState<boolean>(false)
    const [isTimesUp, setIsTimesUp] = useState<boolean>(false);

    useEffect(() => {
        setIsTimesUp(verifyRunDateTodo(todo.date))
    }, [todo])


    const toggleAccordionHandler = () => {
        if (!todo.completed && !isTimesUp) {
            setIsOpen(prevState => !prevState)
        }
    }

    const onDeleteHandler = async (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()
        await deleteDoc(doc(db, 'todos', id));
    }

    const onChangeStatusTodo = async (e: MouseEvent<HTMLButtonElement>, todo: TodoType) => {
        e.stopPropagation()
        await updateDoc(doc(db, 'todos', todo.id), {completed: !todo.completed})
        setIsOpen(false)
    }

    const setIsEditModeTitleHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        if (!todo.completed && !isTimesUp && !isEditModeTitle) {
            setIsEditModeTitle(true)
        }
    }

    return (
        <div className={classNames(s.todo, {[s.todo__active]: isOpen})}>
            <div className={classNames(s.todoHeader,
                {[s.todoHeader__active]: todo.completed},
                {[s.todoHeader__error]: isTimesUp})}
                 onClick={toggleAccordionHandler}>
                <div style={{display: 'flex'}}>
                    <img className={classNames(s.todoArrow)} src={IconArrowDown} alt="arrow down"/>
                    <TodoTitle
                        todo={todo}
                        editMode={isEditModeTitle}
                        closeEditMode={() => setIsEditModeTitle(false)}
                    />
                </div>
                <div className={s.todoButtons}>
                    <IconButton disabled={isEditModeTitle} onClick={(e) => setIsEditModeTitleHandler(e)}>
                        <img src={IconPencil} alt="pencil"/>
                    </IconButton>
                    <IconButton onClick={(e) => onChangeStatusTodo(e, todo)}>
                        <img src={IconTick} alt="tick"/>
                    </IconButton>
                    <IconButton onClick={(e,) => onDeleteHandler(e, todo.id)}>
                        <img src={IconCross} alt="cross"/>
                    </IconButton>
                </div>
            </div>
            <SlideDown>
                {isOpen && <div className={s.todoContent}>
                    <TodoDate todo={todo}/>
                    <TodoDescription todo={todo}/>
                </div>}
            </SlideDown>
        </div>
    );
};

