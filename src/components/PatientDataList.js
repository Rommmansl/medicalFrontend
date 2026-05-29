import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PatientDetaList() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: ''
  });
  const [ageChild, setSelectedValue] = useState('')
  const { id } = useParams();
  const navigate = useNavigate();
  const child = [
    { id: 1, name: 'менее года' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
    { id: 5, name: '5' },
    { id: 6, name: '6' },
    { id: 7, name: '7' },
    { id: 8, name: '8' },
    { id: 9, name: '9' },
    { id: 10, name: '10' },
    { id: 11, name: '11' },
    { id: 12, name: '12' },
    { id: 13, name: '13' },
    { id: 14, name: '14' },
    { id: 15, name: '15' },
    { id: 16, name: '16' },
    { id: 17, name: '17' },
    { id: 18, name: '18' },
  ];
  
  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`/patients/${id}`);
      console.log('response', response)
      setPatient(response.data);
      setFormData({
        surname: response.data.patient.surname,
        name: response.data.patient.name,
        patronymic: response.data.patient.patronymic,
        birth_date: response.data.patient.birth_date.split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching patient:', error);
      toast.error('Ошибка при загрузке данных пациента');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  if (!patient) {
    return <div className="not-found">Пациент не найден</div>;
  }

  return (
    <div className="details-container">
      <div className="details-header">
        <button onClick={() => navigate('/patients')} className="back-btn">
          ← Назад к списку
        </button>
        <h2>Данные пациента</h2>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Паспортные данные девочек</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/girlsPassportDetail/${id}`, {
              state: {
                patient: patient.patient
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Список перенесенных заболеваний и операций</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/listDiseasesOperations/${id}`, {
              state: {
                patient: patient.patient_list_diseases
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Список перенесенных гинекологических заболеваний и операций</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/ListDiseasesOperationsGynecologica/${id}`, {
              state: {
                patient: patient.patient_list_diseases_gynecologica
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Родители</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/Parents/${id}`, {
              state: {
                patient: patient.parents
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Особенности внутриутробного развития ребенка</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/IntrauterineDevelopment/${id}`, {
              state: {
                patient: patient.patient.intrauterine_development
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Особенности периода новорожденности</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/NewbornPeriod/${id}`, {
              state: {
                patient: patient.patient.newborn_period
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Оценка состояния физического и полового развития девочки</h3>
            <div>
              <select
                value={ageChild}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="">Выберите возраст</option>
                {child.map((object) => (
                  <option key={object.id} value={object.id}>
                    {object.name}
                  </option>
                ))}
              </select>
            </div>
          <div className="card-actions">
            <button 
            onClick={() => navigate(`/AssessmentStatus/${id}`, {
                state: {
                  patient: patient.patient.development_assessments,
                  ageChild
                }
              })
            }
            disabled={!ageChild} >
              Просмотр
            </button>
          </div>
        </div>
      </div>
      <div className="patient-grid">
        <div key={patient.id} className="patient-card">
          <h3>Общее заключение по развитию и состоянию репродуктивной системы для перевода под наблюдение гинекологов взрослой сети</h3>
          <div className="card-actions">
            <button onClick={() => navigate(`/GeneralСonclusion/${id}`, {
              state: {
                patient: patient.patient.general_conclusion
              }
            })}>
              Просмотр
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientDetaList;