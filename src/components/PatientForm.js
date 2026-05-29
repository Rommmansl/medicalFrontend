import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function PatientForm() {
  const [formData, setFormData] = useState({
    birth_date: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.birth_date) {
      newErrors.birth_date = 'Дата рождения обязательна';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('e', e)
    console.log('formDatas', formData)
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      console.log('formData', formData)
      await axios.post('/patients', formData);
      toast.success('Пациент успешно добавлен');
      navigate('/patients');
    } catch (error) {
      console.error('Error creating patient:', error);
      toast.error('Ошибка при создании записи пациента');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Новый пациент</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Фамилия</label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className={errors.surname ? 'error' : ''}
              placeholder="Введите полное имя"
            />
            {errors.name && <span className="error-message">{errors.surname}</span>}
          </div>
          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Введите полное имя"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Отчество</label>
            <input
              type="text"
              name="patronymic"
              value={formData.patronymic}
              onChange={handleChange}
              className={errors.patronymic ? 'error' : ''}
              placeholder="Введите полное имя"
            />
            {errors.patronymic && <span className="error-message">{errors.patronymic}</span>}
          </div>

          <div className="form-group">
            <label>Дата рождения</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              className={errors.birth_date ? 'error' : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.birth_date && <span className="error-message">{errors.birth_date}</span>}
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/patients')} className="btn-secondary">
              Отмена
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;