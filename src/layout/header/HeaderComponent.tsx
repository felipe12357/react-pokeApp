import './header.scss';
import pokeball from '../../assets/pokeball.png';
import { UserValidation,ClearUserSession } from '../../utils/userSessionHandler';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const HeaderComponent = () =>{

    const currentUser = UserValidation();
    const navigate = useNavigate();

    const handleSignOut = ()=>{
        ClearUserSession();
        navigate('/login');
    }

    const handleHome = ()=> navigate('/');

    return(
        <div className="header">
           <div onClick={handleHome}> PokeApp  <img className='pokeball' src={pokeball}></img> </div>
           <div>{ currentUser && 
                <>
                    Hi!, {currentUser}
                    <div className='tooltip icon' >
                        <FontAwesomeIcon icon={faRightFromBracket as IconProp} size="3x" onClick={handleSignOut}></FontAwesomeIcon>
                    </div>
                </>
            }
           </div>
        </div>
    )
}