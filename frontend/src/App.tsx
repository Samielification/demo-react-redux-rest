import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchLoadStudents } from './store/slices/students';
import { useAppSelector } from '.';
import { StudentsTable } from './components/StudentsTable/StudentsTable';
import { UserPanel } from './components/UserPanel/UserPanel';
import './App.css';

function App() {

  const dispatch = useAppDispatch()
  const {students} = useAppSelector(state => state.student)

  useEffect(() => {
    dispatch(fetchLoadStudents())
  }, [])

  console.log(students);


  return (
    <div className="App">
      <UserPanel/>
      <StudentsTable/>
    </div>
  );
}

export default App;
