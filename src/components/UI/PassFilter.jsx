import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from './select/Select';
import InputDate from './inputDate/InputDate';
import InputText from './inputText/InputText';
import BlueButton from './blueButton/BlueButton';
import GreenButton from './greenButton/GreenButton';

const PassFilter = ({ filter, setFilter, selectedRow, updateBtnRef, searchBtnRef,openBtnRef }) => {
    const navigate = useNavigate();
    const statusSelectRef = useRef(null);
    const datefromRef = useRef(null);
    const datetoRef = useRef(null);
    const passIdRef = useRef(null);

    // События для полей с датой
    // dateInputs.forEach(input => {
    //     input.addEventListener('focus', function (event) {
    //         var leftFromDate = event.target.parentNode.children[0];
    //         leftFromDate.style.borderColor = '#3898ec';
    //         event.target.style.borderColor = '#3898ec';
    //         leftFromDate.style.outline = '0';
    //     });
    //     input.addEventListener('blur', (event) => {
    //         var leftFromDate = event.target.parentNode.children[0];
    //         leftFromDate.style.borderColor = '#ccc';
    //         event.target.style.borderColor = '#ccc';
    //         leftFromDate.style.outline = '0';
    //     });
    //     input.addEventListener('click', (event) => {
    //         var leftFromDate = event.target.parentNode.children[0];
    //         leftFromDate.style.borderColor = '#3898ec';
    //         event.target.style.borderColor = '#3898ec';
    //         leftFromDate.style.outline = '0';
    //     });
    //     input.addEventListener('input', (event) => {
    //         if (event.target.value != '') {
    //             var leftFromDate = event.target.parentNode.children[0];
    //             leftFromDate.style.borderColor = '#ccc';
    //             event.target.style.borderColor = '#ccc';
    //             leftFromDate.style.outline = '0';
    //         }
    //     });
    // });
    // Открыть пропуск при помощи кнопки

    // Обновить таблицу, сбросить фильтры
    function updateFilters() {
        setFilter({ id: '', datefrom: '', dateto: '', status: '' })
        openBtnRef.current.style.display = 'none'
        statusSelectRef.current.value = ''
        datefromRef.current.value = ''
        datetoRef.current.value = ''
        passIdRef.current.value = ''
    }

    // При повторном нажатии на серую строку
    useEffect(() => {
        if (!selectedRow) openBtnRef.current.style.display = 'none'
        else openBtnRef.current.style.display = 'block'
    }, [selectedRow])

    return (
        <div id="options">
            <div id="left_options">
                <InputText
                    name="pass_id"
                    id="pass_id"
                    placeholder="Номер или код пропуска"
                    value={filter.pass_id || ''}
                    onChange={e => setFilter({ ...filter, pass_id: e.target.value })}
                    ref={passIdRef} />
                <BlueButton value="ПОИСК" id="search" ref={searchBtnRef} />
                <InputDate
                    name="datefrom"
                    id="datefrom"
                    value={filter.datefrom}
                    onChange={e => setFilter({ ...filter, datefrom: e.target.value })}
                    ref={datefromRef} />
                <InputDate
                    name="dateto"
                    id="dateto"
                    value={filter.dateto}
                    onChange={e => setFilter({ ...filter, dateto: e.target.value })}
                    ref={datetoRef} />
                <Select
                    ref={statusSelectRef}
                    onChange={e => setFilter({ ...filter, status: e.target.value })} />
                <BlueButton value="ОБНОВИТЬ" id="update" onClick={updateFilters} ref={updateBtnRef} />
            </div>
            <div id="right_options">
                <GreenButton value="ОТКРЫТЬ" id="open_pass" onClick={() => navigate(`/pass/:${selectedRow}`)} ref={openBtnRef} />
                <BlueButton value="ДОБАВИТЬ" id="add_pass" onClick={() => navigate(`/pass`)} />
            </div>
        </div>
    )
}

export default PassFilter