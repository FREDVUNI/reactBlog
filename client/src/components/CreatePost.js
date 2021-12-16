import React,{useState,useContext} from 'react'
import axios from 'axios'
import {Context} from '../context/Context'

export default function CreatePost() {
    const {user} = useContext(Context)
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [error,setError] = useState("")
    const [file,setFile] = useState(null)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setError(false)
        const NewPost = {
            title,
            description,
            username:user.username
        }
        axios.post("posts",NewPost)
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append('name',filename)
            data.append('file',file)
            NewPost.photo = filename
            try{
                await axios.post("/upload",data)
            }
            catch(error){
                setError(true)
                console.log(error || `something went wrong.`)
            }
        }
        try{
           const res =  await axios.post("/posts",NewPost)
           window.location.replace("/post/"+ res.data._id)
        }
        catch(error){
            setError(true)
            console.log(error || `something went wrong.`)
        }
    }
    return (
        <div className="container col-md-3 d-flex flex-column justify-content-center mt-5">
            <div id="memories" className="py-5">
                <section>
                    <h4 className="display-5 font-weight-bold">Create Post</h4>
                    {error && <div className="alert alert-danger">something went wrong.</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            { file && (
                                <img src={URL.createObjectURL(file)} alt="imagePost" className="img-fluid"/>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" placeholder="Enter title" className="form-control" onChange={(e)=>setTitle(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea placeholder="Enter description" className="form-control" onChange={(e)=>setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">
                                <i className="fa fa-upload"></i>
                            </label>
                            <input type="file" id="image" style={{ display:"none" }} onChange={(e)=>setFile(e.target.files[0])}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">create post</button>
                        </div>
                    </form>
                </section>
        </div>
    </div>
    )
}
