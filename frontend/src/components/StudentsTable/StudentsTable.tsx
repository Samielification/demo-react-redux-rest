import { useState } from 'react'
import Table, { ColumnsType } from 'antd/es/table'
import { Button, Modal, Row } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useAppDispatch, useAppSelector } from '../..'
import { IStudentTable } from '../../store/types/students'
import { mapStudentsToTable } from '../../store/utils/mappers'
import { loadingStatusCodes } from '../../store/types/http'
import { END_MONTH_EDUCATION, YEARS_OF_EDUCATION } from '../../store/consts/students'
import { fetchLoadStudents, fetchRemovedStudent } from '../../store/slices/students'

export const StudentsTable = () => {

    const dispatch = useAppDispatch();
    const { students, studentsLoadingStatus } = useAppSelector(state => state.student)

    const [ removedStudent, setRemovedStudent ] = useState<IStudentTable | undefined>(undefined) 

    const columns: ColumnsType<IStudentTable> = [
        {
            title: 'Фамилия',
            dataIndex: 'lastname',
            key: 'lastname'
        },
        {
            title: 'Имя',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Отчество',
            dataIndex: 'surname',
            key: 'surname'
        },
        {
            title: 'Факультет',
            dataIndex: 'faculty',
            key: 'faculty'
        },
        {
            title: 'Дата рождения и возраст',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (value: any, record: IStudentTable) => {
                return(
                    <span>{`${formatDate(new Date(record.birthday))} (${age(new Date(record.birthday))} лет)`}</span>
                )
            }
        },
        {
            title: 'Годы обучения и номер курса',
            dataIndex: 'studyStart',
            key: 'studyStart',
            render: (value: any, record: IStudentTable) => {
                return(
                    <span>{`${record.studyStart}-${Number(record.studyStart) + YEARS_OF_EDUCATION} (${getCourseStr(record.studyStart)})`}</span>
                )
            }
        },
        {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (value: any, record: IStudentTable) => {
                return(
                    <Button
                        type='ghost'
                        icon={<DeleteOutlined style={{color:'red'}} />}
                        onClick={() => setRemovedStudent(record)}
                    />
                )
            }
        },
    ]

    const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
    }
      
    const age = (date: Date) => {
        const diff = Date.now() - date.getTime();
        return Math.floor(diff / 31557600000);
    }

    const getCourseStr = (studyStart: string) => {
        const endYear = Number(studyStart) + YEARS_OF_EDUCATION;
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        if (month <= END_MONTH_EDUCATION && year >= endYear) {
            return 'закончил';
        } else {
            return `${year - Number(studyStart) + 1} курс`;
        }
    }

    const handleDeleteStudent = (removedStudent: IStudentTable | undefined) => {
        if (removedStudent) {
            dispatch(fetchRemovedStudent(removedStudent.id)).then(() => {
                dispatch(fetchLoadStudents())
                setRemovedStudent(undefined)
            })
        }
    }

    return(
        <div>
            <Table
                columns={columns}
                dataSource={mapStudentsToTable(students)}
                pagination={false}
                size='small'
                loading={studentsLoadingStatus === loadingStatusCodes.pending}
            />
            <Modal 
                title='Удаление студента'
                open={!!removedStudent}
                footer={false}
                onCancel={() => setRemovedStudent(undefined)}
                centered
            >
                <Row>
                    {`Вы действительно хотите удалить студента ${removedStudent?.lastname} ${removedStudent?.name} ${removedStudent?.surname}?`}
                </Row>
                <Row justify={'end'} style={{marginTop: 15}}>
                    <Button
                        key='1'
                        type='primary'
                        htmlType='submit'
                        style={{marginRight: 10}}
                        onClick={() => handleDeleteStudent(removedStudent)}
                        danger
                    >
                        Удалить
                    </Button>
                    <Button key='2' onClick={() => setRemovedStudent(undefined)}>
                        Отменить
                    </Button>
                </Row>
            </Modal>
        </div>
    )
}

