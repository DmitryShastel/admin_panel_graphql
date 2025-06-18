import {TempLoggedPage} from "@/features/TempLoggedPage/TempLoggedPage";
import {SearchInput} from "@/common/components/SearchInput/Search";
import {UsersList} from "@/features/UsersList/UsersList";

const Page = () => {
    return (
        <div>
            {/*<TempLoggedPage/>*/}
            <UsersList/>
        </div>
    );
};

export default Page