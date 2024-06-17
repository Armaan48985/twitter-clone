'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    userId: string;
    Name: string;
    username: string;
    avatar: string;
}

const initialState: CounterState = {
    userId: '',
    Name: '',
    username: '',
    avatar: ''
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<CounterState>) => {
            state.userId = action.payload.userId;
            state.Name = action.payload.Name;
            state.username = action.payload.username;
            state.avatar = action.payload.avatar;
        },
    },
});


export const { setUserData } = counterSlice.actions;

export default counterSlice.reducer;