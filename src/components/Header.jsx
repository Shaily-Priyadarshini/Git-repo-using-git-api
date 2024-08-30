import { useState } from "react";

const Header=({query,setQuery,sortBy,setSortBy})=>{

    const [input,setInput]=useState("");
    const handleSearchClick=()=>{
        setQuery(input);
        setInput("")

    }
    

    return(
        <div className="header">
            <div className="header-child">
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                    className="option" id="cars" name="cars">
                    <option value="loginAsc">Name (A-Z)</option>
                    <option value="loginDesc">Name (Z-A)</option>
                    <option value="id-asc">Id ↑ </option>
                    <option value="id-dsc">Id ↓</option>
                </select>
                <div className="wrapper">
                <input
                    className="inputbox"
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e)=>e.key==='Enter'&& handleSearchClick()
                    }
                    
                />
                <button onClick={handleSearchClick}> 🔍</button>
                </div>
            </div>
        </div>
    )
}

export default Header;