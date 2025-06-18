import styles from "./usersList.module.scss"
import {SearchInput} from "@/common/components/SearchInput/Search";
import Sortable from "@/common/components/Table/Table";


export const UsersList = () => {
    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
               <SearchInput/>
                {/*Не сделан*/}
                <p>Select</p>
            </div>
            <div className={styles.table}>
                <Sortable/>
            </div>
            <div className={styles.pagination}>
                <p>Pagination</p>
            </div>
        </div>
    );
};
