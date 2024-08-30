import { useEffect, useState } from "react";
import NameCard from "./NameCard.jsx";
const Body=({totalResult, userInfo,error,resultStatus,loading,query,page,setPage,sortBy})=>
    {
   
    const [sortedItems, setSortedItems] = useState([]);

    useEffect(() => {
        if (userInfo && userInfo.length > 0) {
            let sortedArray = [...userInfo];

            switch (sortBy) {
                case "loginAsc":
                    sortedArray.sort((a, b) => a.login.localeCompare(b.login));
                    break;
                case "loginDesc":
                    sortedArray.sort((a, b) => a.id - b.id);
                    break;
                case "id-asc":
                    sortedArray.sort((a, b) => b.id - a.id);
                    break;
                default:
                    break;
            }

            setSortedItems(sortedArray);
        }
    }, [userInfo, sortBy]);
    

    const selectPageHandler=(selectedPage)=>{
        if (selectedPage>=1 && selectedPage<=8)
        setPage(selectedPage);
    }


    

    return(
        <div className="container">
            {error &&  <h1 className="loading">Something went wrong!!!</h1>}      
            {!loading && !resultStatus && !totalResult &&  <h1 className="loading"> No results found!!!</h1>}
            {loading&&<h1 className="loading">Searching.... for "{query}"</h1>}
            {!loading && totalResult?<span>Total Results :{userInfo.length}</span>:""}
            {!loading && sortedItems?.slice(page*4-4,page*4).map((info)=><NameCard info={info} key={info.id}/>)}
            {!loading && totalResult>0 && <div className="pagination">
                <span onClick={()=> selectPageHandler(page-1)}
                    className={page>1?"":"pagination__disable"}     
                >◀</span>

                <span>{page}</span>
                
                <span onClick={()=> selectPageHandler(page+1)}
                    className={page<8?"":"pagination__disable"}
                    >▶</span>
                </div>}
        </div>
    )

}
export default Body;