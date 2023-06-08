import { useEffect } from 'react';
import { useAppDispatch } from './store';
import { fetchLoadStudents } from './store/slices/students';
import { StudentsTable } from './components/StudentsTable/StudentsTable';
import { UserPanel } from './components/UserPanel/UserPanel';
import './App.css';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLoadStudents())
  }, [])

  return (
    <div className="App">
      <UserPanel/>
      <StudentsTable/>
    </div>
  );
}

export default App;
