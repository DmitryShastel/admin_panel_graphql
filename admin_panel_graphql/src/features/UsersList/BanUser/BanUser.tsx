'use client'
import {RadixModal} from "@/common/components/Modal/RadixModal";
import s from "./banUser.module.scss";
import {Select} from "@/common/components/Select/Select";
import {useState} from "react";
import {GET_USERS} from "@/apollo/user";
import {useQuery} from "@apollo/client";

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const BanUser = ({open, onClose, userId}: Props) => {
    const [value, setValue] = useState('')

    const {data} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const userName = data?.getUsers?.users.find(user => user.id === userId)?.userName || 'this use'

    const options = [
        {label: 'Bad behavior', value: 'Bad behavior'},
        {label: 'Advertising placement', value: 'Advertising placement'},
        {label: 'Another reason', value: 'Another reason'},
    ]

    const handelChange = (e: any) => {
        setValue(e.target.value)
    }

    console.log(userId)
    return (
        <RadixModal open={open} onClose={onClose} modalTitle={'Ban user'}>
            <div className={s.container}>
                <div className={s.description}>
                    Are you sure to ban this user, {userName} ?
                </div>
                <div className={s.select}>
                    <Select onChangeCallback={handelChange} value={value} options={options} />
                </div>
                <div className={s.buttons}>
                    <button onClick={onClose}>No</button>
                    <button onClick={() => {}}>Yes</button>
                </div>
            </div>
        </RadixModal>
    );
};
