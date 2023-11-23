import React from 'react'
import { useParams } from 'react-router-dom';

const Pass = () => {
    const params = useParams();
    console.log(params);
    return (
        <div id='pass'>{params.id}</div>
    )
}

export default Pass