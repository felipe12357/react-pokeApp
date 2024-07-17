import { useRouteError } from "react-router-dom";
import './SingleErrorComponent.scss'
export const SingleErrorComponent = () => {
   const error = useRouteError() as {data:string,message:string};
    return (
        <div className="error-container">
            <h4>There was an error...</h4>
            { (error.data) ? error.data : error.message}
        </div>
    )
}