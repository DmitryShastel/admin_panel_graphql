'use client'
import {useState} from "react";
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import style from './select.module.scss'

interface Props {
    name: string;
}

export function Select({items, children}: Props) {
    const [selectedCity, setSelectedCity] = useState<items | null>(null);

    return (
        <div className={style.container}>
                <Dropdown value={selectedCity}
                          className={style.dropdown}
                          onChange={(e: DropdownChangeEvent) => setSelectedCity(e.value)}
                          options={items}
                          optionLabel="name"
                          placeholder="Reason for ban"
                          checkmark={true}
                          highlightOnSelect={false}
                />
        </div>
    )
}


