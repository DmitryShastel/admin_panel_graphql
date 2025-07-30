'use client'
import {RadixModal} from "@/common/components/Modal/RadixModal";
import s from "./banUser.module.scss";
import {Select} from "@/common/components/Select/Select";
import {useState} from "react";
import {GET_USERS} from "@/apollo/queries/getUser";
import {useMutation, useQuery} from "@apollo/client";
import {BAN_USER} from "@/apollo/mutation/banUser";

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const BanUser = ({open, onClose, userId}: Props) => {
    const [banUserMutation] = useMutation(BAN_USER, {
        refetchQueries: [
            { query: GET_USERS, variables: { pageSize: 100 } }
        ],
    });
    const [value, setValue] = useState('')

    const {data} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const userName = data?.getUsers?.users.find(user => user.id === userId)?.userName || 'this use'

    const handleBan = async () => {
        if (!userId || !value) return;

        try {
            const { data } = await banUserMutation({
                variables: {
                    userId: Number(userId),
                    banReason: value
                },
            });
            onClose()
        } catch (error) {
            console.error("Error banning user:", error);
        }
    };

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
                    <button onClick={handleBan}>Yes</button>
                </div>
            </div>
        </RadixModal>
    );
};
