import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-select-search/style.css"
import Login from './components/Login';
import Register from './components/Register';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import AssessmentStatus from './components/AssessmentStatus';
import AdminPanel from './components/AdminPanel';
import PatientDataList from './components/PatientDataList';
import GirlsPassportDetail from './components/GirlsPassportDetail';
import ListDiseasesOperations from './components/ListDiseasesOperations';
import Parents from './components/Parents';
import ListDiseasesOperationsGynecologica from './components/ListDiseasesOperationsGynecologica';
import IntrauterineDevelopment from './components/IntrauterineDevelopment';
import GeneralСonclusion from './components/GeneralСonclusion';
import NewbornPeriod from './components/NewbornPeriod';
import axios from 'axios';

// Настройка axios
// axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.baseURL = 'https://medicalbackend-2ami.onrender.com/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, есть ли сохраненный токен
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token, role) => {
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', JSON.stringify(role));
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    toast.success('Успешный вход!');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    toast.info('Вы вышли из системы');
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <Router>
      <div className="App">
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/patients" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/patients" /> : <Register onLogin={handleLogin} />} 
          />
          <Route 
            path="/AdminPanel" 
            element={user ? <AdminPanel to="/patients" /> : <Register onLogin={handleLogin} />} 
          />
          <Route 
            path="/patients" 
            element={user ? <PatientList onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patients/new" 
            element={user ? <PatientForm /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/patients/:id" 
            element={user ? <PatientDataList /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/girlsPassportDetail/:id" 
            element={user ? <GirlsPassportDetail /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/listDiseasesOperations/:id" 
            element={user ? <ListDiseasesOperations /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/ListDiseasesOperationsGynecologica/:id" 
            element={user ? <ListDiseasesOperationsGynecologica /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/IntrauterineDevelopment/:id" 
            element={user ? <IntrauterineDevelopment /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/NewbornPeriod/:id" 
            element={user ? <NewbornPeriod /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/Parents/:id" 
            element={user ? <Parents /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/AssessmentStatus/:id" 
            element={user ? <AssessmentStatus /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/GeneralСonclusion/:id" 
            element={user ? <GeneralСonclusion /> : <Navigate to="/login" />}
          />
          <Route 
            path="/" 
            element={<Navigate to={user ? "/patients" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;