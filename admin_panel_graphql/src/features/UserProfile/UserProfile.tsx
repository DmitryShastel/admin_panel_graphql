import Image from 'next/image';
import style from "./userProfile.module.scss"
import arrowBackOutline from "@/assets/svg/arrowBackOutline.svg";
import Link from "next/link";
import {GET_USER} from "@/apollo/user";
import {useQuery} from "@apollo/client";
import {useParams} from "next/navigation";
import {Tabs} from "@/common/components/Tabs/Tabs";


export const UserProfile = () => {
    const params = useParams()
    const userId = parseInt(params.userId as string, 10);

    const {data, loading} = useQuery(GET_USER, {variables: {id: userId}});
    const userName = data?.getUser?.userName
    const userEmail = data?.getUser?.email
    const createdAt = data?.getUser?.createdAt
    const userAvatar = data?.getUser?.profile?.avatars[0]?.url

    const tabs = [
        {
            id: 'uploadedPhotos',
            label: 'Uploaded photos',
        },
        {
            id: 'Payments',
            label: 'Payments',
        },
        {
            id: 'Followers',
            label: 'Followers',
        },
        {
            id: 'Following',
            label: 'Following',
        },
    ];


    return (
        <div className={style.container}>
            <div className={style.userProfileInfo}>
                <div className={style.backUserList}>
                    <Link className={style.link} href={'/usersList'}>
                        <Image src={arrowBackOutline} width={24} height={24} alt=""/>
                        <span>Back to User List</span>
                    </Link>
                </div>
                <div className={style.userLink}>
                    {userAvatar
                        ? <Image className={style.roundedIcon} src={userAvatar}  width={60} height={60} alt=""/>
                        : <Image className={style.roundedIcon} src={''}  width={60} height={60} alt=""/>
                    }

                    <div className={style.userLinkText}>
                    <h1>{userName}</h1>
                    {/*<Link className={style.link} href={'/usersList'}>*/}
                        <span>{userEmail}</span>
                    {/*</Link>*/}
                    </div>
                </div>
                <div className={style.userData}>
                    <div className={style.userId}>
                        <p>UserId</p>
                        <span>{userId}</span>
                    </div>
                    <div className={style.userCreate}>
                        <p>Profile Creation Date</p>
                        <span>{createdAt}</span>
                    </div>
                </div>
            </div>
            <div className={style.tabs}>
                <Tabs tabs={tabs} defaultTabId="uploadedPhotos" />
            </div>
        </div>
    );
};

