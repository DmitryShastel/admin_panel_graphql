import styles from "./userManagementAction.module.scss"
import personRemoveOutline from "@/assets/svg/personRemoveOutline.svg";
import moreHorizontalOutline from "@/assets/svg/moreHorizontalOutline.svg";
import block from "@/assets/svg/block.svg";
import Image from 'next/image';

export const ManagementUserAction = () => {
    return (
        <div className={styles.container}>
            <div className={styles.deleteUser}>
                <Image src={personRemoveOutline} width={24} height={24} alt=""/>
                <button>Delete User</button>
            </div>
            <div className={styles.banUser}>
                <Image src={block} width={24} height={24} alt=""/>
                <button>Ban in the system</button>
            </div>
            <div className={styles.moreInformation}>
                <Image src={moreHorizontalOutline} width={24} height={24} alt=""/>
                <button>More Information</button>
            </div>
        </div>
    );
};
