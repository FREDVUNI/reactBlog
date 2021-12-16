import { useState,useEffect } from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const Sidebar = () =>{
  const [category,SetCategory] = useState([])
  useEffect(()=>{
    const getCategories = async () =>{
        try{
            const res = await axios.get("/categories")
            SetCategory(res.data)
            // console.log(res.data);
        }
        catch(error){
          console.log(error || `something went wrong.`);
        }
    }
    getCategories()
  },[])
    return<>
        <div class="col-lg-3">
          <div class="mb-7">
            <form class="input-group input-group-sm input-group-merge input-group-flush">
            <input type="search" class="form-control" placeholder="Search articles" aria-label="Search articles" aria-describedby="searchLabel"/>
            <div class="input-group-append">
              <div class="input-group-text" id="searchLabel">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </form>
          </div>

          <div id="stickyBlockStartPoint"></div>
            <div class="mb-7">
              <div class="mb-3">
                <h3>Categories</h3>
              </div>
              {category.map((cat)=>(
              <article class="mb-4">
                <div class="media align-items-center text-inherit">
                  <div class="avatar avatar-lg mr-3">
                    {cat.image && (
                        <img class="avatar-img" src={cat.image} alt="blog"/>
                    )}
                  </div>
                  <div class="media-body">
                    <h4 class="h6 mb-0"><Link class="text-inherit" to={`/?cat=${cat.category}`}>{cat.category}</Link></h4>
                  </div>
                </div>
              </article>
              ))}
            </div>
        </div>
        </>
}

export default Sidebar