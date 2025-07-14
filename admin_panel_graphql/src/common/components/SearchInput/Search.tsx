'use client'
import React from "react";
import styles from "./search.module.scss"
import searchOutline from "../../../assets/svg/searchOutline.svg"
import Image from 'next/image';

type Props = {
    title?: string
    value: string | number
    callBack: (e: React.ChangeEvent<HTMLInputElement>) => void
    type?: string
    img: string
}

export const SearchInput = ({title, value, callBack}: Props) => {

    return (
        <div className={styles.inputContainer}>
            <div className={styles.searchIcon}>
                <Image src={searchOutline} width={24} height={24} alt="Search Icon"/>
            </div>
            <input
                type='text'
                value={value}
                onChange={callBack}
                placeholder={title}
                className={styles.input}
            />
        </div>
    );
};