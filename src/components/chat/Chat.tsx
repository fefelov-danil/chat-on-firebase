import React, {useEffect, useRef, useState} from 'react';
import s from './Chat.module.css'
import {InputText} from "common/inputText/InputText";
import {Button} from "common/button/Button";
import {useAppDispatch, useAppSelector} from "utils/hooks";
import {fetchMessages, newMessage} from "bll/reducers/chat-reducer";

export const Chat = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.chat.user)
  const messages = useAppSelector(state => state.chat.messages)
  const [value, setValue] = useState('')

  const afterMessages = useRef<null | HTMLDivElement>(null)

  const sendMessage = async () => {
    await dispatch(newMessage({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value
    }))

    await dispatch(fetchMessages())

    afterMessages && afterMessages.current?.scrollIntoView(true)

    setValue('')
  }

  useEffect(() => {
    dispatch(fetchMessages())
    afterMessages && afterMessages.current?.scrollIntoView(true)
  }, [])

  // if (loading) {
  //   return <div className={'circularProgress'}><CircularProgress/></div>
  // }

  return (
    <div className={s.chat}>
      <div className={s.chatContainer}>
        <div className={s.messages}>
          <div className={s.messagesContainer}>
            {messages.map((m: any, i: number) =>
              <div className={s.message} key={i}>
                <img src={m.photoURL} alt={''}/>
                <div>
                  <p className={s.name}>{m.displayName}</p>
                  <p className={s.text}>{m.text}</p>
                </div>
              </div>
            )}
            <div ref={afterMessages}></div>
          </div>
        </div>
        <div className={s.form}>
          <InputText
            className={s.inp}
            value={value}
            onChangeText={(value: string) => setValue(value)}
            placeholder={'Сообщение...'}
            onEnter={sendMessage}/>
          <Button className={s.btn} onClick={sendMessage}>Отправить</Button>
        </div>
      </div>
    </div>
  );
};