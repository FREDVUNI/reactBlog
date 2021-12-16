import React,{useState} from "react"
import axios from "axios"

const Signup = () =>{
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(false)

    const HandleSubmit = async (e) =>{
        e.preventDefault()
        setError(false)
       try{
        const res = await axios.post("auth/register",{ 
            username,
            email,
            password
        })
        res.data && window.location.replace("/login")
        // console.log(res.data)
       }
       catch(error){
          setError(true)
          console.log(error || `something went wrong.`) 
       }
    }

    return <div className="container col-md-3 d-flex flex-column justify-content-center mt-5">
            <div id="memories" className="py-5">
                <section>
                    <h4 className="display-5 font-weight-bold">Sign up</h4>
                    {error && <div className="alert alert-danger">something went wrong.</div>}
                    <form onSubmit={HandleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder="Enter username" className="form-control" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter email address" className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter password" className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign up</button>
                        </div>
                    </form>
                </section>
        </div>
    </div>
}

export default Signup