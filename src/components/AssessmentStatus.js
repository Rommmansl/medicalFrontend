import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function AssessmentStatus() {

const location = useLocation();
const passedData = location.state;
const ageChild = parseInt(passedData.ageChild)
const [formData, setFormData] = useState({
    ... passedData.patient[ageChild - 1].data
    }
);
const navigate = useNavigate();
const { id } = useParams();

const handleSubmit = async (e) => {
    try {
    await axios.put(`/patients/${id}`, { type: 'AssessmentStatus', formData, ageChild });
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
                <div className="form-group" >
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
                <div className="form-group" style={[1,2,3,4,5,6,7].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Увеличение молочных желёз:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.breast_enlargement || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('breast_enlargement', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.breast_enlargement || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('breast_enlargement', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.breast_enlargement || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать степень развития по Таннеру - Ма</label>
                                    <input
                                    type="text"
                                    name="breast_enlargement.text"
                                    value={ JSON.parse(formData?.breast_enlargement || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('breast_enlargement', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Вредные привычки или их косвенные признаки:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.bad_habits || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('bad_habits', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.bad_habits || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText('bad_habits', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData?.bad_habits || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="табакокурение" 
                                        checked={JSON.parse(formData?.bad_habits || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText('bad_habits', 'id3', 3, true)}
                                        />
                                        табакокурение<br/>
                                        <input 
                                        type="radio" 
                                        value="наркотиков" 
                                        checked={JSON.parse(formData?.bad_habits || '{}')?.id4 === 3} 
                                        onClick={() => handleChangeCheckText('bad_habits', 'id4', 3, true)}
                                        />
                                        употребление психотропных препаратов, в т.ч. наркотиков<br/>
                                        <input 
                                        type="radio" 
                                        value="алкоголя" 
                                        checked={JSON.parse(formData?.bad_habits || '{}')?.id5 === 3} 
                                        onClick={() => handleChangeCheckText('bad_habits', 'id5', 3, true)}
                                        />
                                        алкоголя<br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Оценка степени развития вторичных половых признаков по Таниеру: </label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Молочные железы (Ма)" 
                                checked={JSON.parse(formData?.sexual_characteristics || '{}')?.ma === 1} 
                                onClick={() => handleChangeCheckText('sexual_characteristics', 'ma', 1, true)}
                                />
                                Молочные железы (Ма)<br/>
                                {(JSON.parse(formData?.sexual_characteristics || '{}')?.ma === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="text"
                                        name="sexual_characteristics.ma_text"
                                        value={JSON.parse(formData?.sexual_characteristics || '{}')?.ma_text || '' }
                                        onChange={(e) => handleChangeCheckText('sexual_characteristics', 'ma_text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="оволосение лобка (Р)" 
                                checked={JSON.parse(formData?.sexual_characteristics || '{}')?.p === 1} 
                                onClick={() => handleChangeCheckText('sexual_characteristics', 'p', 1, true)}
                                />
                                Оволосение лобка (Р)<br/>
                                {(JSON.parse(formData?.sexual_characteristics || '{}')?.p === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="text"
                                        name="sexual_characteristics.p_text"
                                        value={JSON.parse(formData?.sexual_characteristics || '{}')?.p_text || '' }
                                        onChange={(e) => handleChangeCheckText('sexual_characteristics', 'p_text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="Наличие менструаций (Ме)" 
                                checked={JSON.parse(formData?.sexual_characteristics || '{}')?.me === 1} 
                                onClick={() => handleChangeCheckText('sexual_characteristics', 'me', 1, true)}
                                />
                                Наличие менструаций (Ме)<br/>
                                {(JSON.parse(formData?.sexual_characteristics || '{}')?.me === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="text"
                                        name="sexual_characteristics.me_text"
                                        value={JSON.parse(formData?.sexual_characteristics || '{}')?.me_text || '' }
                                        onChange={(e) => handleChangeCheckText('sexual_characteristics', 'me_text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                                Возраст менархе<br/>
                                <input
                                type="number"
                                name="sexual_characteristics.menarh_age"
                                value={JSON.parse(formData?.sexual_characteristics || '{}')?.menarh_age || '' }
                                onChange={(e) => handleChangeCheckText('sexual_characteristics', 'menarh_age', e.target.value)}
                                required
                                />
                                лет<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Наличие патологических образований и отделяемого из сосков молочных желез:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.pathological_formations || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('pathological_formations', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.pathological_formations || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('pathological_formations', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.pathological_formations || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие, где</label>
                                    <input
                                    type="text"
                                    name="pathological_formations.text"
                                    value={ JSON.parse(formData?.pathological_formations || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('pathological_formations', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5,6,7].includes(ageChild) ? displayVisible : displayInvisible}>
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
                                    <label>указать какие, где</label>
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
                <div className="form-group" style={[9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Особенности ритма и характер менструаций: </label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="установился сразу" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id1 === 1} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id1', 1, true)}
                                />
                                установился сразу<br/>
                                <input 
                                type="radio" 
                                value="через (месяцев/лет)" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id2 === 1} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id2', 1, true)}
                                />
                                через (месяцев/лет)<br/>
                                {(JSON.parse(formData?.rhythm_features || '{}')?.id2 === 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="месяцев" 
                                        checked={JSON.parse(formData?.rhythm_features || '{}')?.id2type === 1} 
                                        onChange={() => handleChangeCheckText('rhythm_features', 'id2type', 1)}
                                        />
                                        месяцев<br/>
                                        <input 
                                        type="radio" 
                                        value="лет" 
                                        checked={JSON.parse(formData.rhythm_features || '{}')?.id2type === 2} 
                                        onChange={() => handleChangeCheckText('rhythm_features', 'id2type', 2)}
                                        />
                                        лет<br/>
                                        <input
                                        type="number"
                                        name="rhythm_features.id2_text"
                                        value={JSON.parse(formData?.rhythm_features || '{}')?.id2_text || '' }
                                        onChange={(e) => handleChangeCheckText('rhythm_features', 'id2_text', e.target.value)}
                                        required
                                        />
                                        <br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="регулярный/нерегулярный до зачатия" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id3 === 1} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id3', 1, true)}
                                />
                                регулярный/нерегулярный до зачатия<br/>
                                {(JSON.parse(formData?.rhythm_features || '{}')?.id3 === 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="регулярный" 
                                        checked={JSON.parse(formData?.rhythm_features || '{}')?.id3type === 1} 
                                        onChange={() => handleChangeCheckText('rhythm_features', 'id3type', 1)}
                                        />
                                        регулярный<br/>
                                        <input 
                                        type="radio" 
                                        value="нерегулярный" 
                                        checked={JSON.parse(formData?.rhythm_features || '{}')?.id3type === 2} 
                                        onChange={() => handleChangeCheckText('rhythm_features', 'id3type', 2)}
                                        />
                                        нерегулярный<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="по _ дней" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id4 === 1} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id4', 1, true)}
                                />
                                по дней<br/>
                                {(JSON.parse(formData?.rhythm_features || '{}')?.id4 === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="number"
                                        name="rhythm_features.id4_text"
                                        value={JSON.parse(formData?.rhythm_features || '{}')?.id4_text || '' }
                                        onChange={(e) => handleChangeCheckText('rhythm_features', 'id4_text', e.target.value)}
                                        required
                                        />
                                        дней<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="через _ дней" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id5 === 1} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id5', 1, true)}
                                />
                                через дней<br/>
                                {(JSON.parse(formData?.rhythm_features || '{}')?.id5 === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="number"
                                        name="rhythm_features.id5_text"
                                        value={JSON.parse(formData?.rhythm_features || '{}')?.id5_text || '' }
                                        onChange={(e) => handleChangeCheckText('rhythm_features', 'id5_text', e.target.value)}
                                        required
                                        />
                                        дней<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="менструации болезненные" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id7 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id7', 2, true)}
                                />
                                менструации болезненные<br/>
                                <input 
                                type="radio" 
                                value="безболезненные" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id8 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id8', 2, true)}
                                />
                                безболезненные<br/>
                                <input 
                                type="radio" 
                                value="умеренные" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id9 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id9', 2, true)}
                                />
                                умеренные<br/>
                                <input 
                                type="radio" 
                                value="скудные" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id10 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id10', 2, true)}
                                />
                                скудные<br/>
                                <input 
                                type="radio" 
                                value="обильные" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id11 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id11', 2, true)}
                                />
                                обильные<br/>
                                <input 
                                type="radio" 
                                value="более 7 дней" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id12 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id12', 2, true)}
                                />
                                более 7 дней<br/>
                                <input 
                                type="radio" 
                                value="менее 7 дней" 
                                checked={JSON.parse(formData?.rhythm_features || '{}')?.id13 === 2} 
                                onClick={() => handleChangeCheckText('rhythm_features', 'id13', 2, true)}
                                />
                                менее 7 дней<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Рост волос в гормональнозависимых зонах:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.hair_growth || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('hair_growth', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.hair_growth || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('hair_growth', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.hair_growth || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input
                                    type="text"
                                    name="hair_growth.text"
                                    value={ JSON.parse(formData?.hair_growth || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('hair_growth', 'text', e.target.value)}
                                    required
                                    />
                                    <label>баллов по шкале Ферримана-Голлвея</label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5,6,7].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Рост волос на лобке или воловых губах:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.rostvolos || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('rostvolos', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="есть" 
                                checked={JSON.parse(formData?.rostvolos || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('rostvolos', 'id', 2)}
                                />
                                есть<br/>
                            </div>
                            {(JSON.parse(formData?.rostvolos || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>до Р</label>
                                    <input
                                    type="text"
                                    name="rostvolos.text"
                                    value={ JSON.parse(formData?.rostvolos || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('rostvolos', 'text', e.target.value)}
                                    required
                                    />
                                    <label>по Таннеру</label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Наличие полос растяжения:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.presence_stripes || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('presence_stripes', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.presence_stripes || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('presence_stripes', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.presence_stripes || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать цвет</label>
                                    <input
                                    type="text"
                                    name="presence_stripes.textC"
                                    value={ JSON.parse(formData?.presence_stripes || '{}')?.textC || '' }
                                    onChange={(e) => handleChangeCheckText('presence_stripes', 'textC', e.target.value)}
                                    required
                                    />
                                    <label>указать локализацию</label>
                                    <input
                                    type="text"
                                    name="presence_stripes.textL"
                                    value={ JSON.parse(formData?.presence_stripes || '{}')?.textL || '' }
                                    onChange={(e) => handleChangeCheckText('presence_stripes', 'textL', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Наличие угревой сыпи:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.presence_acne || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('presence_acne', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.presence_acne || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('presence_acne', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.presence_acne || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать вид</label>
                                    <input
                                    type="text"
                                    name="presence_acne.textC"
                                    value={ JSON.parse(formData?.presence_acne || '{}')?.textC || '' }
                                    onChange={(e) => handleChangeCheckText('presence_acne', 'textC', e.target.value)}
                                    required
                                    />
                                    <label>указать локализацию</label>
                                    <input
                                    type="text"
                                    name="presence_acne.textL"
                                    value={ JSON.parse(formData?.presence_acne || '{}')?.textL || '' }
                                    onChange={(e) => handleChangeCheckText('presence_acne', 'textL', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,11,13].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Отклонения строения наружных половых органов:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.structure_external_genitalia || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('structure_external_genitalia', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.structure_external_genitalia || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('structure_external_genitalia', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.structure_external_genitalia || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать какие</label>
                                    <input
                                    type="text"
                                    name="structure_external_genitalia.text"
                                    value={ JSON.parse(formData?.structure_external_genitalia || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('structure_external_genitalia', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Гинекологический статус:</label>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Строение наружных половых органов:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Соответствует возрасту и полу" 
                                checked={JSON.parse(formData?.structure_external_genitalia || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText('structure_external_genitalia', 'id', 1, true)}
                                />
                                Соответствует возрасту и полу<br/>
                                <input 
                                type="radio" 
                                value="Особенности" 
                                checked={JSON.parse(formData?.structure_external_genitalia || '{}')?.id1 === 2} 
                                onClick={() => handleChangeCheckText('structure_external_genitalia', 'id1', 2, true)}
                                />
                                Особенности<br/>
                            </div>
                            {(JSON.parse(formData?.structure_external_genitalia || '{}')?.id1 > 1) && (
                                <div className="radio-group">
                                    <label>Описать</label>
                                    <input
                                    type="text"
                                    name="structure_external_genitalia.text"
                                    value={ JSON.parse(formData?.structure_external_genitalia || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('structure_external_genitalia', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" >
                    <label>Патологические выделения из влагалища:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={JSON.parse(formData?.pathological_discharge || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('pathological_discharge', 'id', 1)}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={JSON.parse(formData?.pathological_discharge || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('pathological_discharge', 'id', 2)}
                                />
                                Да<br/>
                            </div>
                            {(JSON.parse(formData?.pathological_discharge || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input 
                                    type="radio" 
                                    value="кровяные" 
                                    checked={JSON.parse(formData?.pathological_discharge || '{}')?.id1 === 2} 
                                    onClick={() => handleChangeCheckText('pathological_discharge', 'id1', 2, true)}
                                    />
                                    кровяные<br/>
                                    <input 
                                    type="radio" 
                                    value="серозные" 
                                    checked={JSON.parse(formData?.pathological_discharge || '{}')?.id2 === 2} 
                                    onClick={() => handleChangeCheckText('pathological_discharge', 'id2', 2, true)}
                                    />
                                    серозные<br/>
                                    <input 
                                    type="radio" 
                                    value="слизистые" 
                                    checked={JSON.parse(formData?.pathological_discharge || '{}')?.id3 === 2} 
                                    onClick={() => handleChangeCheckText('pathological_discharge', 'id3', 2, true)}
                                    />
                                    слизистые<br/>
                                    <input 
                                    type="radio" 
                                    value="гноевидные" 
                                    checked={JSON.parse(formData?.pathological_discharge || '{}')?.id4 === 2} 
                                    onClick={() => handleChangeCheckText('pathological_discharge', 'id4', 2, true)}
                                    />
                                    гноевидные<br/>
                                    <input 
                                    type="radio" 
                                    value="творожистые" 
                                    checked={JSON.parse(formData?.pathological_discharge || '{}')?.id5 === 2} 
                                    onClick={() => handleChangeCheckText('pathological_discharge', 'id5', 2, true)}
                                    />
                                    творожистые<br/>
                                    <label>Другие</label>
                                    <input
                                    type="text"
                                    name="pathological_discharge.text"
                                    value={ JSON.parse(formData?.pathological_discharge || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('pathological_discharge', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5,6,7,8,9,11,13].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Гиперемия кожи промежности и вульвы:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={JSON.parse(formData?.hyperemia_skin || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('hyperemia_skin', 'id', 1)}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={JSON.parse(formData?.hyperemia_skin || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('hyperemia_skin', 'id', 2)}
                                />
                                Да<br/>
                            </div>
                            {(JSON.parse(formData?.hyperemia_skin || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Другие</label>
                                    <label>Указать локализацию</label>
                                    <input
                                    type="text"
                                    name="hyperemia_skin.textL"
                                    value={ JSON.parse(formData?.hyperemia_skin || '{}')?.textL || '' }
                                    onChange={(e) => handleChangeCheckText('hyperemia_skin', 'textL', e.target.value)}
                                    required
                                    />
                                    <label>тип изменений</label>
                                    <input
                                    type="text"
                                    name="hyperemia_skin.textT"
                                    value={ JSON.parse(formData?.hyperemia_skin || '{}')?.textT || '' }
                                    onChange={(e) => handleChangeCheckText('hyperemia_skin', 'textT', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Ночной энурез:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.nocturnal_enuresis === 1} 
                                onChange={() => handleChangeCheck(1, 'nocturnal_enuresis')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.nocturnal_enuresis === 2} 
                                onChange={() => handleChangeCheck(2, 'nocturnal_enuresis')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Дневное неудержание мочи:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.daytime_incontinence === 1} 
                                onChange={() => handleChangeCheck(1, 'daytime_incontinence')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.daytime_incontinence === 2} 
                                onChange={() => handleChangeCheck(2, 'daytime_incontinence')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Стрессовое неудержание мочи:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.stress_incontinence === 1} 
                                onChange={() => handleChangeCheck(1, 'stress_incontinence')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.stress_incontinence=== 2} 
                                onChange={() => handleChangeCheck(2, 'stress_incontinence')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Наличие пятен мочи и кала на трусиках:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.presence_stains === 1} 
                                onChange={() => handleChangeCheck(1, 'presence_stains')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.presence_stains === 2} 
                                onChange={() => handleChangeCheck(2, 'presence_stains')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Жалобы на боли внизу живота, в области спины:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.complaints_pain === 1} 
                                onChange={() => handleChangeCheck(1, 'complaints_pain')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.complaints_pain === 2} 
                                onChange={() => handleChangeCheck(2, 'complaints_pain')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[6,7,8,9,10,11,12,13,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Наличие признаков насилия (ссадины, экхимозы в области внутренней поверхности бедер, живота, наружных половых органов):</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.presence_signs_violence === 1} 
                                onChange={() => handleChangeCheck(1, 'presence_signs_violence')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.presence_signs_violence === 2} 
                                onChange={() => handleChangeCheck(2, 'presence_signs_violence')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Рекомендации по гигиене половых органов:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Даны" 
                                checked={JSON.parse(formData?.recimendation || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText('recimendation', 'id', 1, true)}
                                />
                                Даны<br/>
                                <input 
                                type="radio" 
                                value="Не даны" 
                                checked={JSON.parse(formData?.recimendation || '{}')?.id1 === 2} 
                                onClick={() => handleChangeCheckText('recimendation', 'id1', 2, true)}
                                />
                                Не даны<br/>
                                <input 
                                type="radio" 
                                value="Выполняют" 
                                checked={JSON.parse(formData?.recimendation || '{}')?.id3 === 3} 
                                onClick={() => handleChangeCheckText('recimendation', 'id3', 3, true)}
                                />
                                Выполняют<br/>
                                <input 
                                type="radio" 
                                value="Не выполняют" 
                                checked={JSON.parse(formData?.recimendation || '{}')?.id4 === 4} 
                                onClick={() => handleChangeCheckText('recimendation', 'id4', 4, true)}
                                />
                                Не выполняют<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Ношение одноразовых подгузников:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.reusable_diapers || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText('reusable_diapers', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.reusable_diapers || '{}')?.id > 1} 
                                onClick={() => handleChangeCheckText('reusable_diapers', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData?.reusable_diapers || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="не более 2" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id3', 3, true)}
                                        />
                                        не более 2 часов<br/>
                                        <input 
                                        type="radio" 
                                        value="не более 4" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id4', 4, true)}
                                        />
                                        не более 4 часов<br/>
                                        <input 
                                        type="radio" 
                                        value="не более 6" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id5', 5, true)}
                                        />
                                        не более 6 часов<br/>
                                        <input 
                                        type="radio" 
                                        value="не более 8" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id6', 6, true)}
                                        />
                                        не более 8 часов<br/>
                                        <input 
                                        type="radio" 
                                        value="не более 12" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id7', 7, true)}
                                        />
                                        не более 12 часов<br/>
                                        <input 
                                        type="radio" 
                                        value="только на ночь" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id8', 8, true)}
                                        />
                                        только на ночь<br/>
                                        <input 
                                        type="radio" 
                                        value="только на прогулку" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id9 === 9} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id9', 9, true)}
                                        />
                                        только на прогулку<br/>
                                        <input 
                                        type="radio" 
                                        value="на прогулку и на ночь" 
                                        checked={JSON.parse(formData?.reusable_diapers || '{}')?.id10 === 10} 
                                        onClick={() => handleChangeCheckText('reusable_diapers', 'id10', 10, true)}
                                        />
                                        на прогулку и на ночь<br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5,6,7,8,9,11,13].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение педиатра о репродуктивном здоровье:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Здорова" 
                                checked={formData?.pediatrician_report === 1} 
                                onChange={(e) => handleChangeCheck(1, 'pediatrician_report')}
                                />
                                Здорова<br/>
                                <input 
                                type="radio" 
                                value="Направлена на консультацию к гинекологу детского и подросткового возраста" 
                                checked={formData?.pediatrician_report === 2} 
                                onChange={(e) => handleChangeCheck(2, 'pediatrician_report')}
                                />
                                Направлена на консультацию к гинекологу детского и подросткового возраста<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Результаты ректоабдоминального или вагинального исследования:</label>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Матка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                Размеры<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.uterus || '{}')?.textR || '' }
                                onChange={(e) => handleChangeCheckText('uterus', 'textR', e.target.value)}
                                required
                                />
                                Расположения<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.uterus || '{}')?.textP || '' }
                                onChange={(e) => handleChangeCheckText('uterus', 'textP', e.target.value)}
                                required
                                />
                                Подвижность<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.uterus || '{}')?.textM || '' }
                                onChange={(e) => handleChangeCheckText('uterus', 'textM', e.target.value)}
                                required
                                />
                                Образования<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.uterus || '{}')?.textF || '' }
                                onChange={(e) => handleChangeCheckText('uterus', 'textF', e.target.value)}
                                required
                                />
                                Болезненность<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.uterus || '{}')?.textB || '' }
                                onChange={(e) => handleChangeCheckText('uterus', 'textB', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Придатки :</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                Размеры слева<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textRL || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textRL', e.target.value)}
                                required
                                />
                                Размеры справа<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textRR || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textRR', e.target.value)}
                                required
                                />
                                Расположение слева<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textPL || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textPL', e.target.value)}
                                required
                                />
                                Расположение справа<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textPP || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textPP', e.target.value)}
                                required
                                />
                                Подвижность слева<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textML || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textML', e.target.value)}
                                required
                                />
                                Подвижность справа<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textMR || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textMR', e.target.value)}
                                required
                                />
                                Образования слева<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textFL || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textFL', e.target.value)}
                                required
                                />
                                Образования справа<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textFR || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textFR', e.target.value)}
                                required
                                />
                                Болезненность слева<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textBL || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textBL', e.target.value)}
                                required
                                />
                                Болезненность справа<br/>
                                <input 
                                type="text" 
                                value={ JSON.parse(formData?.appendages || '{}')?.textBR || '' }
                                onChange={(e) => handleChangeCheckText('appendages', 'textBR', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Результаты вагиноскопии (у девственниц по показаниям)</label>
                    <input
                    type="text"
                    name="vaginoscopy"
                    value={formData.vaginoscopy ? formData.vaginoscopy : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'vaginoscopy')}
                    required
                    />
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Состояние влагалища:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Без особенностей" 
                                checked={JSON.parse(formData?.condition_vagina || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('condition_vagina', 'id', 1)}
                                />
                                Без особенностей<br/>
                                <input 
                                type="radio" 
                                value="патологические изменения" 
                                checked={JSON.parse(formData?.condition_vagina || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('condition_vagina', 'id', 2)}
                                />
                                Патологические изменения<br/>
                            </div>
                            {(JSON.parse(formData?.condition_vagina || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Указать</label>
                                    <input
                                    type="text"
                                    name="condition_vagina.textL"
                                    value={ JSON.parse(formData?.condition_vagina || '{}')?.textL || '' }
                                    onChange={(e) => handleChangeCheckText('condition_vagina', 'textL', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[10,12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Состояние шейки матки:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Без особенностей" 
                                checked={JSON.parse(formData?.condition_cervix || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('condition_cervix', 'id', 1)}
                                />
                                Без особенностей<br/>
                                <input 
                                type="radio" 
                                value="патологические изменения" 
                                checked={JSON.parse(formData?.condition_cervix || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('condition_cervix', 'id', 2)}
                                />
                                Патологические изменения<br/>
                            </div>
                            {(JSON.parse(formData?.condition_cervix || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Указать</label>
                                    <input
                                    type="text"
                                    name="condition_cervix.textL"
                                    value={ JSON.parse(formData?.condition_cervix || '{}')?.textL || '' }
                                    onChange={(e) => handleChangeCheckText('condition_cervix', 'textL', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Оценка репродуктивного поведения:</label>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Половая жизнь:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="есть" 
                                checked={(formData || '{}')?.sex === 1} 
                                onChange={() => handleChangeCheck(1, 'sex')}
                                />
                                Есть<br/>
                                <input 
                                type="radio" 
                                value="отрицает" 
                                checked={(formData || '{}')?.sex=== 2} 
                                onChange={() => handleChangeCheck(2, 'sex')}
                                />
                                Отрицает<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Число партнеров:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="1" 
                                checked={(formData || '{}')?.number_partners === 1} 
                                onChange={() => handleChangeCheck(1, 'number_partners')}
                                />
                                1<br/>
                                <input 
                                type="radio" 
                                value="от 1 до 5" 
                                checked={(formData || '{}')?.number_partners === 2} 
                                onChange={() => handleChangeCheck(2, 'number_partners')}
                                />
                                от 1 до 5<br/>
                                <input 
                                type="radio" 
                                value="5 и более" 
                                checked={(formData || '{}')?.number_partners === 3} 
                                onChange={() => handleChangeCheck(3, 'number_partners')}
                                />
                                5 и более<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Контрацепция:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={JSON.parse(formData?.contraception || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('contraception', 'id', 1)}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Есть" 
                                checked={JSON.parse(formData?.contraception || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('contraception', 'id', 2)}
                                />
                                Есть<br/>
                            </div>
                            {(JSON.parse(formData?.contraception || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input 
                                    type="radio" 
                                    value="презерватив" 
                                    checked={JSON.parse(formData?.contraception || '{}')?.id1 === 2} 
                                    onClick={() => handleChangeCheckText('contraception', 'id1', 2, true)}
                                    />
                                    презерватив<br/>
                                    <input 
                                    type="radio" 
                                    value="прерванное половое сношение" 
                                    checked={JSON.parse(formData?.contraception || '{}')?.id2 === 2} 
                                    onClick={() => handleChangeCheckText('contraception', 'id2', 2, true)}
                                    />
                                    прерванное половое сношение<br/>
                                    <input 
                                    type="radio" 
                                    value="ВМС" 
                                    checked={JSON.parse(formData?.contraception || '{}')?.id3 === 2} 
                                    onClick={() => handleChangeCheckText('contraception', 'id3', 2, true)}
                                    />
                                    ВМС<br/>
                                    <input 
                                    type="radio" 
                                    value="КОК" 
                                    checked={JSON.parse(formData?.contraception || '{}')?.id4 === 2} 
                                    onClick={() => handleChangeCheckText('contraception', 'id4', 2, true)}
                                    />
                                    КОК<br/>
                                    <label>Другие</label>
                                    <input
                                    type="text"
                                    name="contraception.text"
                                    value={ JSON.parse(formData?.contraception || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('contraception', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Мотивация на сохранение сексуального здоровья:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={formData?.motivation === 1} 
                                onChange={() => handleChangeCheck(1, 'motivation')}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Да" 
                                checked={formData?.motivation === 2} 
                                onChange={() => handleChangeCheck(2, 'motivation')}
                                />
                                Да<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Нет" 
                                checked={JSON.parse(formData?.pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('pregnancy', 'id', 1)}
                                />
                                Нет<br/>
                                <input 
                                type="radio" 
                                value="Есть" 
                                checked={JSON.parse(formData?.pregnancy || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('pregnancy', 'id', 2)}
                                />
                                Есть<br/>
                            </div>
                            {(JSON.parse(formData?.pregnancy || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Указать сколько</label>
                                    <input
                                    type="text"
                                    name="pregnancy.text"
                                    value={ JSON.parse(formData?.pregnancy || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('pregnancy', 'text', e.target.value)}
                                    required
                                    />
                                    <label>Закончились медикаментозным абортом</label>
                                    <input
                                    type="text"
                                    name="pregnancy.text"
                                    value={ JSON.parse(formData?.pregnancy || '{}')?.textA || '' }
                                    onChange={(e) => handleChangeCheckText('pregnancy', 'textA', e.target.value)}
                                    required
                                    />
                                    <label>Искусственным абортом в сроке</label>
                                    <input
                                    type="text"
                                    name="pregnancy.text"
                                    value={ JSON.parse(formData?.pregnancy || '{}')?.textI || '' }
                                    onChange={(e) => handleChangeCheckText('pregnancy', 'textI', e.target.value)}
                                    required
                                    />
                                    <label>Выкидышем в сроке</label>
                                    <input
                                    type="text"
                                    name="pregnancy.text"
                                    value={ JSON.parse(formData?.pregnancy || '{}')?.textM || '' }
                                    onChange={(e) => handleChangeCheckText('pregnancy', 'textM', e.target.value)}
                                    required
                                    />
                                    <label>Родами в сроке</label>
                                    <input
                                    type="text"
                                    name="pregnancy.text"
                                    value={ JSON.parse(formData?.pregnancy || '{}')?.textC || '' }
                                    onChange={(e) => handleChangeCheckText('pregnancy', 'textC', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17,18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Осложнения беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData?.complications || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('complications', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData?.complications || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('complications', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData?.complications || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Указать какие</label>
                                    <input
                                    type="text"
                                    name="complications.text"
                                    value={ JSON.parse(formData?.complications || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('complications', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[1,2,3,4,5,6,8,9,13].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение гинеколога детского и подросткового возраста (по показаниям):</label>
                    <label>диагноз с учетом МКБ-10</label>
                    <input
                    type="text"
                    name="conclusion_pediatric_gynecologist"
                    value={ JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.text || '' }
                    onChange={(e) => handleChangeCheckText('conclusion_pediatric_gynecologist', 'text', e.target.value)}
                    required
                    />
                </div>
                <div className="form-group" style={[11].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение гинеколога детского и подросткового возраста:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Здорова. Явка в 11 лет(10 лет и 6 мес. -11 лет 5 мес. 29 дней)" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 1)}
                                />
                                Здорова. Явка в 12 лет (11 лет 6 мес. - 12 лет 5 мес. 29 дней)<br/>
                                <input 
                                type="radio" 
                                value="диагноз с учетом МКБ-10" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 2)}
                                />
                                диагноз с учетом МКБ-10<br/>
                            </div>
                            {(JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input
                                    type="text"
                                    name="conclusion_pediatric_gynecologist.text"
                                    value={ JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('conclusion_pediatric_gynecologist', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[7,10].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение гинеколога детского и подросткового возраста:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Здорова. Явка в 11 лет(10 лет и 6 мес. -11 лет 5 мес. 29 дней)" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 1)}
                                />
                                Здорова. Явка в 11 лет(10 лет и 6 мес. -11 лет 5 мес. 29 дней)<br/>
                                <input 
                                type="radio" 
                                value="диагноз с учетом МКБ-10" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 2)}
                                />
                                диагноз с учетом МКБ-10<br/>
                            </div>
                            {(JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input
                                    type="text"
                                    name="conclusion_pediatric_gynecologist.text"
                                    value={ JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('conclusion_pediatric_gynecologist', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[12,14,15,16,17].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение гинеколога детского и подросткового возраста:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Здорова. Явка в 11 лет(10 лет и 6 мес. -11 лет 5 мес. 29 дней)" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 1)}
                                />
                                Здорова. Явка в {ageChild + 1} лет({ageChild} лет и 6 мес. - {ageChild + 1} лет 5 мес. 29 дней)<br/>
                                <input 
                                type="radio" 
                                value="диагноз с учетом МКБ-10" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 2)}
                                />
                                диагноз с учетом МКБ-10<br/>
                            </div>
                            {(JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input
                                    type="text"
                                    name="conclusion_pediatric_gynecologist.text"
                                    value={ JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('conclusion_pediatric_gynecologist', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group" style={[18].includes(ageChild) ? displayVisible : displayInvisible}>
                    <label>Заключение гинеколога детского и подросткового возраста:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="Здорова. Явка в 11 лет(10 лет и 6 мес. -11 лет 5 мес. 29 дней)" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 1)}
                                />
                                Здорова.<br/>
                                <input 
                                type="radio" 
                                value="диагноз с учетом МКБ-10" 
                                checked={JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText('conclusion_pediatric_gynecologist', 'id', 2)}
                                />
                                диагноз с учетом МКБ-10<br/>
                            </div>
                            {(JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <input
                                    type="text"
                                    name="conclusion_pediatric_gynecologist.text"
                                    value={ JSON.parse(formData?.conclusion_pediatric_gynecologist || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText('conclusion_pediatric_gynecologist', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Степень риска репродуктивных нарушений:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="низкая" 
                                checked={(formData || '{}')?.degree_risk_reproductive_disorders === 1} 
                                onChange={() => handleChangeCheck(1, 'degree_risk_reproductive_disorders')}
                                />
                                низкая<br/>
                                <input 
                                type="radio" 
                                value="средняя" 
                                checked={(formData || '{}')?.degree_risk_reproductive_disorders === 2} 
                                onChange={() => handleChangeCheck(2, 'degree_risk_reproductive_disorders')}
                                />
                                средняя<br/>
                                <input 
                                type="radio" 
                                value="высокая" 
                                checked={(formData || '{}')?.degree_risk_reproductive_disorders === 3} 
                                onChange={() => handleChangeCheck(3, 'degree_risk_reproductive_disorders')}
                                />
                                высокая<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Особые отметки и рекомендации:</label>
                    <input
                    type="text"
                    name="special_marks"
                    value={formData.special_marks ? formData.special_marks : ''}
                    onChange={(e) => handleChangeCheck(e.target.value, 'special_marks')}
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

const displayVisible = {
  display: ''
};

const displayInvisible = {
  display: 'none'
};

export default AssessmentStatus;