import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AdminPanel({ onLogout }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/patientsExpect');
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

  const updatePatient = async (patient) => {
    try {
      const response = await axios.put(`/users/${patient.id}`);
      patients.forEach(object => {
        if(object.id === patient.id) {
          object.active = true
        }
      })
      setPatients([ ...patients ]
    );
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

  const filteredPatients = patients

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="patient-list-container">
      <div className="header">
        <h1 style={{marginBottom: 'auto'}}    >Реестр пользователей</h1>
        <div  className="card-buttons" >
          <button onClick={() => navigate(`/patients`)} className="btn-primary">Назад</button>
        </div>
      </div>
      {filteredPatients.length === 0 ? (
        <p className="no-patients">Нет пользователей в реестре</p>
      ) : (
        <div className="patient-grid">
          {filteredPatients.map(patient => (
            <div key={patient.id} className="patient-card">
              <p>Почта: {patient.email}</p>
                <div className="card-actions">
                  <button 
                      onClick={() => updatePatient(patient)}
                      disabled={patient.active}>
                      Подтвердить аккаунт
                    </button>
                </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminPanel;