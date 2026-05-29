import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function NewbornPeriod() {

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
    await axios.put(`/patients/${id}`, { type: 'NewbornPeriod', formData });
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
            <h1>Особенности периода новорожденности</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Рост(см)</label>
                    <input
                    type="text"
                    name="height"
                    value={formData.height ? formData.height : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'height')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Вес</label>
                    <input
                    type="text"
                    name="weight"
                    value={formData.weight ? formData.weight : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'weight')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Оценка по Апгар:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <label>на 1 минуте</label>
                            <input
                            type="text"
                            name="estimate_apgar.text1"
                            value={JSON.parse(formData.estimate_apgar || '{}')?.text1 || '' }
                            onChange={(e) => handleChangeCheckText('estimate_apgar', 'text1', e.target.value)}
                            required
                            />
                            <label>на 5 минуте</label>
                            <input
                            type="text"
                            name="estimate_apgar.text5"
                            value={JSON.parse(formData.estimate_apgar || '{}')?.text5 || '' }
                            onChange={(e) => handleChangeCheckText('estimate_apgar', 'text5', e.target.value)}
                            required
                            />
                            <label>баллов</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Состояние новорожденного:</label>
                    <div className="radio-group">
                        <input 
                        type="radio" 
                        value="Гипотрофия I" 
                        checked={JSON.parse(formData?.condition || '{}')?.id === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id', 1, true)}
                        />
                        Гипотрофия I степени<br/>
                        <input 
                        type="radio" 
                        value="Гипотрофия II" 
                        checked={JSON.parse(formData?.condition || '{}')?.id2 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id2', 1, true)}
                        />
                        Гипотрофия II степени<br/>
                        <input 
                        type="radio" 
                        value="Гипотрофия III" 
                        checked={JSON.parse(formData?.condition || '{}')?.id3 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id3', 1, true)}
                        />
                        Гипотрофия III степени<br/>
                        <input 
                        type="radio" 
                        value="Гипотрофия IV" 
                        checked={JSON.parse(formData?.condition || '{}')?.id4 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id4', 1, true)}
                        />
                        Гипотрофия IV степени<br/>
                        <input 
                        type="radio" 
                        value="признаки недоношенности" 
                        checked={JSON.parse(formData?.condition || '{}')?.id5 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id5', 1, true)}
                        />
                        признаки недоношенности<br/>
                        <input 
                        type="radio" 
                        value="признаки переношенности" 
                        checked={JSON.parse(formData?.condition || '{}')?.id6 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id6', 1, true)}
                        />
                        признаки переношенности<br/>
                        <input 
                        type="radio" 
                        value="признаки поражения ЦНС" 
                        checked={JSON.parse(formData?.condition || '{}')?.id7 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id7', 1, true)}
                        />
                        признаки поражения ЦНС<br/>
                        <input 
                        type="radio" 
                        value="синдром дыхательных расстройств" 
                        checked={JSON.parse(formData?.condition || '{}')?.id8 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id8', 1, true)}
                        />
                        синдром дыхательных расстройств<br/>
                        <input 
                        type="radio" 
                        value="признаки инфицирования" 
                        checked={JSON.parse(formData?.condition || '{}')?.id9 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id9', 1, true)}
                        />
                        признаки инфицирования<br/>
                        <input 
                        type="radio" 
                        value="признаки ДВС" 
                        checked={JSON.parse(formData?.condition || '{}')?.id10 === 1} 
                        onClick={() => handleChangeCheckText('condition', 'id10', 1, true)}
                        />
                        признаки ДВС<br/>
                        <label>прочее</label>
                        <input
                        type="text"
                        name="condition.text"
                        value={ JSON.parse(formData?.condition || '{}')?.text || '' }
                        onChange={(e) => handleChangeCheckText('condition', 'text', e.target.value)}
                        required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>Травмы:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.trauma || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('trauma', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.trauma || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('trauma', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.trauma || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="trauma.text"
                                    value={ JSON.parse(formData?.trauma || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('trauma', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Стигмы дисэмбриогенеза:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.dysembriogenesis || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('dysembriogenesis', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.dysembriogenesis || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('dysembriogenesis', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.dysembriogenesis || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="dysembriogenesis.text"
                                    value={ JSON.parse(formData?.dysembriogenesis || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('dysembriogenesis', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Отклонения строения и состояния молочных желез:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.abnormalities_structure_condition_mammary_glands || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('abnormalities_structure_condition_mammary_glands', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.abnormalities_structure_condition_mammary_glands || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('abnormalities_structure_condition_mammary_glands', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.abnormalities_structure_condition_mammary_glands || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="abnormalities_structure_condition_mammary_glands.text"
                                    value={ JSON.parse(formData?.abnormalities_structure_condition_mammary_glands || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('abnormalities_structure_condition_mammary_glands', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Отклонения строения наружных половых органов:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.abnormalities_structure_external_genitalia || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('abnormalities_structure_external_genitalia', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.abnormalities_structure_external_genitalia || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('abnormalities_structure_external_genitalia', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.abnormalities_structure_external_genitalia || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="abnormalities_structure_external_genitalia.text"
                                    value={ JSON.parse(formData?.abnormalities_structure_external_genitalia || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('abnormalities_structure_external_genitalia', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные операции:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.postponed_operations || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('postponed_operations', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.postponed_operations || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('postponed_operations', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.postponed_operations || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="postponed_operations.text"
                                    value={ JSON.parse(formData?.postponed_operations || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('postponed_operations', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>БЦЖ прививка в роддоме:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.bcg || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('bcg', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.bcg || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('bcg', 'id', 2)}
                                />
                                да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Выписана из родильного дома на</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <input
                            type="number"
                            name="discharged_from_maternity_hospital.text1"
                            value={formData.discharged_from_maternity_hospital || '' }
                            onChange={(e) => handleChangeCheck(e.target.value, 'discharged_from_maternity_hospital')}
                            required
                            />
                            <label>сутки</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Находилась в отделении:</label>
                    <div className="radio-group">
                        <input 
                        type="radio" 
                        value="физиологии новорожденных" 
                        checked={JSON.parse(formData?.she_department_physiology || '{}')?.id === 1} 
                        onClick={() => handleChangeCheckText('she_department_physiology', 'id', 1, true)}
                        />
                        физиологии новорожденных<br/>
                        <input 
                        type="radio" 
                        value="интенсивной терапии" 
                        checked={JSON.parse(formData?.she_department_physiology || '{}')?.id2 === 1} 
                        onClick={() => handleChangeCheckText('she_department_physiology', 'id2', 1, true)}
                        />
                        интенсивной терапии<br/>
                        <input 
                        type="radio" 
                        value="патологии новорожденных" 
                        checked={JSON.parse(formData?.she_department_physiology || '{}')?.id3 === 1} 
                        onClick={() => handleChangeCheckText('she_department_physiology', 'id3', 1, true)}
                        />
                        патологии новорожденных<br/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Переведена в детскую больницу, выписана на</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <input
                            type="number"
                            name="transferred_children_hospital.text1"
                            value={formData.transferred_children_hospital || '' }
                            onChange={(e) => handleChangeCheck(e.target.value, 'transferred_children_hospital')}
                            required
                            />
                            <label>сутки</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Принимала гормональные препараты:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.she_took_hormonal_medications || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('she_took_hormonal_medications', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.she_took_hormonal_medications || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('she_took_hormonal_medications', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.she_took_hormonal_medications || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="she_took_hormonal_medications.text"
                                    value={ JSON.parse(formData?.she_took_hormonal_medications || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('she_took_hormonal_medications', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Степень риска репродуктивных нарушений:</label>
                    <div className="radio-group">
                        <input 
                        type="radio" 
                        value="низкая" 
                        checked={JSON.parse(formData?.degree_risk_reproductive_disorders || '{}')?.id === 1} 
                        onClick={() => handleChangeCheckText('degree_risk_reproductive_disorders', 'id', 1, true)}
                        />
                        низкая<br/>
                        <input 
                        type="radio" 
                        value="средняя" 
                        checked={JSON.parse(formData?.degree_risk_reproductive_disorders || '{}')?.id2 === 1} 
                        onClick={() => handleChangeCheckText('degree_risk_reproductive_disorders', 'id2', 1, true)}
                        />
                        средняя<br/>
                        <input 
                        type="radio" 
                        value="высокая" 
                        checked={JSON.parse(formData?.degree_risk_reproductive_disorders || '{}')?.id3 === 1} 
                        onClick={() => handleChangeCheckText('degree_risk_reproductive_disorders', 'id3', 1, true)}
                        />
                        высокая<br/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Особые отметки и рекомендации</label>
                    <input
                    type="text"
                    name="special_marks_recommendations"
                    value={formData.special_marks_recommendations || ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'special_marks_recommendations')}
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

export default NewbornPeriod;