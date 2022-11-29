import React, {DetailedHTMLProps, FC, InputHTMLAttributes} from 'react';
import s from './style.module.scss';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextField: FC<Props> = ({...rest}) => {
    return (
        <input className={s.input} {...rest}/>
    );
};

