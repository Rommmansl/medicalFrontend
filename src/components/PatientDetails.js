import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PatientDetails() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatient();
  }, [id]);

  const fetchPatient = async () => {
    try {
      const response = await axios.get(`/patients/${id}`);
      setPatient(response.data);
      setFormData({
        surname: response.data.surname,
        name: response.data.name,
        patronymic: response.data.patronymic,
        birth_date: response.data.birth_date.split('T')[0]
      });
    } catch (error) {
      console.error('Error fetching patient:', error);
      toast.error('Ошибка при загрузке данных пациента');
      navigate('/patients');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/patients/${id}`, formData);
      toast.success('Данные пациента обновлены');
      setEditing(false);
      fetchPatient();
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Ошибка при обновлении данных');
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
        {!editing && (
          <button onClick={() => setEditing(true)} className="edit-btn">
            Редактировать
          </button>
        )}
      </div>

      {editing ? (
        <form onSubmit={handleUpdate} className="details-form">
          <div className="form-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Дата рождения</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => setEditing(false)} className="btn-secondary">
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      ) : (
        <div className="patient-info">
          <div className="info-group">
            <label>Фамилия:</label>
            <p>{patient.surname}</p>
          </div>
          <div className="info-group">
            <label>Имя:</label>
            <p>{patient.name}</p>
          </div>
          <div className="info-group">
            <label>Отчество:</label>
            <p>{patient.patronymic}</p>
          </div>
          <div className="info-group">
            <label>Дата рождения:</label>
            <p>{new Date(patient.birth_date).toLocaleDateString()}</p>
          </div>
          <div className="info-group">
            <label>Дата создания записи:</label>
            <p>{new Date(patient.created_at).toLocaleString()}</p>
          </div>
          <div className="info-group">
            <label>Последнее обновление:</label>
            <p>{new Date(patient.updated_at).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDetails;