import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Parents() {

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
    await axios.put(`/patients/${id}`, { type: 'IntrauterineDevelopment', formData });
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
            <h1>Особенности внутриутробного развития ребенка</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Токсикоз I половины беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.toxicosis_first_half_pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('toxicosis_first_half_pregnancy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.toxicosis_first_half_pregnancy || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('toxicosis_first_half_pregnancy', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.toxicosis_first_half_pregnancy || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать сроки, лечение</label>
                                    <input
                                    type="text"
                                    name="toxicosis_first_half_pregnancy.text"
                                    value={ JSON.parse(formData?.toxicosis_first_half_pregnancy || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('toxicosis_first_half_pregnancy', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Токсикоз II половины беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.toxicosis_second_half_pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('toxicosis_second_half_pregnancy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.toxicosis_second_half_pregnancy || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('toxicosis_second_half_pregnancy', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.toxicosis_second_half_pregnancy || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать сроки, лечение</label>
                                    <input
                                    type="text"
                                    name="toxicosis_second_half_pregnancy.text"
                                    value={ JSON.parse(formData?.toxicosis_second_half_pregnancy || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('toxicosis_second_half_pregnancy', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Признаки угрозы прерывания беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.signs_threatened_termination_pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('signs_threatened_termination_pregnancy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.signs_threatened_termination_pregnancy || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('signs_threatened_termination_pregnancy', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.signs_threatened_termination_pregnancy || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать сроки, лечение</label>
                                    <input
                                    type="text"
                                    name="signs_threatened_termination_pregnancy.text"
                                    value={ JSON.parse(formData?.signs_threatened_termination_pregnancy || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('signs_threatened_termination_pregnancy', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Острые заболевания и оперативные вмешательства у матери:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.acute_diseases_surgical_interventions_mother || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('acute_diseases_surgical_interventions_mother', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.acute_diseases_surgical_interventions_mother || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('acute_diseases_surgical_interventions_mother', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.acute_diseases_surgical_interventions_mother || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать срок беременности, какие</label>
                                    <input
                                    type="text"
                                    name="acute_diseases_surgical_interventions_mother.text"
                                    value={ JSON.parse(formData?.acute_diseases_surgical_interventions_mother || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('acute_diseases_surgical_interventions_mother', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Применение гормональных препаратов матерью:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.use_hormonal_drugs_mother || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('use_hormonal_drugs_mother', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.use_hormonal_drugs_mother || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('use_hormonal_drugs_mother', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.use_hormonal_drugs_mother || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать сроки и схему лечения</label>
                                    <input
                                    type="text"
                                    name="use_hormonal_drugs_mother.text"
                                    value={ JSON.parse(formData?.use_hormonal_drugs_mother || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('use_hormonal_drugs_mother', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Признаки внутриутробного страдания плода:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('signs_fetal_suffering', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText('signs_fetal_suffering', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData?.signs_fetal_suffering || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="задержка внутриутробного развития" 
                                        checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText('signs_fetal_suffering', 'id3', 3, true)}
                                        />
                                        задержка внутриутробного развития<br/>
                                        <input 
                                        type="radio" 
                                        value="гипоксия" 
                                        checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id4 === 3} 
                                        onClick={() => handleChangeCheckText('signs_fetal_suffering', 'id4', 3, true)}
                                        />
                                        гипоксия<br/>
                                        <input 
                                        type="radio" 
                                        value="маловодие" 
                                        checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id5 === 3} 
                                        onClick={() => handleChangeCheckText('signs_fetal_suffering', 'id5', 3, true)}
                                        />
                                        маловодие<br/>
                                        <input 
                                        type="radio" 
                                        value="многоводие" 
                                        checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id6 === 3} 
                                        onClick={() => handleChangeCheckText('signs_fetal_suffering', 'id6', 3, true)}
                                        />
                                        многоводие<br/>
                                        <input 
                                        type="radio" 
                                        value="хроническая фетоплацентарная недостаточность" 
                                        checked={JSON.parse(formData?.signs_fetal_suffering || '{}')?.id7 === 3} 
                                        onClick={() => handleChangeCheckText('signs_fetal_suffering', 'id7', 3, true)}
                                        />
                                        хроническая фетоплацентарная недостаточность<br/>
                                        <label>прочее</label>
                                        <input
                                        type="text"
                                        name="signs_fetal_suffering.text"
                                        value={ JSON.parse(formData?.signs_fetal_suffering || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText('signs_fetal_suffering', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Родилась на </label>
                    <input
                    type="number"
                    name="age_time_birth_child"
                    value={formData.born_week_pregnancy || ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'born_week_pregnancy')}
                    required
                    />
                    <label>неделе беременности</label>
                </div>
                <div className="form-group">
                    <label>Роды:</label>
                    <div className="radio-group">
                        <input 
                        type="radio" 
                        value="без осложнений" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id', 1, true)}
                        />
                        без осложнений<br/>
                        <input 
                        type="radio" 
                        value="быстрые" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id2 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id2', 1, true)}
                        />
                        быстрые<br/>
                        <input 
                        type="radio" 
                        value="длительный безводный период" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id3 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id3', 1, true)}
                        />
                        длительный безводный период<br/>
                        <input 
                        type="radio" 
                        value="вторичная слабость родовой деятельности" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id4 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id4', 1, true)}
                        />
                        вторичная слабость родовой деятельности<br/>
                        <input 
                        type="radio" 
                        value="кровотечение в родах" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id5 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id5', 1, true)}
                        />
                        кровотечение в родах<br/>
                        <input 
                        type="radio" 
                        value="через естественные родовые пути" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id6 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id6', 1, true)}
                        />
                        через естественные родовые пути<br/>
                        <input 
                        type="radio" 
                        value="касарево сечение" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id7 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id7', 1, true)}
                        />
                        касарево сечение<br/>
                        <input 
                        type="radio" 
                        value="выходные/полостные щипцы" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id8 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id8', 1, true)}
                        />
                        выходные/полостные щипцы<br/>
                        <input 
                        type="radio" 
                        value="вакуум-экстракция ребенка" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id9 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id9', 1, true)}
                        />
                        вакуум-экстракция ребенка<br/>
                        <input 
                        type="radio" 
                        value="Гипоксия плода" 
                        checked={JSON.parse(formData?.childbirth || '{}')?.id10 === 1} 
                        onClick={() => handleChangeCheckText('childbirth', 'id10', 1, true)}
                        />
                        Гипоксия плода<br/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Особые отметки</label>
                    <input
                    type="text"
                    name="special_marks_development"
                    value={formData.special_marks_development || ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'special_marks_development')}
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

export default Parents;