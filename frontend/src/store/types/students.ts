import { Dayjs } from "dayjs";

export interface IStudent {
    name: string,
    surname: string,
    lastname: string,
    birthday: string,
    studyStart: string,
    faculty: string,
    id: string,
    updatedAt: string,
    createdAt: string,
}

export interface IStudentTable extends IStudent {
    key: string,
}

export interface IFormCreateStudent {
    name: string,
    surname: string,
    lastname: string,
    birthday: Dayjs,
    studyStart: string,
    faculty: string,
}

export interface ICreateStudent {
    name: string,
    surname: string,
    lastname: string,
    birthday: string,
    studyStart: string,
    faculty: string,
}