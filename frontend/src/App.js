import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import DealerHome from './components/DealerHome';
import DriverHome from './components/DriverHome';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route
          path="/driverhome"
          element={
            <ProtectedRoute>
              <DriverHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dealerhome"
          element={
            <ProtectedRoute>
              <DealerHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
