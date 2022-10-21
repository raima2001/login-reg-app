import {useRef,useState, useEffect} from 'react';
import useAuth from './hooks/useAuth';
import { useNavigate, useLocation} from "react-router-dom"
import * as api from "./Api";


const Login =()=>{
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser]=useState('');
    const [pwd ,setPwd] = useState('');
    const[errMsg, setErrMsg]= useState('');
    const[success, setSuccess]= useState(false);

    useEffect(() => { //the focus is on the input , using reference to store the component in the dependency
        userRef.current.focus();
     },[]
    )
    useEffect(() => {//empty out any error message, if the user changes un or pwd
        setErrMsg('');
    }, [user,pwd]

    )
    const handleSubmit = async(e)=>{ //will handle the event
        e.preventDefault(); //stop from reloading page 
        //console.log(user,pwd);
        const res = await api.login(JSON.stringify({user, pwd}));
        console.log(JSON.stringify(res?.data))
        setAuth({user,pwd})
        setErrMsg(res.error||null)
        //setUser('');
        //setPwd('');
        navigate(from, { replace: true });
        

        
 
    }
    
    return(
        
        
        <section>
            <p ref= {errRef} className={errMsg? "errmsg":"offscreen"} aria-live="assertive"> {/*display the error messages*/}
                {errMsg}  {/*aria to screen reader announce it when focus set on this paragraph */}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor ="username"> UserName:</label>
                <input
                type ="text"
                id ="username"
                ref ={userRef}
                autoComplete ="off"
                onChange={(e) => setUser(e.target.value)} // set the anon function to userstate
                value ={user}
                required //clear the form upon submission
                />
                <label htmlFor ="password"> Password:</label>
                <input
                type ="password"
                id ="password"
                onChange={(e) => setPwd(e.target.value)} // set the anon function to userstate
                value ={pwd}
                required //clear the form upon submission
                />
                <button> Sign In</button>
            </form>
            <p>
                Need an Account? <br />
                <span className='line'>
                    {/*putting a router link*/}
                    <a href ="/register">Sign Up</a>
                </span>
            </p>

        </section>
        
    )
}

export default Login