import Post from "./Post"
const Posts = ({posts}) =>{
    return <div class="col-lg-8">
            {posts.map((p)=>(
                <Post post={p}/>
            ))}
            </div>
}

export default Posts