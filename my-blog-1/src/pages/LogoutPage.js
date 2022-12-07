import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getAuth, signOut} from 'firebase/auth';
import useUser from '../hooks/useUser';


const LogoutPage = () => {
    const [msg, setMsg] = useState('');
    const {user, isLoading} = useUser();
    const navigate = useNavigate();

    const logout = () => {
        signOut(getAuth()).then(() => {
            setMsg("You have been logged out successfully!");
        }).catch((e) => {
            setMsg(e.message);
        });

    }


    return (
        <> {
            msg && <p className='error'>
                {msg}</p>
        }
            {
            user ? <div>
                <button onClick={logout}>Click here to Log Out</button>
            </div> : <p className='error'>You are not logged in</p>
        } </>
    );
}

export default LogoutPage;
