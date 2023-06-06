import { Button, DatePicker, Form, Input, Modal, Row, Tooltip } from 'antd'
import classes from './UserPanel.module.css'
import { PlusCircleOutlined } from '@ant-design/icons'
import { useState } from 'react'


export const UserPanel = () => {
    
    const [openModalAdd, setOpenModalAdd] = useState<boolean>(false) 

    const handleClickAddStudent = () => {
        setOpenModalAdd(true)
    }

    const handleCreateStudent = (values: any) => {
        console.log('handleCreateStudent', values);
        
    }

    return(
        <div className={classes.panel}>
            <Tooltip title='Добавить студента'>
                <Button
                    type='ghost'
                    icon={<PlusCircleOutlined style={{color:'#1677ff'}} />}
                    onClick={handleClickAddStudent}
                />
            </Tooltip>
            <Modal
                title='Добавить студента'
                open={openModalAdd}
                onCancel={() => setOpenModalAdd(false)}
                centered
                footer={false}
            >
                <Form
                    name='create'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    // initialValues={}
                    onFinish={handleCreateStudent}
                    autoComplete='off'
                >
                    <Row>
                        <Form.Item
                            label='Имя'
                            name='name'
                            rules={[{ required: true, message: 'Введите имя' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Фамилия'
                            name='lastname'
                            rules={[{ required: true, message: 'Введите фамилию' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Отчество'
                            name='surname'
                            rules={[{ required: true, message: 'Введите отчество' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label='Дата рождения'
                            name='birthday'
                            rules={[{ required: true, message: 'Введите дату рождения' }]}
                        >
                            <DatePicker />
                        </Form.Item>
                        <Form.Item
                            label='Год начала обучения'
                            name='studyStart'
                            rules={[{ required: true, message: 'Введите год начала обучения' }]}
                        >
                            <Input type='number' min='2000' max='9999'/>
                        </Form.Item>
                        <Form.Item
                            label='Факультет'
                            name='faculty'
                            rules={[{ required: true, message: 'Введите факультет' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Row>
                    <Row justify={'end'} style={{marginTop: 15}}>
                        <Button
                            key='1'
                            type='primary'
                            htmlType='submit'
                            style={{marginRight: 10}}
                            onClick={() => {}}
                        >
                            Добавить
                        </Button>
                        <Button key='2' onClick={() => (setOpenModalAdd(false))}>
                            Отменить
                        </Button>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}