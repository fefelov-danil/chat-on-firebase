import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addDoc, collection, getDocs, orderBy, query, Timestamp} from "firebase/firestore/lite";
import {db} from "index";
import {getAuth, signOut} from "firebase/auth";

export const fetchMessages = createAsyncThunk('chat/fetchMessages', async () => {
  const messagesCol = query(collection(db, "messages"), orderBy("createdAt", "asc"));
  const messageSnapshot = await getDocs(messagesCol);
  return messageSnapshot.docs.map(doc => doc.data()) as MessageType[];
})

export const newMessage = createAsyncThunk('chat/newMessage',
  async (param: MessageType) => {
  try {
    await addDoc(collection(db, "messages"), {
      uid: param.uid,
      displayName: param.displayName,
      photoURL: param.photoURL,
      text: param.text,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (e) {
    console.log(e)
  }
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
  auth: false,
  isLoading: false,
}

export const sliceChatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    login(state, action: PayloadAction<UserType>) {
      const auth = !!action.payload
      state.auth = auth
      if (auth) {
        state.user = action.payload
      }
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
export const {login, setLoading} = sliceChatReducer.actions

export type MessageType = {
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
