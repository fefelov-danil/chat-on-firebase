import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {collection, getDocs, orderBy, query} from "firebase/firestore/lite";
import {db} from "index";
import {getAuth, signOut} from "firebase/auth";

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const messagesCol = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  const messageSnapshot = await getDocs(messagesCol);
  return messageSnapshot.docs.map(doc => doc.data()) as MessageType[];
})

export const logout = createAsyncThunk('chat/logout', async () => {
  const auth = getAuth();
  try {
    await signOut(auth)
    return
  } catch (e) {
    console.log(e)
  }
})

const initialState = {
  messages: [] as MessageType[],
  user: {} as UserType,
  auth: false
}

export const sliceChatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    login(state, action: PayloadAction<UserType>) {
      state.auth = !!action.payload.email
      state.user = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.auth = false
    })
  }
})

export const chatReducer = sliceChatReducer.reducer
export const {login} = sliceChatReducer.actions

export type MessageType = {
  createdAt: {nanoseconds: number, seconds: number}
  displayName: string
  photoURL: string
  text: string
  uid: string
}
export type UserType = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}
