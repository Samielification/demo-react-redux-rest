import { useEffect, useState } from 'react';
import { Progress, Space, Typography } from 'antd'
import { IStudentStatistic } from '../../store/types/students';
import { useAppSelector } from '../..';
import { getStatisticByStudents } from '../../store/utils/helpers';

const { Text, Title } = Typography;

export const StudentsStatistics = () => {

    const { students } = useAppSelector(state => state.students)

    const [studentStatistic, setStudentStatistic] = useState<IStudentStatistic[]>([])

    useEffect(() => {       
        setStudentStatistic(getStatisticByStudents(students))        
    }, [students])
    
    return (
        <div>
            <Title style={{marginBottom: 25}} level={3}>Количество студентов на курсах:</Title>
            {studentStatistic.map(item => (
                <Space style={{marginRight: 25}} key={item.course} wrap direction='vertical'>
                    <Progress
                        size={'small'}
                        type='circle' 
                        percent={item.percentPerCourse}
                        format={() => `${item.studentsPerCourse}`}
                    />
                    <Text>{`${item.course} курс`}</Text>
                </Space>
            ))}           
        </div>
    )
}