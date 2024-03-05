import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Box, background } from "@chakra-ui/react";
import { LiveProvider, LivePreview, LiveError } from "react-live";
import parse from 'html-react-parser';
import axios from 'axios';
import Aside from "./Aside";
import Header from "./Header";
import Cookies from "js-cookie";
import { Marked, marked } from "marked";
import './assets/styles/readme.css'


export default function Dashboard() {

    const [value, setValue] = useState('')
    const [nameFile, setNameFile] = useState('')
    const [userFiles, setUserFiles] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [activePage, setActivePage] = useState('')
    const [updateCounter, setUpdateCounter] = useState(0);
    const [folderName, setFolderName] = useState('')
    const [extension, setExtension] = useState('')

    const token = Cookies.get('token')


    useEffect(() => {
        getFiles()
        getFileValue
    }, [isLoading]);


    useEffect(() => {
        let name = nameFile.split('.')
        if (String(name[1]).toLowerCase() == 'md') {
            name[1] = 'Markdown'
        }
        if (name[1] == undefined) {
            name[1] == name[0]
        }
        if (nameFile !== '') {
            setExtension(String(name[1]).toLowerCase())
        }
    }, [nameFile]);

    function getFiles() {
        if (token) {
            axios.get('http://localhost:5000/api/readfolder', {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            })
                .then(response => {
                    setUserFiles(response.data.userFolderFiles);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setError(error.response);
                    setIsLoading(false);
                });
        } else {
            console.log("Token not found");
            setIsLoading(false);
        }
    }

    function getFileValue(item) {
        setIsLoading(true);
        if (token) {
            setActivePage('http://localhost:5000/userfolders/' + item)
            axios.get('http://localhost:5000/userfolders/', {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            })
            axios.get('http://localhost:5000/userfolders/' + item, {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            })
                .then(response => {
                    setValue(String(response.data));
                    setNameFile(item)

                    console.log(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    setIsLoading(false);
                });
        } else {
            console.log("Token not found");
            setIsLoading(false);
        }
    }













    const postFile = async (nameFile, fileContent) => {
        console.log(nameFile);
        console.log(token);
        try {
            setIsLoading(true)
            // Получаем содержимое файла из состояния value
            // const fileContent = value;

            // Отправляем POST запрос
            const response = await axios.post('http://localhost:5000/api/uploadfile', {
                // Добавляем имя файла и его содержимое
                filename: nameFile,
                filecontent: fileContent
            }, {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            });
            console.log('File uploaded successfully:', response.data);
            setIsLoading(true)
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false)
        }
    };







    useEffect(() => {
        // Увеличиваем счетчик обновлений, чтобы изменить ключ компонента <iframe>
        setUpdateCounter(prevCounter => prevCounter + 1);
        postFile(nameFile, value)
    }, [value]);


    console.log(extension);








    return <div className="h-screen overflow-hidden">

        <Header nameFile={nameFile} postFile={postFile} setIsLoading={setIsLoading} />
        <div className="flex w-full h-100% bg-bg-black">

            <div className="w-10%">

                <Aside getFileValue={getFileValue} userFiles={userFiles} getFiles={getFiles} postFile={postFile} />
                {/* <input value={folderName} onChange={e => setFolderName(e.target.value)} placeholder="Имя создаваемой папки" type="text" />  */}
            </div>
            <div className="w-40%  bg-slate-400">
                <Editor
                    className="w-full"
                    theme="vs-dark"
                    // defaultLanguage=
                    language={extension}
                    value={value}
                    onChange={(value) => setValue(value)}
                />
            </div>
            <div className="readme list-disc  *:py-2 h-m">

                {extension == 'markdown'? parse(marked.parse(value)) : <iframe className="bg-white" height={'100%'} width={'100%'} key={updateCounter} src={activePage}></iframe>}
            </div>
        </div>
    </div>
}


