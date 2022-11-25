import React from 'react';
import IconLeaf from '../../assets/svgs/leaf.svg';
import './style.scss';

export const EmptyList = () => {
    return (
        <div className={'empty-list'}>
            <img className={'empty-list__icon'} src={IconLeaf} alt="leaf"/>
            <div className={'empty-list__title'}>Список дел пуст</div>
        </div>
    );
};

