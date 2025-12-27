import React from 'react'
import { GoSearch } from "react-icons/go";
import './Search.css'

export default function Search({ placeholder }) {
    return (
        <div className="left-panel-options-container">
            <div className="search-container">
                <label htmlFor="search">
                    <GoSearch className='search-icon' />
                </label>
                <input id='search' type="text" placeholder={placeholder || 'Search...'} />
            </div>
        </div>
    )
}
