import styles from "./uploadedFoto.module.scss"
import Image from 'next/image';
import {GET_USER} from "@/apollo/queries/getUser";
import {useParams} from "next/navigation";
import {useQuery} from "@apollo/client";
import React from "react";

export const UploadedFoto = () => {

    const params = useParams()
    const userId = parseInt(params.userId as string, 10);

    const {data, loading} = useQuery(GET_USER, {variables: {id: userId}});
    const avatars = data?.getUser?.profile?.avatars || [];

    const userAvatars = Array.isArray(avatars) ? avatars : [avatars].filter(Boolean);

    if (userAvatars.length === 0) {
        return (
            <div className={styles.noData}>
                This user does not have photos
            </div>
        );
    }

    const rows = [];
    for (let i = 0; i < userAvatars?.length; i += 6) {
        rows.push(userAvatars.slice(i, i + 6));
    }

    if(loading){
        return <div>Loading photos...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.gridContainer}>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {row.map((avatar, index) => (
                            <div key={`${rowIndex}-${index}`} className={styles.imageCell}>
                                {avatar?.url && <Image src={avatar.url} width={180} height={180} alt=""/>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

