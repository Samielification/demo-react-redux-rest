import { useEffect } from 'react';
import { message } from 'antd';
import { useAppDispatch, useAppSelector } from './store';
import { fetchLoadStudents } from './store/slices/students';
import { StudentsTable } from './components/StudentsTable/StudentsTable';
import { UserPanel } from './components/UserPanel/UserPanel';
import './App.css';
import { loadingStatusCodes } from './store/types/http';
import { StudentsStatistics } from './components/StudentsStatistics/StudentsStatistics';

function App() {

  const dispatch = useAppDispatch()
  const { studentsLoadingStatus } = useAppSelector(state => state.students)
  const [ messageApi, contextHolder ] = message.useMessage();

  useEffect(() => {
    dispatch(fetchLoadStudents())
  }, [])

  useEffect(() => {
    if (studentsLoadingStatus === loadingStatusCodes.rejected) {
      messageApi.open({
        type: 'error',
        content: 'Ошибка загрузки списка студентов',
      });
    }
  }, [studentsLoadingStatus])

  return (
    <div className="App">
      {contextHolder}
      <StudentsStatistics />
      <UserPanel />
      <StudentsTable />
    </div>
  );
}

export default App;
