import './login.scss'
import charmander from '../../assets/charmander.png';
import { SetCurrentUser } from '../../utils/userSessionHandler';
import { useNavigate } from 'react-router-dom';
const LoginPage = () =>{

    const navigate = useNavigate();

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const user = formData.get('user') as string;

        SetCurrentUser(user);
        navigate('/home');
    } 

    return(
        <form className='login-form' onSubmit={handleSubmit}>
            <div>
                <img src={charmander}></img>
            </div>
            <div>
                <div>
                    <label htmlFor="user"> Username: </label>
                    <input type="text" name="user" id="user" required></input>
                </div>

                <div>
                    <label htmlFor="password"> Password: </label>
                    <input type="password" name="password" id="password" required></input>
                </div>
            </div>
            
                <button className='button'>Log IN</button>
            
        </form>
    )
}

export default LoginPage;