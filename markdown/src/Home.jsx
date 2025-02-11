import React, { useEffect, useRef } from "react";
// import './index.css';
import './input.css';
import Typed from 'typed.js';
import Cookies from "js-cookie";


export default function Home() {


    const el = useRef(null);
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Яблоко', 'Банан', 'Апельсин'],
            typeSpeed: 100,
        });

        return () => {
            typed.destroy();
        };
    }, []);


    const el2 = useRef(null);
    useEffect(() => {
        const typed = new Typed(el2.current, {
            strings: ['ТЕКСТА', 'ДОКУМЕНТОВ', 'КОДА'],
            typeSpeed: 100,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const el3 = useRef(null);
    useEffect(() => {
        const typed = new Typed(el3.current, {
            strings: ['Иван', 'Владимир', 'Путин?', 'Роман'],
            typeSpeed: 100,
        });

        return () => {
            typed.destroy();
        };
    }, []);

    const el4 = useRef(null);
    useEffect(() => {
        const typed = new Typed(el4.current, {
            strings: ['name', 'username', 'user', 'userName'],
            typeSpeed: 100,
        });

        return () => {
            typed.destroy();
        };
    }, []);


    return (
        <>
            <header className="bg-header-black text-right">
                <div className="py-5">
                    <a href="/login" className="py-2.5 px-14 bg-orange rounded-md m-4 text-white font-inter text-sm" >Войти</a>
                </div>
                <h2 className="text-left bg-grey text-2xl text-text-grey font-cabin py-1 px-4">./home</h2>
            </header>
            <main className="bg-bg-black text-center h-screen">
                <div className="z-10 relative ">
                    <h1 className="text-white uppercase text-5xl pt-24">Markdown Editor</h1>
                    <h2 className="text-text-grey mt-10 text-2xl mb-20">/* РЕДАКТОР <span ref={el2}></span> */</h2>
                    <a href="/register" className="py-2.5 px-14 bg-orange rounded-md m-4 text-white font-inter text-sm mt-12" >Зарегистрироваться</a>
                </div>


                <div className="absolute top-64 left-48 bg-header-black w-20% p-2 rounded-md animate-[orangeshadow_500ms_ease-in-out_forwards] flex">
                    <div className="text-white text-left m-auto">
                        <div className="font-montserrat font-light text-lg lg:text-2xl">
                            <p>&lt;ul&gt;</p>
                            <p className="ml-8">&lt;li&gt;<span ref={el} ></span>&lt;/li&gt;</p>
                            <p className="ml-8">&lt;li&gt;Банан&lt;/li&gt;</p>
                            <p className="ml-8">&lt;li&gt;Апельсин&lt;/li&gt;</p>
                            <p>&lt;/ul&gt;</p>
                        </div>
                    </div>
                </div>


                <div className="relative top-64 ml-10% bg-header-black w-40% p-2 rounded-md animate-[orangeshadow_1s_ease-in-out_forwards] flex">
                    <div className="text-white text-left m-auto">
                        <div className="font-montserrat font-light text-lg lg:text-2xl">
                            <p>&lt;form&gt;</p>
                            <p className="ml-8">&lt;label for="<span ref={el4}>name</span>"&gt;Enter your name:&lt;label&gt;</p>
                            <p className="ml-8">&lt;input type="text" id="name" name="name"&gt;</p>
                            <p className="ml-8">&lt;button type="submit"&gt;Submit&lt;button&gt;</p>
                            <p>&lt;/form&gt;</p>
                        </div>
                    </div>
                </div>


                <div className="-z-0 absolute top-0 mt-64 mr-10% right-0 p-2 bg-header-black w-20% rounded-md animate-[orangeshadow_1500ms_ease-in-out_forwards] flex">
                    <div className="text-white text-left m-auto">
                        <div className="font-montserrat font-light text-sm lg:text-2xl">
                            <p>&lt;table border="1"&gt;</p>
                            <p className="ml-8">&lt;tr&gt;</p>
                            <p className="ml-16">&lt;th&gt;Имя&lt;/th&gt;</p>
                            <p className="ml-16">&lt;th&gt;Возраст&lt;/th&gt;</p>
                            <p className="ml-8">&lt;/tr&gt;</p>
                            <p className="ml-8">&lt;tr&gt;</p>
                            <p className="ml-16">&lt;th&gt;Анна&lt;/th&gt;</p>
                            <p className="ml-16">&lt;th&gt;25&lt;/th&gt;</p>
                            <p className="ml-8">&lt;/tr&gt;</p>
                            <p className="ml-8">&lt;tr&gt;</p>
                            <p className="ml-16">&lt;th&gt;<span ref={el3}></span>&lt;/th&gt;</p>
                            <p className="ml-16">&lt;th&gt;30&lt;/th&gt;</p>
                            <p className="ml-8">&lt;/tr&gt;</p>
                            <p>&lt;/table&gt;</p>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}