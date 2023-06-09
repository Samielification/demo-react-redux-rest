import { END_MONTH_EDUCATION, YEARS_OF_EDUCATION } from "../consts/students";


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