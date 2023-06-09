import { Progress, Space, Typography } from "antd"
import { IStudentStatistic } from "../../store/types/students";
import { useAppSelector } from "../..";
import { useEffect, useState } from "react";
import { getCourseByYear } from "../../store/utils/helpers";

const studentStatistic: IStudentStatistic = {
    course: 2,
    studentsPerCourse: 4,
    percentPerCourse: 25
};
const { Text, Title } = Typography;

export const StudentsStatistics = () => {

    const { students } = useAppSelector(state => state.students)

    const [studentStatistic, setStudentStatistic] = useState<IStudentStatistic[]>([])

    useEffect(() => {
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
        console.log('studentStatistic', studentStatistic);

        setStudentStatistic(studentStatistic)        
    }, [students])
    
    return (
        <div>
            <Title style={{marginBottom: 25}} level={3}>Количество студентов на курсах:</Title>
            {studentStatistic.map(item => (
                <Space style={{marginRight: 25}} key={item.course} wrap direction="vertical">
                    <Progress
                        size={"small"}
                        type="circle" 
                        percent={item.percentPerCourse}
                        format={() => `${item.studentsPerCourse}`}
                    />
                    <Text>{`${item.course} курс`}</Text>
                </Space>
            ))}           
        </div>
    )
}