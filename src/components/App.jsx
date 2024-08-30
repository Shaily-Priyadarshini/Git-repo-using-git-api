
import Body from './Body'
import Header from './Header'
import { useState ,useEffect} from 'react';

function App() {

  const [totalResult,setTotal]=useState(0);
  const [userInfo,setUserInfo]=useState([]);
  const [query,setQuery] = useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [resultStatus,setResultStatus]=useState(true);
  const [page,setPage]=useState(1);
  const [sortBy, setSortBy]=useState("")

    useEffect(()=>{
        const controller=new AbortController();
        async function fetchData(){
            try {
            
              setLoading(true)
              setError(false)
              setPage(1)
              const data=await fetch('https://api.github.com/search/users?q='+query,{signal:controller.signal})
              const res= await (data.json());
              // console.log(res)
              setUserInfo(res.items)
              setResultStatus(res.incomplete_results)
              // console.log(resultStatus)
              // console.log(totalResult)
              setTotal(res.items.length)
              setLoading(false)
            } catch (error) {
              setError(true)
              setLoading(false)
              
            }
            
        }
        if (query){
          fetchData();
        }
        
        
        return


    },[query]);
    




  return (
    <>
      <Header query={query} 
              setQuery={setQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}/>
      

      <Body totalResult={totalResult} 
            userInfo={userInfo}
            error={error}
            loading={loading}
            resultStatus={resultStatus}
            query={query}
            page={page}
            setPage={setPage}
            sortBy={sortBy}
            />
    </>
  )
}

export default App
