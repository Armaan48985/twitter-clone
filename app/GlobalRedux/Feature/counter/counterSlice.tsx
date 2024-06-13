'use client';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CounterState {
    userId: string;
    Name: string;
    username: string;
}

const initialState: CounterState = {
    userId: '',
    Name: '',
    username: ''
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<{ userId: string, Name: string, username: string }>) => {
            state.userId = action.payload.userId;
            state.Name = action.payload.Name;
            state.username = action.payload.username;
        },
    },
});


export const { setUserData } = counterSlice.actions;

export default counterSlice.reducer;