import React from 'react'
import cl from './Select.module.css'

const Select = React.forwardRef((props, ref) => {
    // const Select = React.forwardRef(({ filter, setFilter }) => {
    // selectStatusPass.addEventListener('focus', e => e.target.style.borderColor = '#3898ec');
    // selectStatusPass.addEventListener('blur', e => e.target.style.borderColor = '#ccc');
    // selectStatusPass.addEventListener('change', e => { e.target.style.borderColor = '#ccc'; e.target.blur(); });
    const status = ['Действителен', 'Приостановлен', 'Просрочен', 'Изъят']
    return (
        <select ref={ref} {...props} className={cl.Select} name="status" placeholder="Статус пропуска" defaultValue="">
            <option value="" disabled hidden>Статус пропуска</option>
            {status.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    )
})

export default Select