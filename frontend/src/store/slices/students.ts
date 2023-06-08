import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateStudent, IStudent } from '../types/students';
import { ILoadingStatusCode, loadingStatusCodes } from '../types/http';


interface IStudentsStore {
    students: IStudent[],
    studentsLoadingStatus: ILoadingStatusCode,
}

const initialState: IStudentsStore = {
    students: [],
    studentsLoadingStatus: loadingStatusCodes.idle,
}

const fetchLoadStudents = createAsyncThunk(
    'students/fetchLoadStudents',
    async () => {
        const { data }: { data: IStudent[] } = await axios.get('http://localhost:3000/api/students')
        return data
    },
);

const fetchCreateStudent = createAsyncThunk(
    'students/fetchCreateStudent',
    async (studentBody: ICreateStudent) => {
        const { data }: { data: IStudent } = await axios.post('http://localhost:3000/api/students', studentBody)
        return data
    },
);

const fetchRemovedStudent = createAsyncThunk(
    'students/fetchRemovedStudent',
    async (studentId: string) => {
        const { data }: { data: IStudent } = await axios.delete('http://localhost:3000/api/students/' + studentId)
        return data
    },
);

const slice = createSlice({
    name: 'students',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchLoadStudents.pending, (state) => {
                state.studentsLoadingStatus = loadingStatusCodes.pending
            })
            .addCase(fetchLoadStudents.fulfilled, (state, action) => {
                state.students = action.payload
                state.studentsLoadingStatus = loadingStatusCodes.fulfilled
            })
            .addCase(fetchLoadStudents.rejected, (state) => {
                state.studentsLoadingStatus = loadingStatusCodes.rejected
            })
    },
});


const { reducer } = slice

export { reducer, fetchLoadStudents, fetchCreateStudent, fetchRemovedStudent }