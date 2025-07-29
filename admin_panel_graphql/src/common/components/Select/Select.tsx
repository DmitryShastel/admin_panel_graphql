'use client'
import style from './select.module.scss'

type Options = {
    label: string
    value: string
}

type Props = {
    options: Options[]
    value: string
    onChangeCallback: (e: any) => void
}


export const Select = ({options, value, onChangeCallback}: Props) => {

    return (
        <div>
            <select
                className={style.select}
                onChange={onChangeCallback}
                value={value}
            >
                <option value="" disabled hidden>
                    Reason for ban
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </div>
    );
};

