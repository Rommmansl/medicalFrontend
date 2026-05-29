import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function ListDiseasesOperationsGynecologica() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const passedData = location.state;
    const [formData, setRows] = useState([
    { id: passedData.patient[0].id, patient_id: passedData.patient[0].patient_id, disease_group: passedData.patient[0].disease_group, label: '0-12 мес.', disease_name: passedData.patient[0].disease_name },
    { id: passedData.patient[1].id, patient_id: passedData.patient[1].patient_id, disease_group: passedData.patient[1].disease_group, label: '1 год', disease_name: passedData.patient[1].disease_name },
    { id: passedData.patient[2].id, patient_id: passedData.patient[2].patient_id, disease_group: passedData.patient[2].disease_group, label: '2 года', disease_name: passedData.patient[2].disease_name },
    { id: passedData.patient[3].id, patient_id: passedData.patient[3].patient_id, disease_group: passedData.patient[3].disease_group, label: '3 года', disease_name: passedData.patient[3].disease_name },
    { id: passedData.patient[4].id, patient_id: passedData.patient[4].patient_id, disease_group: passedData.patient[4].disease_group, label: '4 года', disease_name: passedData.patient[4].disease_name },
    { id: passedData.patient[5].id, patient_id: passedData.patient[5].patient_id, disease_group: passedData.patient[5].disease_group, label: '5 лет', disease_name: passedData.patient[5].disease_name },
    { id: passedData.patient[6].id, patient_id: passedData.patient[6].patient_id, disease_group: passedData.patient[6].disease_group, label: '6 лет', disease_name: passedData.patient[6].disease_name },
    { id: passedData.patient[7].id, patient_id: passedData.patient[7].patient_id, disease_group: passedData.patient[7].disease_group, label: '7 лет', disease_name: passedData.patient[7].disease_name },
    { id: passedData.patient[8].id, patient_id: passedData.patient[8].patient_id, disease_group: passedData.patient[8].disease_group, label: '8 лет', disease_name: passedData.patient[8].disease_name },
    { id: passedData.patient[9].id, patient_id: passedData.patient[9].patient_id, disease_group: passedData.patient[9].disease_group, label: '9 лет', disease_name: passedData.patient[9].disease_name },
    { id: passedData.patient[10].id, patient_id: passedData.patient[10].patient_id, disease_group: passedData.patient[10].disease_group, label: '10 лет', disease_name: passedData.patient[10].disease_name },
    { id: passedData.patient[11].id, patient_id: passedData.patient[11].patient_id, disease_group: passedData.patient[11].disease_group, label: '11 лет', disease_name: passedData.patient[11].disease_name },
    { id: passedData.patient[12].id, patient_id: passedData.patient[12].patient_id, disease_group: passedData.patient[12].disease_group, label: '12 лет', disease_name: passedData.patient[12].disease_name },
    { id: passedData.patient[13].id, patient_id: passedData.patient[13].patient_id, disease_group: passedData.patient[13].disease_group, label: '13 лет', disease_name: passedData.patient[13].disease_name },
    { id: passedData.patient[14].id, patient_id: passedData.patient[14].patient_id, disease_group: passedData.patient[14].disease_group, label: '14 лет', disease_name: passedData.patient[14].disease_name },
    { id: passedData.patient[15].id, patient_id: passedData.patient[15].patient_id, disease_group: passedData.patient[15].disease_group, label: '15 лет', disease_name: passedData.patient[15].disease_name },
    { id: passedData.patient[16].id, patient_id: passedData.patient[16].patient_id, disease_group: passedData.patient[16].disease_group, label: '16 лет', disease_name: passedData.patient[16].disease_name },
    { id: passedData.patient[17].id, patient_id: passedData.patient[17].patient_id, disease_group: passedData.patient[17].disease_group, label: '17 лет', disease_name: passedData.patient[17].disease_name },
    { id: passedData.patient[18].id, patient_id: passedData.patient[18].patient_id, disease_group: passedData.patient[18].disease_group, label: '18 лет', disease_name: passedData.patient[18].disease_name }
    ]);

    const handleInputChange = (id, field, value) => {
    setRows(formData.map(row => 
        row.id === id ? { ...row, [field]: value } : row
    ));
    };
    const handleSubmit = async (e) => {
        try {
        await axios.put(`/patients/${id}`, { type: 'ListDiseasesOperationsGynecologica', formData: formData.map(({ label, ...data }) => data) });
        toast.success('Данные пациента обновлены');
        } catch (error) {
        console.error('Error updating patient:', error);
        toast.error('Ошибка при обновлении данных');
        }
    };

    return (
        <div className="data-container">
            <div className="data-card">
                <h2>Список перенесенных гинекологических заболеваний и операций</h2>
                <table style={{ 
                    borderCollapse: 'collapse', 
                    width: '100%',
                    marginBottom: '20px'
                    }}>
                    <thead>
                        <tr>
                        <th style={tableHeaderStyle}>Возраст</th>
                        <th style={tableHeaderStyle}>Список перенесенных заболеваний</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formData.map(row => (
                        <tr key={row.id}>
                            <td style={tableCellStyle}>{row.label}</td>
                            <td style={tableCellStyle}>
                            <input
                                type="text"
                                value={row.disease_name}
                                onChange={(e) => handleInputChange(row.id, 'disease_name', e.target.value)}
                                placeholder="Введите значение..."
                                style={inputStyle}
                            />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
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
            </div>
        </div>
    );
}

const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'left'
  };
  
  const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px'
  };
  
  const inputStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };
export default ListDiseasesOperationsGynecologica;