import React,{useEffect,useState,useContext} from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from "axios"
import {Context} from '../context/Context';
// import Sidebar from './Sidebar'

export default function SinglePost() {
    const PF ="http://localhost:5000/images/uploads/"
    const [post,setPost] = useState({})
    const location = useLocation()
    const path = location.pathname.split('/')[2];
    const {user} = useContext(Context)

    const [updateMode,setUpdateMode] = useState(false)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")

    useEffect(()=>{
        const getPost = async () =>{
            try{
                const res = await axios.get("/posts/"+ path)
                setPost(res.data)
                setTitle(res.data.title)
                setDescription(res.data.description)
                console.log(res.data);
            }
            catch(error){
                console.log(error || `something went wrong`);
            }
        }
        getPost()
    },[path]);

    const HandleDelete = async () =>{
        try{
          await axios.delete("/posts/"+ path,{
            data:{username:user.username}
          })
          window.location.replace("/")
        }
        catch(error){
          console.log(error || `something went wrong.`)
        }
    }

    const updateHandler = async () =>{
      try{
        await axios.put(`/posts/${post._id}`,{
          username:user.username,
          title,
          description
        })
        // window.location.reload()
        setUpdateMode(false)
      }
      catch(error){
        console.log(error || `something went wrong.`)
      }
    }
    return (
      <div class="container space-top-3 space-bottom-2">
      {updateMode ? 
      <div className="container col-md-3 d-flex flex-column justify-content-center">
            <div id="memories">
                <section>
                    <h4 className="display-5 font-weight-bold">Update Post</h4>
                    <form onSubmit={updateHandler}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Enter title" className="form-control" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea rows="6" placeholder="Enter description" className="form-control" onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">update post</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
      :
      <div class="w-lg-60 mx-lg-auto">
        <div class="mb-4">
          <h1 class="h2">{title}</h1>
        </div>
        <div class="py-4 mb-5">
          <div class="row align-items-md-center">
            <div class="col-md-8 mb-5 mb-md-0">
              <div class="media">
                <div class="image">
                  {post.photo && (
                    <img class="card-img-top img-fluid" style={{ height:"200px" }} src={PF + post.photo} alt="blog"/>
                  )}
                </div>
                <div class="media-body font-size-1 ml-3">
                  <span><Link class="text-inherit" to={`/?user=${post.username}`}>{post.username}</Link></span>
                  <span class="d-block text-dark">{new Date(post.createdAt).toDateString()}</span>
                  <p>{description}.</p>
                  {user.username === post.username &&
                    <div>
                      <button className="btn btn-sm btn-light" onClick={()=>{setUpdateMode(true)}}>
                          <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button className="btn btn-sm btn-light" onClick={HandleDelete}>
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      </div>
    )
}
