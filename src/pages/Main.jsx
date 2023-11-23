import React, { useState, useRef, useEffect } from "react";
import logo from "../img/rusal.png";
import Table from '../components/UI/table/Table';
import PassFilter from "../components/UI/PassFilter";
import '../css/Main.scss';

const Main = () => {
    const [filter, setFilter] = useState({ pass_id: '', datefrom: '', dateto: '', status: '' })
    const [selectedRow, setSelectedRow] = useState(null);
    const updateBtnRef = useRef(null)
    const searchBtnRef = useRef(null)
    const openBtnRef = useRef(null)
    const addTriangleRef = useRef(null); // Cсылка из Table, чтобы таблица не перезагружалась при вводе в инпуты
    const jsonTable = [
        {
            pass_id: "7533251a6781fd09e1bcabc04395dba7",
            comment: "Первый",
            status: "Приостановлен",
            type: "Временный",
            number: "12345",
            type_period: "Временный",
            datefrom: "2023-11-04",
            organization: "Хабр",
            dateto: "2023-11-05",
        },
        {
            pass_id: "d679a3e59297a3876403cf4d0389677a",
            status: "Приостановлен",
            comment: "Второй",
            type: "Постоянный",
            type_period: "Временный",
            number: "0987",
            organization: "Medium",
            dateto: "2023-12-18",
            datefrom: "2023-12-04",
        },
        {
            pass_id: "d3b26dcd383f999a63baa6443ed27242",
            status: "Изъят",
            comment: "Третий",
            type: "Разовый",
            type_period: "Постоянный",
            number: "3333",
            organization: "dev.to",
            dateto: "2023-11-18",
            datefrom: "2023-11-14",
        }];
    const [sortedArr, setSortedArr] = useState(jsonTable);

    // Событие на кнопку ОБНОВИТЬ
    useEffect(() => {
        const updateBtn = updateBtnRef.current;
        const updatePassHandler = () => {
            setSortedArr(jsonTable);
            setSelectedRow(null)
            addTriangleRef.current();
        };
        if (updateBtn) {
            updateBtn.addEventListener('click', updatePassHandler);
            return () => updateBtn.removeEventListener('click', updatePassHandler);
        }
    }, [updateBtnRef]);

    // Событие на кнопку поиска по фильтрам
    useEffect(() => {
        const searchBtn = searchBtnRef.current;
        if (searchBtn) {
            searchBtn.addEventListener('click', searchPass);
            return () => searchBtn.removeEventListener('click', searchPass);
        };
    }, [searchBtnRef, filter]);

    // Поиск элемента по фильтрам
    function searchPass() {
        setSortedArr(
            jsonTable.filter(objTable => {
                // Проверяем, что все ключи и значения из jsonInputsData совпадают с соответствующими ключами и значениями в объекте из jsonTable
                let allMatch = true;
                Object.keys(filter).filter(x => filter[x] !== '').forEach(key => {
                    if (key === 'pass_id') {
                        if (!objTable[key].includes(filter[key]) && !objTable['number'].includes(filter[key])) {
                            allMatch = false;
                            return; // Выход из forEach, если хотя бы одно не совпадает
                        }
                    }
                    else if (!objTable[key].includes(filter[key])) {
                        allMatch = false;
                        return; // Выход из forEach, если хотя бы одно не совпадает
                    }
                });
                return allMatch;
            })
        );
        addTriangleRef.current();
    };

    // Прячем кнопку если в отсортированно списке нет этого пропуска
    useEffect(() => {
        if (!sortedArr.find(searchElement => searchElement['pass_id'] === selectedRow))
            openBtnRef.current.style.display = 'none';
    }, [sortedArr, selectedRow]);

    return (
        <div id="center-main">
            <div id="title">
                <img src={logo} alt="rusal" width="45" height="50" />
                <div id="title-content">Эл. Проходная</div>
            </div>
            <PassFilter filter={filter}
                setFilter={setFilter} selectedRow={selectedRow}
                openBtnRef={openBtnRef} updateBtnRef={updateBtnRef} searchBtnRef={searchBtnRef} />
            <div id="data-container">
                <Table sortedArr={sortedArr} setSortedArr={setSortedArr}
                    selectedRow={selectedRow} setSelectedRow={setSelectedRow}
                    addTriangleRef={addTriangleRef} />
            </div>
        </div>
    )
}

export default Main