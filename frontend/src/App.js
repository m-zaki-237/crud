import {Routes,  Route} from 'react-router-dom'
import User from './components/User';
import Create from './components/Create';
import Edit from './components/Edit';
import {Toaster} from 'react-hot-toast'
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<User/>}/>
      <Route path='/add-user' element={<Create/>}/>
      <Route path='/edit-user/:id' element={<Edit/>}/>
    </Routes>
    <Toaster/>
    </>
  );
}

export default App;
