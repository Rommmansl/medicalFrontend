import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function GirlsPassportDetail() {

const location = useLocation();
const passedData = location.state;
const [formData, setFormData] = useState({
        ... passedData.patient,
        birth_date: passedData.patient.birth_date ? passedData.patient.birth_date.split('T')[0] : null,
        polis_date: passedData.patient.polis_date ? passedData.patient.polis_date.split('T')[0] : null,
        type: 'GirlsPassportDetail',
        surname: passedData.patient.surname ? passedData.patient.surname : '',
        name: passedData.patient.name ? passedData.patient.name : '',
        patronymic: passedData.patient.patronymic ? passedData.patient.patronymic : '',
        index: passedData.patient.index ? passedData.patient.index : '',
        phone: passedData.patient.phone ? passedData.patient.phone : '',
        polis_index: passedData.patient.polis_index ? passedData.patient.polis_index : '',
        polis_company: passedData.patient.polis_company ? passedData.patient.polis_company : ''
    }
);
const navigate = useNavigate();
const { id } = useParams();

const handleChange = (e) => {
    setFormData({
    ...formData,
    [e.target.name]: e.target.value
    });
};

const handleChangeCheckT = (element, name) => {
    const array = formData
    array[name] = element
    setFormData({
        ...array
    });
};

const handleSubmit = async (e) => {
    try {
    await axios.put(`/patients/${id}`, formData);
    toast.success('Данные пациента обновлены');
    } catch (error) {
    console.error('Error updating patient:', error);
    toast.error('Ошибка при обновлении данных');
    }
};
    const handleChangeCheck = (e3) => { 
        setFormData({
            ...formData,
            social_status: parseInt(e3.target.value)
        });
    }

return (
    <div className="data-container">
        <div className="data-card">
            <h2>Паспортные данные девочек</h2>
            <form onSubmit={handleSubmit}>
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
                <div className="form-group">
                    <label>Почтовый адрес с индексом</label>
                    <input
                    type="text"
                    name="index"
                    value={formData.index}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Контактный телефон</label>
                    <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Полис обязательного медицинского страхования</label>
                </div>
                
                <div className="form-group">
                    <label>Серия</label>
                    <input
                    type="text"
                    name="polis_index"
                    value={formData.polis_index}
                    onChange={handleChange}
                    className="policy-input"
                    maxLength={6}
                    />
                </div>

                <div className="form-group">
                    <label>Страховая компания</label>
                    <input
                    type="text"
                    name="polis_company"
                    value={formData.polis_company}
                    onChange={handleChange}
                    className="policy-input"
                    />
                </div>

                <div className="form-group">
                    <label>Дата выдачи</label>
                    <input
                    type="date"
                    name="polis_date"
                    value={formData.polis_date}
                    onChange={handleChange}
                    className="policy-input"
                    />
                </div>
                <div className="form-group">
                    <label>Социальный статус:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="организованный - дошкольник, школьник, студент" 
                                checked={formData?.social_status=== 1} 
                                onChange={() => handleChangeCheckT(1, 'social_status')}
                                />
                                Организованный - дошкольник, школьник, студент<br/>
                                <input 
                                type="radio" 
                                value="неорганизованный - домашнее воспитание, беспризорный" 
                                checked={formData?.social_status === 2} 
                                onChange={() => handleChangeCheckT(2, 'social_status')}
                                />
                                Неорганизованный - домашнее воспитание, беспризорный<br/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Особые отметки</label>
                    <input
                    type="text"
                    name="social_status_text"
                    value={formData.social_status_text}
                    onChange={handleChange}
                    className="policy-input"
                    />
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate(`/patients/${id}`)} className="btn-secondary">
                    Отмена
                    </button>
                    <button type="submit" className="btn-primary" onClick={() => {
                        handleSubmit()
                        navigate(`/patients/${id}`)
                    }}>
                    Сохранить
                    </button>
                </div>
            </form>
        </div>
    </div>
);
}

export default GirlsPassportDetail;