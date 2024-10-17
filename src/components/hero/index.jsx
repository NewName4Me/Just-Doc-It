import React from 'react'
import { Link } from 'react-router-dom';

function index() {
    return (
        <>
            <Link to="/upload">
                <button className='btn btn-primary'>Quiero un botón</button>
            </Link>

        </>
    )
}

export default index
