import React, {useContext, useEffect, useState} from 'react';
import s from './Chat.module.css'
import {Context} from "index";
import {useAuthState} from "react-firebase-hooks/auth";
import {InputText} from "common/inputText/InputText";
import {Button} from "common/button/Button";
import {CircularProgress} from "@mui/material";
import {addDoc, Timestamp, query, collection, getDocs, orderBy} from "firebase/firestore/lite";

export const Chat = () => {
    const context = useContext(Context)
    const [user, loading] = useAuthState(context.auth)
    const [value, setValue] = useState('')
    const [messages, setMessages] = useState<any>([])

    // Get a list of cities from your database
    async function getMessages(db: any) {
        const messagesCol = query(collection(db, "messages"), orderBy("createdAt", "asc"));
        const messageSnapshot = await getDocs(messagesCol);
        return messageSnapshot.docs.map(doc => doc.data());
    }

    const sendMessage = async () => {
        await addDoc(collection(context.db, "messages"), {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
            text: value,
            createdAt: Timestamp.fromDate(new Date()),
        });

        setValue('')
    }

    useEffect(() => {
        const newMessages = async () => {
            const res = await getMessages(context.db)
            setMessages(res)
        }
        newMessages()
    }, [value])

    if (loading) {
        return <div className={'circularProgress'}><CircularProgress /></div>
    }

    return (
        <div className={s.chat}>
            <div className={s.chatContainer}>
                <div className={s.messages}>
                    {messages.map((m: any, i: number) =>
                            <div className={s.message} key={i}>
                                <img src={m.photoURL} />
                                <div>
                                    <p className={s.name}>{m.displayName}</p>
                                    <p className={s.text}>{m.text}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className={s.form}>
                    <InputText
                        className={s.inp}
                        value={value}
                        onChangeText={(value: string) => setValue(value)}
                        placeholder={'Сообщение...'}/>
                    <Button className={s.btn} onClick={sendMessage}>Отправить</Button>
                </div>
            </div>
        </div>
    );
};