import React from 'react'
import { GoSearch } from "react-icons/go";
import './Search.css'

export default function Search({ placeholder, id }) {
    return (
        <div className="left-panel-options-container">
            <div className="search-container">
                <label htmlFor={id}>
                    <GoSearch className='search-icon' />
                </label>
                <input id={id} type="text" placeholder={placeholder || 'Search...'} />
            </div>
        </div>
    )
}
