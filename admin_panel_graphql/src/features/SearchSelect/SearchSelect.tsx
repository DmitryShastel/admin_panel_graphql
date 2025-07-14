import styles from './searchSelect.module.scss';
import {useState} from "react";


export const SearchSelect = () => {

    const [value, setValue] = useState('0')

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <select className={styles.container} value={value} onChange={handleChange}>
                <option value="0" disabled hidden>Not selected</option>
                <option value="2">Blocked</option>
                <option value="3">Not Blocked</option>
            </select>
        </>
    );
};
