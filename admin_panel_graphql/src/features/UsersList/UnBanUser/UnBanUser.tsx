import {RadixModal} from "@/common/components/Modal/RadixModal";
import {GET_USERS} from "@/apollo/user";
import {useQuery} from "@apollo/client";
import s from './unBanUser.module.scss'

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const UnBanUser = ({open, onClose, userId}: Props) => {

    const {data} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const userName = data?.getUsers?.users.find(user => user.id === userId)?.userName || 'this use'

    return (
        <RadixModal open={true} onClose={onClose} modalTitle={'Un-Ban user'}>
            <div className={s.container}>
                <div className={s.description}>
                    Are you sure to ban this user, {userName} ?
                </div>
                <div className={s.buttons}>
                    <button onClick={onClose}>No</button>
                    <button onClick={() => {}}>Yes</button>
                </div>
            </div>
        </RadixModal>
    );
};

