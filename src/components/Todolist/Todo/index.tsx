import React, {FC, MouseEvent, useMemo, useState} from 'react';
import classNames from 'classnames';
import {SlideDown} from 'react-slidedown';
import 'react-slidedown/lib/slidedown.css';
import IconTick from '../../../assets/svgs/tick.svg';
import IconCross from '../../../assets/svgs/cross.svg';
import IconArrowDown from '../../../assets/svgs/arrow_down.svg';
import './style.scss';
import dayjs, {Dayjs} from 'dayjs';

type Props = {
    title: string
    date: string
    description?: string
    completed: boolean
    deleteTodo: () => void
    changeStatusTodo: () => void
}

export const Todo: FC<Props> = props => {
    const {
        title,
        date,
        description = '',
        completed,
        deleteTodo,
        changeStatusTodo,
    } = props

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    const test = () => {
        const year = +dayjs(date).format('YYYY')
        const month = +dayjs(date).format('MM')
        const day = +dayjs(date).format('DD')
        const yearNow = dayjs().year()
        const monthNow = dayjs().month()
        const dayNow = dayjs().day()

        if (yearNow > year) return false
        if (yearNow === year && monthNow > month) return false
        if (yearNow === year && monthNow === month && dayNow >= day) return false

        return true
    }

    const toggleAccordionHandler = () => {
        if (!completed && !test()) {
            setIsOpen(prevState => !prevState)
        }
    }

    const onDeleteHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        deleteTodo()
    }

    const onChangeStatusTodo = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        changeStatusTodo()
    }

    return (
        <div className={classNames('todo', {
            'todo__active': isOpen
        })}>
            <div className={classNames('todo-header',
                {'todo-header__active': completed},
                {'todo-header__error': test()})}
                 onClick={toggleAccordionHandler}>
                <div>
                    <img className={classNames('todo-header-icon')} src={IconArrowDown} alt="arrow down"/>
                    <span className={'accordion-header-title'}>{title}</span>
                </div>
                <div className={'todo-buttons'}>
                    <button className={'button-action'}
                            onClick={(e) => onChangeStatusTodo(e)}>
                        <img src={IconTick} alt="tick"/>
                    </button>
                    <button className={'button-action'} onClick={(e) => onDeleteHandler(e)}>
                        <img src={IconCross} alt="cross"/>
                    </button>
                </div>
            </div>
            <SlideDown className={'todo-content-slide-down'}>
                {isOpen && <div className={'todo-content'}>
                    <p><span>дата завершения:</span> {dayjs(date).format('DD.MM.YY')}</p>
                    <p className={'todo-description'}>{description}</p>
                </div>}
            </SlideDown>
        </div>
    );
};

