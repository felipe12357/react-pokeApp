import { ChangeEvent, useEffect, useRef, useState } from "react";
import { pokeService } from "../../utils/axios.service";
import './inputAheadSearchComponent.scss';
import { useNavigate } from "react-router-dom";


export const InputAheadSearchComponent = () =>{

    const [searchResults,setSearchResults] = useState<{name:string}[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [notResult,setNotResult] = useState<boolean>(false);

    const inputSearchRef = useRef<HTMLInputElement>(null);
    const timeoutRef = useRef<number | undefined | NodeJS.Timeout>();
    const navigate = useNavigate();

    useEffect(()=>{
        if (timeoutRef.current) 
            clearTimeout(timeoutRef.current);
    },[])

    const handleChange =(event:ChangeEvent<HTMLInputElement>) =>{
    
        setIsLoading(true);
        setNotResult(false);

        (timeoutRef.current) && clearTimeout(timeoutRef.current as number);

        const searchText = event.target.value.toLowerCase();
        timeoutRef.current = setTimeout(async()=>{
            if(searchText!==''){
                let search = await pokeService.filterSearch(searchText);
                if(search){
                    if(search.length>4) { 
                        search =search.slice(0,3);
                    }
                    setSearchResults(search);
                    setIsLoading(false);
                }
                (search?.length ===0) && setNotResult(true);
            }else{
                setSearchResults([]);
            }
            setIsLoading(false);
        },1500)
    }

    const handleSelection =(name:string | null)=>{
        if(name)
            navigate(`/detail/${name}`);
        else if (inputSearchRef.current)
            navigate(`/detail/${inputSearchRef.current.value}`);
    }

    return(
            <>
                <div className="ahead">
                    <div className="input-container">
                        <input type='text' id='search' name="search" onChange={(e)=>(handleChange(e))}  ref={inputSearchRef}></input> 
                        {(!isLoading) &&
                            <div className={ searchResults.length>0 ? "search-results" : ''}>
                                {searchResults.map((element) =>
                                    <div onClick={()=>handleSelection(element.name)} key={element.name}>{element.name}</div>
                                )}
                            </div>}
                    </div>
                    <button className='button search-btn' onClick={()=>handleSelection(null)}>Search</button>
                </div>
                <div className="search-messagge">
                    {(isLoading) && 'Loading ...'}
                    {(notResult) && 'There was not result'}
                </div>
            </>

    )
}

