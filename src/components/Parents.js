import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Parents() {

const location = useLocation();
const passedData = location.state;
const [formData, setFormData] = useState([
    ... passedData.patient
    ]
);
const navigate = useNavigate();
const { id } = useParams();
const fatherid = formData[0].parent_type === "father" ? 0 : 1
const motherid = formData[0].parent_type === "mother" ? 0 : 1

const handleSubmit = async (e) => {
    try {
    await axios.put(`/patients/${id}`, { type: 'Parents', formData });
    toast.success('Данные пациента обновлены');
    } catch (error) {
    console.error('Error updating patient:', error);
    toast.error('Ошибка при обновлении данных');
    }
};

const handleChangeCheck = (id, element, name) => {
    const array = formData
    array[id][name] = element
    setFormData([
        ...array
    ]);
};

const handleChangeCheckText = (pid, name, nameType, param, flagActive) => {
    let object = JSON.parse(formData[pid][name])
    object = object ? object : {}
    if(flagActive && object[nameType]) {
        delete object[nameType]
    } else {
        object[nameType] = param
    }
    const array = formData
    const t = JSON.stringify(object)
    array[pid][name] = t
    setFormData([
        ...array
    ]
    );
};

return (
    <div className="data-container">
        <div className="data-card">
            <h1>Сведения о родителях</h1>
            <h2>Отец</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Рост(см)</label>
                    <input
                    type="text"
                    name="surname"
                    value={formData[fatherid].height ? formData[fatherid].height : ''}
                    onChange={(e) => handleChangeCheck(fatherid, e.target.value, 'height')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Вес</label>
                    <input
                    type="text"
                    name="name"
                    value={formData[fatherid].weight ? formData[fatherid].weight : ''}
                    onChange={(e) => handleChangeCheck(fatherid, e.target.value, 'weight')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Телосложение:</label>
                    <div className="radio-group">
                        <input type="radio" value="нормостеническое" checked={formData[fatherid].physique === 1} onChange={() => handleChangeCheck(fatherid, 1, 'physique')}/>
                        нормостеническое<br/>
                        <input type="radio" value="астеническое" checked={formData[fatherid].physique === 2} onChange={() => handleChangeCheck(fatherid, 2, 'physique')}/>
                        астеническое<br/>
                        <input type="radio" value="гиперстеническое" checked={formData[fatherid].physique === 3} onChange={() => handleChangeCheck(fatherid, 3, 'physique')}/>
                        гиперстеническое<br/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Профессиональные вредности до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.prof_damage_child_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'prof_damage_child_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.prof_damage_child_text || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(fatherid, 'prof_damage_child_text', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            <label>Указать какие</label>
                            <input
                            type="text"
                            name="prof_damage_child_text.text"
                            value={ JSON.parse(formData[fatherid]?.prof_damage_child_text || '{}')?.text || '' }
                            onChange={(e) => handleChangeCheckText(fatherid, 'prof_damage_child_text', 'text', e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Вредные привычки до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.bad_habits_variant || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'bad_habits_variant', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.bad_habits_variant || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'bad_habits_variant', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[fatherid]?.bad_habits_variant || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="табакокурение" 
                                        checked={JSON.parse(formData[fatherid]?.bad_habits_variant || '{}')?.id2 === 3} 
                                        onClick={() => handleChangeCheckText(fatherid, 'bad_habits_variant', 'id2', 3, true)}
                                        />
                                        табакокурение<br/>
                                        <input 
                                        type="radio" 
                                        value="употребление психотропных препаратов, в т.ч. наркотиков, алкоголя" 
                                        checked={JSON.parse(formData[fatherid]?.bad_habits_variant || '{}')?.id3 === 4} 
                                        onClick={() => handleChangeCheckText(fatherid, 'bad_habits_variant', 'id3', 4, true)}
                                        />
                                        употребление психотропных препаратов, в т.ч. наркотиков, алкоголя<br/>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Эндокринные, хронические, системные, наследственные заболевания </label>
                    <div className="radio-group-spec">
                    <label>у отца: </label>
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.special_diseas_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'special_diseas_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.special_diseas_text || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'special_diseas_text', 'id', 2)}
                                />
                                да<br/>
                                <label>Указать какие</label>
                                <input
                                type="text"
                                name="special_diseas_text.text"
                                value={JSON.parse(formData[fatherid]?.special_diseas_text || '{}')?.text || '' }
                                onChange={(e) => handleChangeCheckText(fatherid, 'special_diseas_text', 'text', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <label>ближайших родственников: </label>
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.relative_special_diseas_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'relative_special_diseas_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.relative_special_diseas_text || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'relative_special_diseas_text', 'id', 2)}
                                />
                                да<br/>
                                <label>Указать какие</label>
                                <input
                                type="text"
                                name="relative_special_diseas_text.text"
                                value={ JSON.parse(formData[fatherid]?.relative_special_diseas_text || '{}')?.text || '' }
                                onChange={(e) => handleChangeCheckText(fatherid, 'relative_special_diseas_text', 'text', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Косвенные признаки эндокринного дисбаланса:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id > 1} 
                                onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="избыточный вес" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id3', 3, true)}
                                        />
                                        избыточный вес<br/>
                                        <input 
                                        type="radio" 
                                        value="наличие стрий" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id4', 4, true)}
                                        />
                                        наличие стрий<br/>
                                        <input 
                                        type="radio" 
                                        value="рыхлое тело" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id5', 5, true)}
                                        />
                                        рыхлое тело<br/>
                                        <input 
                                        type="radio" 
                                        value="наличие патологического отложения жировой ткани в области живота" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id6', 6, true)}
                                        />
                                        наличие патологического отложения жировой ткани в области живота<br/>
                                        <input 
                                        type="radio" 
                                        value="бедер" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id7', 7, true)}
                                        />
                                        бедер<br/>
                                        <input 
                                        type="radio" 
                                        value="молочных желез" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id8', 8, true)}
                                        />
                                        молочных желез<br/>
                                        <input 
                                        type="radio" 
                                        value="лунообразное лицо" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id9 === 9} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id9', 9, true)}
                                        />
                                        лунообразное лицо<br/>
                                        <input 
                                        type="radio" 
                                        value="скудное оволосение лица" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id10 === 10} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id10', 10, true)}
                                        />
                                        скудное оволосение лица<br/>
                                        <input 
                                        type="radio" 
                                        value="тонкий голос" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id11 === 11} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id11', 11, true)}
                                        />
                                        тонкий голос<br/>
                                        <input 
                                        type="radio" 
                                        value="угревые высыпания" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id12 === 12} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id12', 12, true)}
                                        />
                                        угревые высыпания<br/>
                                        <input 
                                        type="radio" 
                                        value="сальность кожи и волос" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id13 === 13} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id13', 13, true)}
                                        />
                                        сальность кожи и волос<br/>
                                        <input 
                                        type="radio" 
                                        value="андрогенная алопеция" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id14 === 14} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id14', 14, true)}
                                        />
                                        андрогенная алопеция<br/>
                                        <input 
                                        type="radio" 
                                        value="негроидный акантоз кожных складок" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id15 === 15} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id15', 15, true)}
                                        />
                                        негроидный акантоз кожных складок<br/>
                                        <input 
                                        type="radio" 
                                        value="повышение артериального давления" 
                                        checked={JSON.parse(formData[fatherid]?.indirect_signs_endocrine_imbalance || '{}')?.id16 === 16} 
                                        onClick={() => handleChangeCheckText(fatherid, 'indirect_signs_endocrine_imbalance', 'id16', 16, true)}
                                        />
                                        повышение артериального давления<br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные ИППП до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'ippp', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'ippp', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[fatherid]?.ippp || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="вирус простого герпеса" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id3', 3, true)}
                                        />
                                        вирус простого герпеса<br/>
                                        <input 
                                        type="radio" 
                                        value="хламидиоз" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id4', 4, true)}
                                        />
                                        хламидиоз<br/>
                                        <input 
                                        type="radio" 
                                        value="уреа- и микоплазмоз" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id5', 5, true)}
                                        />
                                        уреа- и микоплазмоз<br/>
                                        <input 
                                        type="radio" 
                                        value="трихомониаз" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id6', 6, true)}
                                        />
                                        трихомониаз<br/>
                                        <input 
                                        type="radio" 
                                        value="гонорея" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id7', 7, true)}
                                        />
                                        гонорея<br/>
                                        <input 
                                        type="radio" 
                                        value="ВИЧ/СПИД и другие инфекции" 
                                        checked={JSON.parse(formData[fatherid]?.ippp || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText(fatherid, 'ippp', 'id8', 8, true)}
                                        />
                                        ВИЧ/СПИД и другие инфекции<br/>
                                        <label>Указать какие</label>
                                        <input
                                        type="text"
                                        name="ippp.text"
                                        value={ JSON.parse(formData[fatherid]?.ippp || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(fatherid, 'ippp', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Патология половых органов:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.pathology_genital_organs || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'pathology_genital_organs', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.pathology_genital_organs || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(fatherid, 'pathology_genital_organs', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            <label>Указать какие</label>
                            <input
                            type="text"
                            name="pathology_genital_organs.text"
                            value={JSON.parse(formData[fatherid]?.pathology_genital_organs || '{}')?.text || '' }
                            onChange={(e) => handleChangeCheckText(fatherid, 'pathology_genital_organs', 'text', e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные операции на половых органах, паховых каналах до зачатия данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.operation_sexual_organ || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'operation_sexual_organ', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.operation_sexual_organ || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(fatherid, 'operation_sexual_organ', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            <label>Указать какие</label>
                            <input
                            type="text"
                            name="operation_sexual_organ.text"
                            value={JSON.parse(formData[fatherid]?.operation_sexual_organ || '{}')?.text || '' }
                            onChange={(e) => handleChangeCheckText(fatherid, 'operation_sexual_organ', 'text', e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Наличие бесплодия до и после рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[fatherid]?.infertility || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'infertility', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[fatherid]?.infertility || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(fatherid, 'infertility', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData[fatherid]?.infertility || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать с какого</label>
                                    <input
                                    type="number"
                                    name="infertility.textb"
                                    value={JSON.parse(formData[fatherid]?.infertility || '{}')?.textb || '' }
                                    onChange={(e) => handleChangeCheckText(fatherid, 'infertility', 'textb', e.target.value)}
                                    required
                                    />
                                    <label>по какой</label>
                                    <input
                                    type="number"
                                    name="infertility.texte"
                                    value={JSON.parse(formData[fatherid]?.infertility || '{}')?.texte || '' }
                                    onChange={(e) => handleChangeCheckText(fatherid, 'infertility', 'texte', e.target.value)}
                                    required
                                    />
                                    <label>возрастной период</label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Способ зачатия данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="самостоятельно" 
                                checked={JSON.parse(formData[fatherid]?.method_conception_child || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(fatherid, 'method_conception_child', 'id', 1)}
                                />
                                самостоятельно<br/>
                                <input 
                                type="radio" 
                                value="после лечения отца" 
                                checked={JSON.parse(formData[fatherid]?.method_conception_child || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(fatherid, 'method_conception_child', 'id', 2)}
                                />
                                после лечения отца<br/>
                                <input 
                                type="radio" 
                                value="с помощью инсеминации" 
                                checked={JSON.parse(formData[fatherid]?.method_conception_child || '{}')?.id === 3} 
                                onChange={() => handleChangeCheckText(fatherid, 'method_conception_child', 'id', 3)}
                                />
                                с помощью инсеминации<br/>
                                <input 
                                type="radio" 
                                value="с помощью метода ИКСИ - ЭКО и ПЭ" 
                                checked={JSON.parse(formData[fatherid]?.method_conception_child || '{}')?.id === 4} 
                                onChange={() => handleChangeCheckText(fatherid, 'method_conception_child', 'id', 4)}
                                />
                                с помощью метода ИКСИ - ЭКО и ПЭ<br/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label>Возраст к моменту рождения данного ребёнка(лет)</label>
                    <input
                    type="number"
                    name="age_time_birth_child"
                    value={formData[fatherid]?.age_time_birth_child || ''}
                    onChange={(e) => handleChangeCheck(fatherid, e.target.value, 'age_time_birth_child')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Особые отметки</label>
                    <input
                    type="text"
                    name="special_notes"
                    value={formData.special_notes}
                    onChange={(e) => handleChangeCheck(fatherid, e.target.value, 'special_notes')}
                    />
                </div>
            </form>
            
            <h2>Мать</h2>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Рост(см)</label>
                    <input
                    type="text"
                    name="surname"
                    value={formData[motherid].height ? formData[motherid].height : ''}
                    onChange={(e) => handleChangeCheck(motherid, e.target.value, 'height')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Вес</label>
                    <input
                    type="text"
                    name="name"
                    value={formData[motherid].weight ? formData[motherid].weight : ''}
                    onChange={(e) => handleChangeCheck(motherid, e.target.value, 'weight')}
                    required
                    />
                </div>
                <div className="form-group">
                    <label>Телосложение:</label>
                    <div className="radio-group">
                        <input type="radio" value="нормостеническое" checked={formData[motherid].physique === 1} onChange={() => handleChangeCheck(motherid, 1, 'physique')}/>
                        нормостеническое<br/>
                        <input type="radio" value="астеническое" checked={formData[motherid].physique === 2} onChange={() => handleChangeCheck(motherid, 2, 'physique')}/>
                        астеническое<br/>
                        <input type="radio" value="гиперстеническое" checked={formData[motherid].physique === 3} onChange={() => handleChangeCheck(motherid, 3, 'physique')}/>
                        гиперстеническое<br/>
                    </div>
                </div>
                <div className="form-group">
                    <label>Профессиональные вредности до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.prof_damage_child_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'prof_damage_child_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.prof_damage_child_text || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(motherid, 'prof_damage_child_text', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            <label>Указать какие</label>
                            <input
                            type="text"
                            name="prof_damage_child_text.text"
                            value={ JSON.parse(formData[motherid]?.prof_damage_child_text || '{}')?.text || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'prof_damage_child_text', 'text', e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Вредные привычки до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.bad_habits_variant || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'bad_habits_variant', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.bad_habits_variant || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'bad_habits_variant', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.bad_habits_variant || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="табакокурение" 
                                        checked={JSON.parse(formData[motherid]?.bad_habits_variant || '{}')?.id2 === 3} 
                                        onClick={() => handleChangeCheckText(motherid, 'bad_habits_variant', 'id2', 3, true)}
                                        />
                                        табакокурение<br/>
                                        <input 
                                        type="radio" 
                                        value="употребление психотропных препаратов, в т.ч. наркотиков, алкоголя" 
                                        checked={JSON.parse(formData[motherid]?.bad_habits_variant || '{}')?.id3 === 4} 
                                        onClick={() => handleChangeCheckText(motherid, 'bad_habits_variant', 'id3', 4, true)}
                                        />
                                        употребление психотропных препаратов, в т.ч. наркотиков, алкоголя<br/>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Эндокринные, хронические, системные, наследственные заболевания </label>
                    <div className="radio-group-spec">
                    <label>у матери: </label>
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.special_diseas_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'special_diseas_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.special_diseas_text || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'special_diseas_text', 'id', 2)}
                                />
                                да<br/>
                                <label>Указать какие</label>
                                <input
                                type="text"
                                name="special_diseas_text.text"
                                value={JSON.parse(formData[motherid]?.special_diseas_text || '{}')?.text || '' }
                                onChange={(e) => handleChangeCheckText(motherid, 'special_diseas_text', 'text', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                        <label>ближайших родственников: </label>
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.relative_special_diseas_text || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'relative_special_diseas_text', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.relative_special_diseas_text || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'relative_special_diseas_text', 'id', 2)}
                                />
                                да<br/>
                                <label>Указать какие</label>
                                <input
                                type="text"
                                name="relative_special_diseas_text.text"
                                value={ JSON.parse(formData[motherid]?.relative_special_diseas_text || '{}')?.text || '' }
                                onChange={(e) => handleChangeCheckText(motherid, 'relative_special_diseas_text', 'text', e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Косвенные признаки эндокринного дисбаланса:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id > 1} 
                                onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="избыточный вес" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id3', 3, true)}
                                        />
                                        избыточный вес<br/>
                                        <input 
                                        type="radio" 
                                        value="наличие стрий" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id4', 4, true)}
                                        />
                                        наличие стрий<br/>
                                        <input 
                                        type="radio" 
                                        value="рыхлое тело" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id5', 5, true)}
                                        />
                                        рыхлое тело<br/>
                                        <input 
                                        type="radio" 
                                        value="наличие патологического отложения жировой ткани в области живота" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id6', 6, true)}
                                        />
                                        наличие патологического отложения жировой ткани в области живота<br/>
                                        <input 
                                        type="radio" 
                                        value="бедер" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id7', 7, true)}
                                        />
                                        бедер<br/>
                                        <input 
                                        type="radio" 
                                        value="молочных желез" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id8', 8, true)}
                                        />
                                        молочных желез<br/>
                                        <input 
                                        type="radio" 
                                        value="лунообразное лицо" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id9 === 9} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id9', 9, true)}
                                        />
                                        лунообразное лицо<br/>
                                        <input 
                                        type="radio" 
                                        value="сухая кожа" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id10 === 10} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id10', 10, true)}
                                        />
                                        сухая кожа<br/>
                                        <input 
                                        type="radio" 
                                        value="избыточное оволосение" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id11 === 11} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id11', 11, true)}
                                        />
                                        избыточное оволосение<br/>
                                        <input 
                                        type="radio" 
                                        value="грубый голос" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id12 === 12} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id12', 12, true)}
                                        />
                                        грубый голос<br/>
                                        <input 
                                        type="radio" 
                                        value="угревые высыпания" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id13 === 13} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id13', 13, true)}
                                        />
                                        угревые высыпания<br/>
                                        <input 
                                        type="radio" 
                                        value="сальность кожи и волос" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id14 === 14} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id14', 14, true)}
                                        />
                                        сальность кожи и волос<br/>
                                        <input 
                                        type="radio" 
                                        value="андрогенная алопеция" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id15 === 15} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id15', 15, true)}
                                        />
                                        андрогенная алопеция<br/>
                                        <input 
                                        type="radio" 
                                        value="негроидный акантоз кожных складок" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id16 === 16} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id16', 16, true)}
                                        />
                                        негроидный акантоз кожных складок<br/>
                                        <input 
                                        type="radio" 
                                        value="повышение артериального давления" 
                                        checked={JSON.parse(formData[motherid]?.indirect_signs_endocrine_imbalance || '{}')?.id17 === 17} 
                                        onClick={() => handleChangeCheckText(motherid, 'indirect_signs_endocrine_imbalance', 'id17', 17, true)}
                                        />
                                        повышение артериального давления<br/>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Менструальный цикл до зачатия данного ребенка: </label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="менархе в(лет)" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.menarh === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'menarh', 1, true)}
                                />
                                менархе в<br/>
                                {(JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.menarh === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="number"
                                        name="menstrual_cycle.menarh_text"
                                        value={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.menarh_text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'menstrual_cycle', 'menarh_text', e.target.value)}
                                        required
                                        />
                                        лет<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="установился сразу" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id2 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id2', 2, true)}
                                />
                                установился сразу<br/>
                                <input 
                                type="radio" 
                                value="через (месяцев/лет)" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id3 === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id3', 1, true)}
                                />
                                через (месяцев/лет)<br/>
                                {(JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id3 === 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="месяцев" 
                                        checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id3type === 1} 
                                        onChange={() => handleChangeCheckText(motherid, 'infertility', 'id3type', 1)}
                                        />
                                        месяцев<br/>
                                        <input 
                                        type="radio" 
                                        value="лет" 
                                        checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id3type === 2} 
                                        onChange={() => handleChangeCheckText(motherid, 'infertility', 'id3type', 2)}
                                        />
                                        лет<br/>
                                        <input
                                        type="number"
                                        name="menstrual_cycle.id3_text"
                                        value={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id3_text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'menstrual_cycle', 'id3_text', e.target.value)}
                                        required
                                        />
                                        <br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="регулярный/нерегулярный до зачатия" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id4 === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id4', 1, true)}
                                />
                                регулярный/нерегулярный до зачатия<br/>
                                {(JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id4 === 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="регулярный" 
                                        checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id4type === 1} 
                                        onChange={() => handleChangeCheckText(motherid, 'infertility', 'id4type', 1)}
                                        />
                                        регулярный<br/>
                                        <input 
                                        type="radio" 
                                        value="нерегулярный" 
                                        checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id4type === 2} 
                                        onChange={() => handleChangeCheckText(motherid, 'infertility', 'id4type', 2)}
                                        />
                                        нерегулярный<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="по _ дней" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id5 === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id5', 1, true)}
                                />
                                по дней<br/>
                                {(JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id5 === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="number"
                                        name="menstrual_cycle.id5_text"
                                        value={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id5_text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'menstrual_cycle', 'id5_text', e.target.value)}
                                        required
                                        />
                                        дней<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="через _ дней" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id6 === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id6', 1, true)}
                                />
                                через дней<br/>
                                {(JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id6 === 1) && (
                                    <div className="radio-group">
                                        <input
                                        type="number"
                                        name="menstrual_cycle.id6_text"
                                        value={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id6_text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'menstrual_cycle', 'id6_text', e.target.value)}
                                        required
                                        />
                                        дней<br/>
                                    </div>
                                )}
                                <input 
                                type="radio" 
                                value="менструации болезненные" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id7 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id7', 2, true)}
                                />
                                менструации болезненные<br/>
                                <input 
                                type="radio" 
                                value="безболезненные" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id8 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id8', 2, true)}
                                />
                                безболезненные<br/>
                                <input 
                                type="radio" 
                                value="умеренные" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id9 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id9', 2, true)}
                                />
                                умеренные<br/>
                                <input 
                                type="radio" 
                                value="скудные" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id10 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id10', 2, true)}
                                />
                                скудные<br/>
                                <input 
                                type="radio" 
                                value="обильные" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id11 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id11', 2, true)}
                                />
                                обильные<br/>
                                <input 
                                type="radio" 
                                value="более 7 дней" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id12 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id12', 2, true)}
                                />
                                более 7 дней<br/>
                                <input 
                                type="radio" 
                                value="менее 7 дней" 
                                checked={JSON.parse(formData[motherid]?.menstrual_cycle || '{}')?.id13 === 2} 
                                onClick={() => handleChangeCheckText(motherid, 'menstrual_cycle', 'id13', 2, true)}
                                />
                                менее 7 дней<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные гинекологические заболевания до зачатия и во время беременности данным ребенком:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="эктопия шейки матки" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id3', 3, true)}
                                        />
                                        эктопия шейки матки<br/>
                                        <input 
                                        type="radio" 
                                        value="воспалительные заболевания придатков" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id4', 4, true)}
                                        />
                                        воспалительные заболевания придатков<br/>
                                        <input 
                                        type="radio" 
                                        value="эндометриоз" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id5', 5, true)}
                                        />
                                        эндометриоз<br/>
                                        <input 
                                        type="radio" 
                                        value="поликистозные яичники" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id6', 6, true)}
                                        />
                                        поликистозные яичники<br/>
                                        <input 
                                        type="radio" 
                                        value="нарушения менструального цикла" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id7', 7, true)}
                                        />
                                        нарушения менструального цикла<br/>
                                        <input 
                                        type="radio" 
                                        value="миома матки" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id8', 8, true)}
                                        />
                                        миома матки<br/>
                                        <input 
                                        type="radio" 
                                        value="киста яичника и другие" 
                                        checked={JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.id9 ===9} 
                                        onClick={() => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'id9', 9, true)}
                                        />
                                        киста яичника и другие<br/>
                                        <label>Указать какие</label>
                                        <input
                                        type="text"
                                        name="previous_gynecological_diseases.text"
                                        value={ JSON.parse(formData[motherid]?.previous_gynecological_diseases || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'previous_gynecological_diseases', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные ИППП до рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'ippp', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'ippp', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.ippp || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="вирус простого герпеса" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id3', 3, true)}
                                        />
                                        вирус простого герпеса<br/>
                                        <input 
                                        type="radio" 
                                        value="хламидиоз" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id4', 4, true)}
                                        />
                                        хламидиоз<br/>
                                        <input 
                                        type="radio" 
                                        value="уреа- и микоплазмоз" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id5', 5, true)}
                                        />
                                        уреа- и микоплазмоз<br/>
                                        <input 
                                        type="radio" 
                                        value="трихомониаз" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id6', 6, true)}
                                        />
                                        трихомониаз<br/>
                                        <input 
                                        type="radio" 
                                        value="гонорея" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id7 === 7} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id7', 7, true)}
                                        />
                                        гонорея<br/>
                                        <input 
                                        type="radio" 
                                        value="ВИЧ/СПИД и другие инфекции" 
                                        checked={JSON.parse(formData[motherid]?.ippp || '{}')?.id8 === 8} 
                                        onClick={() => handleChangeCheckText(motherid, 'ippp', 'id8', 8, true)}
                                        />
                                        ВИЧ/СПИД и другие инфекции<br/>
                                        <label>Указать какие</label>
                                        <input
                                        type="text"
                                        name="ippp.text"
                                        value={ JSON.parse(formData[motherid]?.ippp || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'ippp', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенная химио- и/или лучевая терапия до зачатия и во время беременности данным ребенком:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.previous_chemotherapy_therapy || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'previous_chemotherapy_therapy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.previous_chemotherapy_therapy || '{}')?.id > 1} 
                                onClick={() => handleChangeCheckText(motherid, 'previous_chemotherapy_therapy', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.previous_chemotherapy_therapy || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <label>Указать какие</label>
                                        <input
                                        type="text"
                                        name="previous_chemotherapy_therapy.text"
                                        value={ JSON.parse(formData[motherid]?.previous_chemotherapy_therapy || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'previous_chemotherapy_therapy', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Перенесенные гинекологические операции до зачатия данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.gynecological_operation || '{}')?.id === 1} 
                                onClick={() => handleChangeCheckText(motherid, 'gynecological_operation', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.gynecological_operation || '{}')?.id > 1} 
                                onClick={() => handleChangeCheckText(motherid, 'gynecological_operation', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.gynecological_operation || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <label>Указать какие</label>
                                        <input
                                        type="text"
                                        name="gynecological_operation.text"
                                        value={ JSON.parse(formData[motherid]?.gynecological_operation || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'gynecological_operation', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Наличие бесплодия до и после рождения данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'infertility', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.infertility || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(motherid, 'infertility', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData[motherid]?.infertility || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>указать с какого</label>
                                    <input
                                    type="number"
                                    name="infertility.textb"
                                    value={JSON.parse(formData[motherid]?.infertility || '{}')?.textb || '' }
                                    onChange={(e) => handleChangeCheckText(motherid, 'infertility', 'textb', e.target.value)}
                                    required
                                    />
                                    <label>по какой</label>
                                    <input
                                    type="number"
                                    name="infertility.texte"
                                    value={JSON.parse(formData[motherid]?.infertility || '{}')?.texte || '' }
                                    onChange={(e) => handleChangeCheckText(motherid, 'infertility', 'texte', e.target.value)}
                                    required
                                    />
                                    <label>возрастной период</label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Контрацепция накануне беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id > 1} 
                                onChange={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id', 2)}
                                />
                                да<br/>
                                {(JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id > 1) && (
                                    <div className="radio-group">
                                        <input 
                                        type="radio" 
                                        value="презерватив" 
                                        checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id3 === 3} 
                                        onClick={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id3', 3, true)}
                                        />
                                        презерватив<br/>
                                        <input 
                                        type="radio" 
                                        value="прерванный половой акт" 
                                        checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id4 === 4} 
                                        onClick={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id4', 4, true)}
                                        />
                                        прерванный половой акт<br/>
                                        <input 
                                        type="radio" 
                                        value="ВМС" 
                                        checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id5 === 5} 
                                        onClick={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id5', 5, true)}
                                        />
                                        ВМС<br/>
                                        <input 
                                        type="radio" 
                                        value="КОК" 
                                        checked={JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.id6 === 6} 
                                        onClick={() => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'id6', 6, true)}
                                        />
                                        КОК<br/>
                                        <label>другие</label>
                                        <input
                                        type="text"
                                        name="contraception_eve_pregnancy.text"
                                        value={ JSON.parse(formData[motherid]?.contraception_eve_pregnancy || '{}')?.text || '' }
                                        onChange={(e) => handleChangeCheckText(motherid, 'contraception_eve_pregnancy', 'text', e.target.value)}
                                        required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Беременности:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <label>общее число</label>
                            <input
                            type="number"
                            name="infertility.id"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.id || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'id', e.target.value)}
                            required
                            />
                            <label>в том числе абортов</label>
                            <input
                            type="number"
                            name="infertility.id2"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.id2 || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'id2', e.target.value)}
                            required
                            />
                            <label>самопроизвольных выкидышей</label>
                            <input
                            type="number"
                            name="infertility.id3"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.id3 || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'id3', e.target.value)}
                            required
                            />
                            <label>родов</label>
                            <input
                            type="number"
                            name="infertility.id4"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.id4 || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'id4', e.target.value)}
                            required
                            />
                            <label>число</label>
                            <input
                            type="number"
                            name="infertility.id5"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.id5 || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'id5', e.target.value)}
                            required
                            />
                            <label>и исход беременностей до зачатия ребенка</label>
                            <label>указать</label>
                            <input
                            type="text"
                            name="infertility.text"
                            value={JSON.parse(formData[motherid]?.pregnancy || '{}')?.text || '' }
                            onChange={(e) => handleChangeCheckText(motherid, 'pregnancy', 'text', e.target.value)}
                            required
                            />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Способ зачатия данного ребенка:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="самостоятельно" 
                                checked={JSON.parse(formData[motherid]?.method_conception_child || '{}')?.id3 === 3} 
                                onClick={() => handleChangeCheckText(motherid, 'method_conception_child', 'id3', 3, true)}
                                />
                                самостоятельно<br/>
                                <input 
                                type="radio" 
                                value="с помощью экстракорпорального оплодотворения и переноса эмбриона" 
                                checked={JSON.parse(formData[motherid]?.method_conception_child || '{}')?.id4 === 4} 
                                onClick={() => handleChangeCheckText(motherid, 'method_conception_child', 'id4', 4, true)}
                                />
                                с помощью экстракорпорального оплодотворения и переноса эмбриона<br/>
                                <input 
                                type="radio" 
                                value="с помощью инсеминации" 
                                checked={JSON.parse(formData[motherid]?.method_conception_child || '{}')?.id5 === 5} 
                                onClick={() => handleChangeCheckText(motherid, 'method_conception_child', 'id5', 5, true)}
                                />
                                с помощью инсеминации<br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Попытка прервать беременность:</label>
                    <div className="radio-group-spec">
                        <div className="form-group">
                            <div className="radio-group">
                                <input 
                                type="radio" 
                                value="нет" 
                                checked={JSON.parse(formData[motherid]?.attempt_terminate_pregnancy || '{}')?.id === 1} 
                                onChange={() => handleChangeCheckText(motherid, 'attempt_terminate_pregnancy', 'id', 1)}
                                />
                                нет<br/>
                                <input 
                                type="radio" 
                                value="да" 
                                checked={JSON.parse(formData[motherid]?.attempt_terminate_pregnancy || '{}')?.id === 2} 
                                onChange={() => handleChangeCheckText(motherid, 'attempt_terminate_pregnancy', 'id', 2)}
                                />
                                да<br/>
                            </div>
                            {(JSON.parse(formData[motherid]?.attempt_terminate_pregnancy || '{}')?.id > 1) && (
                                <div className="radio-group">
                                    <label>Указать чем</label>
                                    <input
                                    type="text"
                                    name="prof_damage_child_text.text"
                                    value={ JSON.parse(formData[motherid]?.attempt_terminate_pregnancy || '{}')?.text || '' }
                                    onChange={(e) => handleChangeCheckText(motherid, 'attempt_terminate_pregnancy', 'text', e.target.value)}
                                    required
                                    />
                                </div>
                            )}
                            
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label>Возраст к моменту рождения данного ребёнка(лет)</label>
                    <input
                    type="number"
                    name="age_time_birth_child"
                    value={formData[motherid]?.age_time_birth_child || ''}
                    onChange={(e) => handleChangeCheck(motherid, e.target.value, 'age_time_birth_child')}
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

export default Parents;