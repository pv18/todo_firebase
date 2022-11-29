import React from 'react';
import IconLeaf from '../../../assets/svgs/leaf.svg';
import s from './style.module.scss';

export const EmptyList = () => {
    return (
        <div className={s.emptyList}>
            <img className={s.emptyList__icon} src={IconLeaf} alt="leaf"/>
            <div className={s.emptyList__title}>Список дел пуст</div>
        </div>
    );
};

