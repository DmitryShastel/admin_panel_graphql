'use client'
import {UsersList} from "@/features/UsersList/UsersList";
import {RadixModal} from "@/common/components/Modal/RadixModal";
import {DeleteUserModal} from "@/features/UsersList/ManagementUserAction/DeleteUser/DeleteUserModal";

const Page = () => {
    return (
        <>
            <UsersList/>
            {/*<DeleteUserModal/>*/}
        </>
    );
};

export default Page;