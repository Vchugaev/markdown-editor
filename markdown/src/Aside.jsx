import React, { useEffect, useRef, useState } from "react";
import { faChevronRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faBars, faFolderPlus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger } from "@radix-ui/react-context-menu";



export default function Aside({ getFileValue, userFiles, getFiles, postFile }) {

    const [isLoading, setIsLoading] = useState(false);
    const [folderName, setFolderName] = useState('');
    const token = Cookies.get('token')


    const createFolder = async (item) => {
        try {
            setIsLoading(true);
            const response = await axios.post('http://localhost:5000/api/createfolder/', {
                folder: item + '/' + folderName
            }, {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            });
            console.log('File uploaded successfully:', response.data);
            setIsLoading(false);
            getFiles()
        } catch (error) {
            console.error('Error uploading file:', error);
            setIsLoading(false);
        }
    }

    const deletePath = async (item) => {
        try {
            const response = await axios.post('http://localhost:5000/api/delete/', {
                path: item + '/' + folderName
            }, {
                headers: {
                    Authorization: token
                },
                withCredentials: true,
            });
            console.log(response.data);
            getFiles()
        } catch (error) {
            console.error(error);
        }
    }

    function renderFilesOrFolders(filesOrFolders, currentPath = '') {
        return (
            <ul className="ml-2 border-l-2 border-header-black text-white">
                {filesOrFolders.map((item, index) => (
                    <li className="flex flex-col" key={index}>
                        {Array.isArray(item) ? (
                            <>
                                <div className="flex w-100%">

                                    <>
                                        <FontAwesomeIcon className="scale-50 my-auto" icon={faChevronRight} />
                                        <span className="m-1">{item[0]}</span>

                                        <div className="flex my-auto w-full h-100% opacity-0 hover:opacity-100 transition-all">
                                            <Popover>
                                                <PopoverTrigger><FontAwesomeIcon className="scale-75" icon={faFolderPlus} /></PopoverTrigger>
                                                <PopoverContent><input
                                                    className="bg-bg-black focus-visible:ring"
                                                    placeholder="введите имя папки"
                                                    type="text"
                                                    value={folderName}
                                                    // autoFocus
                                                    onChange={(e) => setFolderName(e.target.value)}
                                                    onBlurCapture={() => {
                                                        createFolder(currentPath + '/' + item[0])
                                                        setFolderName('')
                                                    }}
                                                /></PopoverContent>
                                            </Popover>
                                            <Popover>
                                                <PopoverTrigger><FontAwesomeIcon className="mx-0.5 scale-75" icon={faPlus} /></PopoverTrigger>
                                                <PopoverContent><input
                                                    className="bg-bg-black focus-visible:ring"
                                                    placeholder="введите имя файла"
                                                    type="text"
                                                    value={folderName}
                                                    onChange={(e) => setFolderName(e.target.value)}
                                                    onBlurCapture={() => {
                                                        postFile(currentPath + '/' + item[0] + '/' + folderName, '')
                                                        setFolderName('')
                                                    }}
                                                /></PopoverContent>
                                            </Popover>
                                            <span onClick={() => deletePath(currentPath + '/' + item[0])} className="ml-auto mr-3 cursor-pointer"><FontAwesomeIcon className="mx-0.5 scale-75" icon={faTrash} /></span>
                                        </div>



                                    </>

                                </div>
                                {renderFilesOrFolders(item[1], currentPath + '/' + item[0])}
                            </>
                        ) : (
                            <ContextMenu className="w-full">
                                <ContextMenuTrigger className="w-full flex">
                                    <span onClick={e => getFileValue(currentPath + '/' + item)} className="p-1 w-full m-1 rounded bg-grey cursor-pointer">{item}</span>
                                </ContextMenuTrigger>
                                <ContextMenuContent>
                                    <ContextMenuItem><button onClick={() => deletePath(currentPath + '/' + item)}>Удалить</button></ContextMenuItem>
                                </ContextMenuContent>
                            </ContextMenu>
                        )}
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            {renderFilesOrFolders(userFiles)}
        </div>
    );
}
