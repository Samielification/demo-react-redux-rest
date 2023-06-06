import { IStudent, IStudentTable } from "../types/students";

export const mapStudentsToTable = (students:IStudent[]):IStudentTable[] => {
    return students.map(item => {
        return {...item, key: item.id}
    })
}