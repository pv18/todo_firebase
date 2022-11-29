import React, {ButtonHTMLAttributes, DetailedHTMLProps, FC} from 'react';
import s from './style.module.scss';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button:FC<Props> = ({...rest}) => {
    return (
        <button className={s.button} {...rest}/>
    );
};

