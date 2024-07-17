import { useLocation, useNavigate } from 'react-router-dom';
import './menu.scss';

export const MenuComponent = ()=>{
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (routeTo:string)=>{
        navigate(routeTo);
    }

    return(<div className="menu">
        {(location.pathname!=='/login') && <>
            <div className={(location.pathname==='/home') ? "active" :""} onClick={()=>handleClick('home')}><h2>Home</h2></div>
            <div className={(location.pathname==='/favorites') ? "active" :""} onClick={()=>handleClick('favorites')}><h2>Favorites</h2></div>
        </>}
    </div>)
}