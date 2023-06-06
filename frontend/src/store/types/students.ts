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