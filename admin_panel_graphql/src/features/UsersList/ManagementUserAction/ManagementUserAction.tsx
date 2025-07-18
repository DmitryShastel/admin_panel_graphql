import styles from "./userManagementAction.module.scss"
import personRemoveOutline from "@/assets/svg/personRemoveOutline.svg";
import moreHorizontalOutline from "@/assets/svg/moreHorizontalOutline.svg";
import block from "@/assets/svg/block.svg";
import Image from 'next/image';
import Link from "next/link";

type Props = {
    openDeleteModal: () => void
    userId: number | string | null;
}

export const ManagementUserAction = ({openDeleteModal, userId}: Props) => {


    return (
        <div className={styles.container}>
            <div className={styles.deleteUser}>
                <Image src={personRemoveOutline} width={24} height={24} alt=""/>
                <button onClick={() => openDeleteModal()}>Delete User</button>
            </div>
            <div className={styles.banUser}>
                <Image src={block} width={24} height={24} alt=""/>
                <button>Ban in the system</button>
            </div>
            <div className={styles.moreInformation}>
                <Image src={moreHorizontalOutline} width={24} height={24} alt=""/>
                <Link href={`/usersList/${userId}`}>
                    <button>More Information</button>
                </Link>
            </div>
        </div>
    );
};
