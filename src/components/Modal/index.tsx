import React, {FC} from 'react';
import s from './style.module.scss';

type Props = {
    children?: React.ReactNode
    visibility: boolean
    closeModal: () => void
}

export const Modal: FC<Props> = props => {
    const {children, visibility, closeModal} = props

    if (!visibility) return null

    return (
        <div className={s.modal} onClick={closeModal}>
            <div className={s.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

