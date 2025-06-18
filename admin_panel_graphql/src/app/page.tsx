import {SignIn} from "../../src/features/auth/";
import styles from "./homePage.module.scss";

export default function HomePage() {
    return (
        <div className={styles.container}>
            <SignIn/>
        </div>
    );
}
