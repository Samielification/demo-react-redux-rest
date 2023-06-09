import { ICreateStudent, IFormCreateStudent, IStudent, IStudentTable } from '../types/students';

export const mapStudentsToTable = (students: IStudent[]): IStudentTable[] => {
    return students.map(item => {
        return {...item, key: item.id}
    })
}

export const mapStudentFormToDto = (student: IFormCreateStudent): ICreateStudent => {
    return {
        ...student,
        birthday: student.birthday.format('YYYY-MM-DDTHH:mm:ss.sss[Z]')
    }
}