import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateStudent, IStudent, IStudentConfig } from '../types/students';
import { ILoadingStatusCode, loadingStatusCodes } from '../types/http';


interface IStudentsStore {
    students: IStudent[],
    studentsLoadingStatus: ILoadingStatusCode,
}

const initialState: IStudentsStore = {
    students: [],
    studentsLoadingStatus: loadingStatusCodes.idle,
}

let config: IStudentConfig = {
    BASE_URL_STUDENTS: 'http://localhost:3000'
}

const fetchConfig = createAsyncThunk(
    'students/fetchConfig',
    async () => {
        const { data }: { data: IStudentConfig } = await axios.get(process.env.PUBLIC_URL + '/configStudents.json')
        return data
    },
)

const fetchLoadStudents = createAsyncThunk(
    'students/fetchLoadStudents',
    async () => {
        const { data }: { data: IStudent[] } = await axios.get(config.BASE_URL_STUDENTS + '/api/students')
        return data
    },
);

const fetchCreateStudent = createAsyncThunk(
    'students/fetchCreateStudent',
    async (studentBody: ICreateStudent) => {
        try {
            const { data }: { data: IStudent } = await axios.post(config.BASE_URL_STUDENTS + '/api/students', studentBody)
            return data
        } catch (error) {
            throw new Error()
        }
    },
);

const fetchRemovedStudent = createAsyncThunk(
    'students/fetchRemovedStudent',
    async (studentId: string) => {
        try {
            const { data }: { data: IStudent } = await axios.delete(config.BASE_URL_STUDENTS + '/api/students' + studentId)
            return data
        } catch (error) {
            throw new Error()
        }        
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
            .addCase(fetchConfig.fulfilled, (state, action) => {
                config = action.payload
            })

    },
});


const { reducer } = slice

export { reducer, fetchLoadStudents, fetchCreateStudent, fetchRemovedStudent, fetchConfig }