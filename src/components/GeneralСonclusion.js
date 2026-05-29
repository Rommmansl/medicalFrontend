import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function GeneralСonclusion() {

const location = useLocation();
const passedData = location.state;
const [formData, setFormData] = useState({
    ... passedData.patient
    }
);
const navigate = useNavigate();
const { id } = useParams();

const handleSubmit = async (e) => {
    try {
    await axios.put(`/patients/${id}`, { type: 'GeneralСonclusion', formData });
    toast.success('Данные пациента обновлены');
    } catch (error) {
    console.error('Error updating patient:', error);
    toast.error('Ошибка при обновлении данных');
    }
};

const handleChangeCheckText = (name, nameType, param, flagActive) => {
    let object = JSON.parse(formData[name])
    object = object ? object : {}
    if(flagActive && object[nameType]) {
        delete object[nameType]
    } else {
        object[nameType] = param
    }
    const array = formData
    const t = JSON.stringify(object)
    array[name] = t
    setFormData({
        ...array
        }
    );
};

const handleChangeCheck = (element, name) => {
    const array = formData
    array[name] = element
    setFormData({
        ...array
    });
};

return (
    <div className="data-container">
        <div className="data-card">
            <h1>Общее заключение по развитию и состоянию репродуктивной системы для перевода под наблюдение гинекологов взрослой сети</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Оценка физического развития:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Cоответствие возрасту" 
                                checked={formData?.assessment_physical_development === 1} 
                                onChange={() => handleChangeCheck(1, 'assessment_physical_development')}
                                />
                                Cоответствие возрасту<br/>
                                <input 
                                type="radio" 
                                value="Низкорослость" 
                                checked={formData?.assessment_physical_development === 2} 
                                onChange={() => handleChangeCheck(2, 'assessment_physical_development')}
                                />
                                Низкорослость<br/>
                                <input 
                                type="radio" 
                                value="Высокорослость" 
                                checked={formData?.assessment_physical_development === 3} 
                                onChange={() => handleChangeCheck(3, 'assessment_physical_development')}
                                />
                                Высокорослость<br/>
                                <input 
                                type="radio" 
                                value="Дефицит массы тела" 
                                checked={formData?.assessment_physical_development === 4} 
                                onChange={() => handleChangeCheck(4, 'assessment_physical_development')}
                                />
                                Дефицит массы тела<br/>
                                <input 
                                type="radio" 
                                value="Избыток массы тела" 
                                checked={formData?.assessment_physical_development === 5} 
                                onChange={() => handleChangeCheck(5, 'assessment_physical_development')}
                                />
                                Избыток массы тела<br/>
                                <input 
                                type="radio" 
                                value="Ожирение" 
                                checked={formData?.assessment_physical_development === 6} 
                                onChange={() => handleChangeCheck(6, 'assessment_physical_development')}
                                />
                                Ожирение<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Состояние влагалища:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                Возраст начала роста молочных желез(лет)<br/>
                                <input
                                type="text"
                                name="assessment_dynamics_sexual_development.textA"
                                value={ JSON.parse(formData?.assessment_dynamics_sexual_development || '{}')?.textA || '' }
                                onChange={(e) => handleChangeCheckText('assessment_dynamics_sexual_development', 'textA', e.target.value)}
                                required
                                />
                                Оволосения лобка(лет)<br/>
                                <input
                                type="text"
                                name="assessment_dynamics_sexual_development.textL"
                                value={ JSON.parse(formData?.assessment_dynamics_sexual_development || '{}')?.textL || '' }
                                onChange={(e) => handleChangeCheckText('assessment_dynamics_sexual_development', 'textL', e.target.value)}
                                required
                                />
                                менархе<br/>
                                <input
                                type="text"
                                name="assessment_dynamics_sexual_development.textM"
                                value={ JSON.parse(formData?.assessment_dynamics_sexual_development || '{}')?.textM || '' }
                                onChange={(e) => handleChangeCheckText('assessment_dynamics_sexual_development', 'textM', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Темпы полового развития:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Соответствовали возрасту" 
                                checked={formData?.rate_sexual_development === 1} 
                                onChange={() => handleChangeCheck(1, 'rate_sexual_development')}
                                />
                                Соответствовали возрасту<br/>
                                <input 
                                type="radio" 
                                value="отставали" 
                                checked={formData?.rate_sexual_development === 2} 
                                onChange={() => handleChangeCheck(2, 'rate_sexual_development')}
                                />
                                Отставали<br/>
                                <input 
                                type="radio" 
                                value="имеется задержка роста молочных желез" 
                                checked={formData?.rate_sexual_development === 3} 
                                onChange={() => handleChangeCheck(3, 'rate_sexual_development')}
                                />
                                Имеется задержка роста молочных желез<br/>
                                <input 
                                type="radio" 
                                value="оволосения лобка" 
                                checked={formData?.rate_sexual_development === 4} 
                                onChange={() => handleChangeCheck(4, 'rate_sexual_development')}
                                />
                                Оволосения лобка<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Наличие гинекологических заболеваний в анамнезе (указать излеченные заболевания в соответствии с требованиями МКБ-10):</label>
                    <input
                    type="text"
                    name="presence_gynecological_diseases_anamnesis"
                    value={formData.presence_gynecological_diseases_anamnesis ? formData.presence_gynecological_diseases_anamnesis : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'presence_gynecological_diseases_anamnesis')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Наличие хронических экстрагенитальных заболеваний (указать излеченные заболевания в соответствии с требованиями МКБ-10):</label>
                    <input
                    type="text"
                    name="presence_chronic_extragenital_diseases"
                    value={formData.presence_chronic_extragenital_diseases ? formData.presence_chronic_extragenital_diseases : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'presence_chronic_extragenital_diseases')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Группа здоровья:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="I" 
                                checked={formData?.health_group === 1} 
                                onChange={() => handleChangeCheck(1, 'health_group')}
                                />
                                I<br/>
                                <input 
                                type="radio" 
                                value="II" 
                                checked={formData?.health_group === 2} 
                                onChange={() => handleChangeCheck(2, 'health_group')}
                                />
                                II<br/>
                                <input 
                                type="radio" 
                                value="III" 
                                checked={formData?.health_group === 3} 
                                onChange={() => handleChangeCheck(3, 'health_group')}
                                />
                                III<br/>
                                <input 
                                type="radio" 
                                value="IV" 
                                checked={formData?.health_group === 4} 
                                onChange={() => handleChangeCheck(4, 'health_group')}
                                />
                                IV<br/>
                                <input 
                                type="radio" 
                                value="V" 
                                checked={formData?.health_group === 5} 
                                onChange={() => handleChangeCheck(5, 'health_group')}
                                />
                                V<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Заключительный гинекологический диагноз (указать в соответствии с требованиями МКБ-10):</label>
                    <input
                    type="text"
                    name="final_gynecological_diagnosis"
                    value={formData.final_gynecological_diagnosis ? formData.final_gynecological_diagnosis : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'final_gynecological_diagnosis')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Факторы риска по развитию нарушений менструального цикла и бесплодия в будущем:</label>
                    <input
                    type="text"
                    name="risk_factors_development"
                    value={formData.risk_factors_development ? formData.risk_factors_development : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'risk_factors_development')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Рекомендации по профилактике и лечению патологии репродуктивной системы:</label>
                    <input
                    type="text"
                    name="recommendations_prevention_treatment"
                    value={formData.recommendations_prevention_treatment ? formData.recommendations_prevention_treatment : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'recommendations_prevention_treatment')}
                    required
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

export default GeneralСonclusion;