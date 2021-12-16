// import Sidebar from "./Sidebar";
import { useContext,useState } from 'react'
import {Context} from '../context/Context'
import axios from 'axios'

const Setting = () =>{
  const PF = "http://localhost:5000/images/uploads/"
  const {user,dispatch} = useContext(Context)

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const [file,setFile] = useState(null)

  const handleSubmit= async(e) =>{
    e.preventDefault();
    dispatch({type:"UPDATE_START"}) 
    const updateUser = {
      userId:user._id,
      username,
      password,
      email
    }
    if(file){
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append('name',filename)
      data.append('file',file)
      updateUser.profilePic = filename
      try{
        await axios.post("/upload",data)
      }
      catch(error){
        console.log(error || `something went wrong.`);
      }
    }
    try{
      const res = await axios.put('/users/' + user._id,updateUser)
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    }
    catch(error){
      console.log(error || `something went wrong.`);
      dispatch({type:"UPDATE_FAILURE"})
    }
  }
    return (
      <div className="container col-md-3 d-flex flex-column justify-content-center mt-5">
            <div id="memories" className="py-5">
                <section>
                    <h4 className="display-5 font-weight-bold text-center">Profile</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group justify-content-center text-center mt-4 mb-4">
                          {user.profilePic &&
                            <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="profilePicture" style={{ height:"100px"}}/>
                          }
                          <div className="form-group mt-3">
                            <label htmlFor="image">
                                <i className="fa fa-upload"></i>
                            </label>
                            <input type="file" id="image" style={{ display:"none" }} onChange={(e)=>setFile(e.target.files[0])}/>
                        </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder={user.username} className="form-control" onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder={user.email} className="form-control" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder={user.password} className="form-control" onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">update profile</button>
                        </div>
                    </form>
                </section>
        </div>
    </div>
    )
}

export default Setting