import Sidebar from "./Sidebar";
import Posts from "./Posts";
import { useLocation } from 'react-router-dom'
import {useState,useEffect} from "react"
import axios from "axios"

const Home = () =>{
  const {search} = useLocation();
  const [posts,setPosts] = useState([])
  useEffect(()=>{
      const getPosts = async () =>{
        try{
          const res = await axios.get("/posts"+search)
          setPosts(res.data)
          // console.log(res.data)
        }
        catch(error){
          console.log(error || `something went wrong.`)
        }
      }
      getPosts()
  },[search])
    return <div>
        <section className="header overlay">
            <div className="overlay"></div>
            <span className="headerTitle">
                <h4 className="headerTitleSm text-white">Keep all your memories here.</h4>
                <p className="headerTitleLg">Here are all your available memories</p>
            </span>
            <img src={"./image.jpg"} alt={"bg_image"} className="headerImg img-fluid"/>
        </section>
        <div class="container space-2 space-lg-3">
        <div class="row justify-content-lg-between">
        <Posts posts={posts}/>
        <Sidebar/> 
      </div>
    </div>
    </div>
}

export default Home