import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PatientList({ onLogout }) {
  const [patients, setPatients] = useState([]);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      toast.error('Ошибка при загрузке списка пациентов');
      if (error.response?.status === 401) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пациента?')) {
      try {
        await axios.delete(`/patients/${id}`);
        setPatients(patients.filter(p => p.id !== id));
        toast.success('Пациент удален');
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Ошибка при удалении пациента');
      }
    }
  };

  const filteredPatients = patients

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="patient-list-container">
      <div className="header">
        <h1 style={{marginBottom: 'auto'}}    >Реестр пациентов</h1>
        <div  className="card-buttons" >
          <button 
          onClick={() => navigate(`/AdminPanel`)} 
          className="btn-primary" 
          style={JSON.parse(localStorage.getItem('user')).role === 'admin' ? displayVisible : displayInvisible}>Панель администратора</button>
          <button onClick={onLogout} className="logout-btn">Выйти</button>
        </div>
      </div>

      <div className="actions">
        <Link to="/patients/new" className="btn-primary">
          Создать новый документ реестра
        </Link>
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredPatients.length === 0 ? (
        <p className="no-patients">Нет пациентов в реестре</p>
      ) : (
        <div className="patient-grid">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="patient-card">
              <h3>{patient.surname} {patient.name} {patient.patronymic}</h3>
              <p>Дата рождения: {new Date(patient.birth_date).toLocaleDateString()}</p>
              <p>Добавлен: {new Date(patient.created_at).toLocaleDateString()}</p>
              <div className="card-actions">
                <button onClick={() => navigate(`/patients/${patient.id}`)}>
                  Просмотр
                </button>
                <button onClick={() => handleDelete(patient.id)} className="delete-btn">
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const displayVisible = {
  display: ''
};

const displayInvisible = {
  display: 'none'
};

export default PatientList;