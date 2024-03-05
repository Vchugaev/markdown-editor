import Cookies from "js-cookie";
import React, { useEffect } from "react";


export default function Register() {
    useEffect(() => {
        const token = Cookies.get('token')

        if (token) {
            window.location.replace("/dashboard")
        }
    }, [])



    return (

        <>
            <main className='bg-bg-black h-screen flex flex-col'>
                <h1 className="text-text-grey mt-40 text-5xl text-center ">/* РЕГИСТРАЦИЯ */</h1>
                <form className='mx-auto bg-header-black p-5 rounded-xl mt-20 animate-orangeshadow' method='POST' action="http://localhost:5000/api/register">
                    <label className='text-white text-lg ' htmlFor="">Логин:</label><br />
                    <input name="name" type="text" className='mb-3 p-1 rounded-md' /><br />
                    <label className='text-white text-lg ' htmlFor="">Email:</label><br />
                    <input name="email" type="text" className='mb-3 p-1 rounded-md' /><br />
                    <label className='text-white text-lg ' htmlFor="">Пароль:</label><br />
                    <input name="password" className='mb-3 p-1 rounded-md' type="password" /><br />
                    <input type='submit' className="py-2.5 px-14 w-full mt-8 bg-orange rounded-md text-white font-inter text-sm" />
                </form>
            </main>
        </>
    )
}