import {RadixModal} from "@/common/components/Modal/RadixModal";
import s from "./deleteUserModal.module.scss"
import {useMutation, useQuery} from "@apollo/client";
import {GET_USERS} from "@/apollo/queries/getUser";
import {DELETE_USER} from "@/apollo/mutation/deleteUser";

type Props = {
    open: boolean
    onClose: () => void
    userId: number | string | null;
}

export const DeleteUserModal = ({open, onClose, userId}: Props) => {
    const {data} = useQuery(GET_USERS, {variables: {pageSize: 100}});
    const userName = data?.getUsers?.users.find(user => user.id === userId)?.userName || 'this use'

    const [deleteUser, {loading}] = useMutation(DELETE_USER, {
        variables: { id: userId },
        update: (cache) => {
            cache.evict({ fieldName: "getUsers" });
            cache.gc();
        },
        onCompleted: onClose
    });

    console.log(userId)

    return (
        <RadixModal open={open} onClose={onClose} modalTitle={'Delete user'}>
            <div className={s.container}>
                <div className={s.description}>
                    Are you sure to delete user {userName}?
                </div>
                <div className={s.buttons}>
                    <button  onClick={deleteUser} disabled={loading}>Yes</button>
                    <button onClick={onClose}>No</button>
                </div>
            </div>
        </RadixModal>
    );
};
