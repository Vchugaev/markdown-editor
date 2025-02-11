import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Auth() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_SERVER_API}/api/user`, {
            withCredentials: true,
        })
        .then(response => {
            setUser(response.data.user);
            console.log(response.data.user);
            window.location.replace("/dashboard"); // Редирект только если токен валиден
        })
        .catch(error => {
            console.error("Ошибка авторизации:", error);
            setError("Не удалось авторизоваться");
        })
        .finally(() => setIsLoading(false));
    
    }, []);
    




    useEffect(() => {

            axios.get(`${import.meta.env.VITE_SERVER_API}/api/user`, {

                withCredentials: true,
            })
                .then(response => {
                    setUser(response.data.user);
                    console.log(response.data.user);
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error.response.data.message);
                    setIsLoading(false);
                });

    }, []);

    return (
        <>
            <main className='bg-bg-black h-screen flex flex-col'>
                <h1 className="text-text-grey mt-40 text-5xl text-center ">/* АВТОРИЗАЦИЯ */</h1>
                <form className='mx-auto bg-header-black p-5 rounded-xl mt-20 animate-orangeshadow' method='POST' action={`${import.meta.env.VITE_SERVER_API}/api/login`}>
                    <label className='text-white text-lg ' htmlFor="">Логин или Email:</label><br />
                    <input name="email" type="text" className='mb-3 p-1 rounded-md' /><br />
                    <label className='text-white text-lg ' htmlFor="">Пароль:</label><br />
                    <input name="password" className='mb-3 p-1 rounded-md' type="text" /><br />
                    <input type='submit' className="py-2.5 px-14 w-full mt-8 bg-orange rounded-md text-white font-inter text-sm" />
                </form>
            </main>
        </>
    )
}

export default Auth;
