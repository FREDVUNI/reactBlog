import {Context} from '../context/Context'
import {useState,useContext} from 'react'
import axios from 'axios'

const Login = () =>{
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const {user,dispatch} = useContext(Context)

    const HandleSubmit = async (e)=>{
        e.preventDefault();
        setError(false)
        dispatch({type:"LOGIN_START"});
        try{
            const res = await axios.post("auth/login",{
                username:username,
                password:password
            })
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
        }
        catch(error){
            setError(true)
            dispatch({type:"LOGIN_FAILURE"});
        } 
    }
    console.log(user)
    return <div className="container col-md-3 d-flex flex-column justify-content-center mt-5">
            <div id="memories" className="py-5">
                <section>
                    <h4 className="display-5 font-weight-bold">Sign in</h4>
                     {error && <div className="alert alert-danger">something went wrong.</div>}
                    <form onSubmit={HandleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="Enter username" className="form-control" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                        </div>
                    </form>
                </section>
        </div>
    </div>
}

export default Login