import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faFile, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBars, faFolderPlus, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"




export default function Header(props) {
    const [folderName, setFolderName] = useState('')
    const token = Cookies.get('token')

    const [user, setUser] = useState([])


    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            })
                .then(response => {
                    setUser(response.data.user);
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
    }, [])



    let logout = () => {
        Cookies.remove('token')
        window.location.replace("/")
    }






    const createFolder = async (item) => {
        props.setIsLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/api/createfolder/', {
                folder: item
            }, {
                headers: {
                    Authorization: token
                },
                withCredentials: true,

            });
            props.setIsLoading(false)
            console.log('File uploaded successfully:', response.data);
            getFiles()
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    }
    console.log(user);

    return (
        <>
            <header className="">
                <div className="flex bg-header-black text-white justify-between">
                    <div className="flex">
                        <FontAwesomeIcon icon={faBars} className="p-5 bg-grey" />
                        <h1 className="my-auto px-3 py-1 uppercase font-cabin tracking-widest border-r-2 border-text-grey">Markdown</h1>
                        <div className="flex my-auto">
                            <FontAwesomeIcon className="my-auto mx-4" icon={faFile} />
                            <div className="flex-col flex text-xs">
                                <span className="text-text-grey">Вы редактируете</span>
                                <span>{props.nameFile}</span>
                            </div>
                        </div>
                    </div>
                    <div className="my-auto flex">

                        <div className="flex flex-col text-right">
                            <span className="text-text-grey text-sm">{user.name}</span>
                            <span className="text-text-grey text-sm">{user.email}</span>
                        </div>
                        <FontAwesomeIcon onClick={() => logout()} className="mx-4 bg-text-grey p-2 rounded-full m-auto" icon={faUser} />
                    </div>
                </div>
                <div className="bg-grey text-text-grey flex ">
                    <div className="text-white flex w-50%">
                        <div className="my-auto w-20%  transition-all">
                            <Popover>
                                <PopoverTrigger><FontAwesomeIcon className="my-auto ml-2 mr-3 text-right cursor-pointer" icon={faFolderPlus} /></PopoverTrigger>
                                <PopoverContent><input
                                    className="bg-bg-black focus-visible:ring"
                                    placeholder="введите имя папки"
                                    type="text"
                                    value={folderName}
                                    // autoFocus
                                    onChange={(e) => setFolderName(e.target.value)}
                                    onBlurCapture={() => {
                                        createFolder(folderName)
                                        setFolderName('')
                                    }}
                                /></PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger><FontAwesomeIcon className="my-auto mr-3 text-right cursor-pointer" icon={faPlus} /></PopoverTrigger>
                                <PopoverContent><input
                                    className="bg-bg-black focus-visible:ring"
                                    placeholder="введите имя файла"
                                    type="text"
                                    value={folderName}
                                    // autoFocus
                                    onChange={(e) => setFolderName(e.target.value)}
                                    onBlurCapture={() => {
                                        props.postFile(folderName, '')
                                        setFolderName('')
                                    }}
                                /></PopoverContent>
                            </Popover>
                        </div>
                        <h3 className="my-auto py-1 uppercase font-cabin text-text-grey tracking-widest">Markdown</h3>
                    </div>
                    <div className="flex w-50% justify-between">
                        <h3 className="my-auto py-1 uppercase font-cabin tracking-widest">Preview</h3>
                        <FontAwesomeIcon className="my-auto mr-3 text-right cursor-pointer" icon={faEye} />
                    </div>
                </div>
            </header>
        </>
    )
}