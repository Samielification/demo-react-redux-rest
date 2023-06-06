import Table, { ColumnsType } from "antd/es/table"
import { useAppSelector } from "../.."
import { IStudentTable } from "../../store/types/students"
import { mapStudentsToTable } from "../../store/utils/mappers"

export const StudentsTable = () => {

    const {students} = useAppSelector(state => state.student)

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
    ]

    const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`;
    }
      
    const age = (date: Date) => {
        const diff = Date.now() - date.getTime();
        return Math.floor(diff / 31557600000);
    }

    return(
        <div>
            <Table
                columns={columns}
                dataSource={mapStudentsToTable(students)}
                pagination={false}
                size="small"
            />
        </div>
    )
}