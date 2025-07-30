import {RadixModal} from "@/common/components/Modal/RadixModal";
import {useMutation, useQuery} from "@apollo/client";
import s from './unBanUser.module.scss'
import {GET_USERS} from "@/apollo/queries/getUser";
import {UN_BAN_USER} from "@/apollo/mutation/unBanUser";

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const UnBanUser = ({open, onClose, userId}: Props) => {

    const [unbanUser] = useMutation(UN_BAN_USER, {
        refetchQueries: [
            { query: GET_USERS, variables: { pageSize: 100 } }
        ],
    });

    console.log(userId)

    const {data} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const userName = data?.getUsers?.users.find(user => user.id === userId)?.userName || 'this use'

    const handleUnban = async () => {
        if (!userId) return;

        try {
            await unbanUser({
                variables: {
                    userId: Number(userId)
                }
            });
            onClose();
        } catch (error) {
            console.error("Error unbanning user:", error);
        }
    };

    return (
        <RadixModal open={open} onClose={onClose} modalTitle={'Un-Ban user'}>
            <div className={s.container}>
                <div className={s.description}>
                    Are you sure to un-ban this user, {userName} ?
                </div>
                <div className={s.buttons}>
                    <button onClick={onClose}>No</button>
                    <button onClick={handleUnban}>Yes</button>
                </div>
            </div>
        </RadixModal>
    );
};

