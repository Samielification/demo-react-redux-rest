import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStudent } from '../types/students';


interface IStudentsStore {
    students: IStudent[],
}

const initialState: IStudentsStore = {
    students: []
}

const fetchLoadStudents = createAsyncThunk(
    'students/fetchLoadStudents',
    async() => {
        const { data }: { data: IStudent[] } = await axios.get('http://localhost:3000/api/students')
        return data
    },
);


const slice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchLoadStudents.fulfilled, (state, action) => {
            state.students = action.payload
        })
    },
});


const { reducer } = slice

export { reducer, fetchLoadStudents }