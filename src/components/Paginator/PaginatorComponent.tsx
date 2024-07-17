import { useState } from "react";
import { ELEMENTS_X_PAGE } from "../../Infraestructure/dataSources/axios.service";
import './paginator.scss';

interface PaginationProps {
    numOfElements: number;
    currentPage: number;
    updatePage:(page:number)=>void;
}

export const PaginatorComponent:React.FC<PaginationProps>=({numOfElements, currentPage,updatePage})=>{

    const numOfPages:number = Math.ceil(numOfElements/ELEMENTS_X_PAGE);

    const [localPage,setLocalPage] =useState(currentPage);

    const updateLocalPage =(page:number) =>{
        setLocalPage(page);
        updatePage(page);
    }
    
    return (
        <div className="paginator-container">
            {(localPage>2) && <span className={`button button-margin`} onClick={()=>updateLocalPage(1)}> {'<<'} </span>} 
            {(localPage>2) && <span className={`button button-margin`} onClick={()=>updateLocalPage(localPage-2)}> {localPage-2}</span>} 
            {(localPage>1) && <span className={`button button-margin`} onClick={()=>updateLocalPage(localPage-1)}> {localPage-1}</span>} 
            { <span className={`button button-margin active`}> {localPage}</span>} 
            {(localPage<numOfPages) &&  <span className={`button button-margin`} onClick={()=>updateLocalPage(localPage+1)}> {localPage+1}</span>} 
            {(localPage<numOfPages-1) &&<span className={`button button-margin`} onClick={()=>updateLocalPage(localPage+2)}> {localPage+2}</span>}
            {(localPage<numOfPages-2) &&<span className={`button button-margin`} onClick={()=>updateLocalPage(numOfPages)}> {'>>'}</span>}
        </div>
    );
}

