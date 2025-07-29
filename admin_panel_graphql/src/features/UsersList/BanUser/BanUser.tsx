'use client'
import {RadixModal} from "@/common/components/Modal/RadixModal";
import s from "./banUser.module.scss";
import {Select} from "@/common/components/Select/Select";
import {useState} from "react";

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const BanUser = ({open, onClose, userId}: Props) => {
    const [value, setValue] = useState('')

    const options = [
        {label: 'Bad behavior', value: 'Bad behavior'},
        {label: 'Advertising placement', value: 'Advertising placement'},
        {label: 'Another reason', value: 'Another reason'},
    ]

    const handelChange = (e: any) => {
        setValue(e.target.value)
    }
    return (
        <RadixModal open={true} onClose={onClose} modalTitle={'Ban user'}>
            <div className={s.container}>
                <div className={s.description}>
                    Are you sure to ban this user, name ?
                </div>
                <div className={s.select}>
                    <Select onChangeCallback={handelChange} value={value} options={options} />
                </div>
                <div className={s.buttons}>
                    <button onClick={() => {}}>No</button>
                    <button onClick={onClose}>Yes</button>
                </div>
            </div>
        </RadixModal>
    );
};
