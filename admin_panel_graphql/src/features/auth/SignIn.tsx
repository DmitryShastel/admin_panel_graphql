'use client'
import {useForm} from 'react-hook-form';
import styles from './signIn.module.scss'
import {useEffect, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {useMutation} from '@apollo/client';
import {LOGIN_ADMIN} from "@/apollo/login";
import {useRouter} from "next/navigation";


export const SignIn = () => {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm(
        {
            defaultValues: {
                email: 'admin@gmail.com',
                password: 'admin'
            },
            mode: "onBlur"
        }
    )
    const router = useRouter()
    const [loginAdmin] = useMutation(LOGIN_ADMIN)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleLogin = async () => {
        event.preventDefault()
        try {
            const {data} = await loginAdmin({variables: {userEmail: 'admin@gmail.com', userPassword: 'admin'}})
            setIsLoggedIn(data.loginAdmin.logged)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(isLoggedIn){
            router.push('/board')
        }
    }, [isLoggedIn])

    console.log(isLoggedIn)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }


    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin}>
                <h1>Sign In</h1>
                <div>
                    <span>Email</span>
                    <input {...register('email', {
                        required: 'The email is required',
                        pattern: {
                            message: 'The email match the format example@example.com',
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        }
                    })}/>
                        {errors?.email && <p>{errors?.email?.message || 'Some error'}</p>}
                </div>
                <div>
                    <span>Password</span>
                    <input type={showPassword ? 'password' : 'text'} {...register('password', {
                        required: 'The password is required',
                        minLength: {
                            value: 5,
                            message: 'Minimum of 5 characters'
                        }
                    })}/>
                    <span onClick={togglePasswordVisibility} className={styles.span}>
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
                    {errors?.password && <p>{errors?.password?.message || 'Some error'}</p>}
                </div>
                <div>
                    <button type={'submit'}  disabled={!isValid}>Sign In</button>
                </div>
            </form>
        </div>
    );
};
