import React from 'react'
import logoBlack from '@assets/logoBlack.png'

function buttons() {
    return (
        <div className='ml-[-1.5rem] flex space-x-64'>

            <select name="language" id="language" className='mx-4 select select-success text-white'>
                <option value="null">Select a Language</option>
                <option value="js">Javascript (.js)</option>
                <option value="php" disabled>PHP (.php)</option>
                <option value="py" disabled>Python (.py)</option>
            </select>

            <button type='submit' className='btn btn-warning flex items-center justify-center relative w-48'>
                <img src={logoBlack} alt="" className='w-6 absolute left-8' />
                <p className='pl-8'>Generar Docs</p>
            </button>
        </div>
    )
}

export default buttons