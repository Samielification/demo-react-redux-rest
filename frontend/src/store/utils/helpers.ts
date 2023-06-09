import { END_MONTH_EDUCATION, YEARS_OF_EDUCATION } from '../consts/students';
import { IStudent, IStudentStatistic } from '../types/students';


export const getCourseByYear = (studyStart: string): number | undefined => {
    const endYear = Number(studyStart) + YEARS_OF_EDUCATION;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    if (month <= END_MONTH_EDUCATION && year >= endYear) {
        return undefined;
    } else {
        return year - Number(studyStart) + 1;
    }
}

export const getStatisticByStudents = (students: IStudent[]): IStudentStatistic[] => {
    const counters: {[key: string]: number} = {};
    let count = 0;
    students.forEach(item => {
        const course = getCourseByYear(item.studyStart);
        if (!!course) {
            count++
            if (counters.hasOwnProperty(course)) {
                counters[course]++
            } else {
                counters[course] = 1
            }
        }
    })
    const studentStatistic: IStudentStatistic[] = Object.keys(counters).map(key => {
        const studentsPerCourse = counters[key]
        const course = Number(key)
        return {
            course,
            studentsPerCourse,
            percentPerCourse: (studentsPerCourse / count)*100,
        }
    })
    return studentStatistic
}
