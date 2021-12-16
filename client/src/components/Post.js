import {Link} from "react-router-dom"
const Post = ({post}) =>{
  const PF ="http://localhost:5000/images/uploads/"
    return <div>
        <article class="row mb-5"> 
            <div class="col-md-5">
                {post.photo && (
                    <img class="card-img" src={PF + post.photo} alt="blog"/>
                )}
            </div>
            <div class="col-md-7">
              <div class="card-body d-flex flex-column h-100 px-0">
                <span class="d-block mb-2">
                  <Link class="font-weight-bold" to={`/?cat=${post.category}`}>{post.category}</Link>
                </span>
                <h3><Link class="text-inherit" to={`/post/${post._id}`}>{post.title}</Link></h3>
                <p>{post.description}</p>
                <div class="media align-items-center mt-auto">
                  <Link class="avatar avatar-sm avatar-circle mr-3" to={`/?user=${post.username}`}>
                    <img class="avatar-img" src="./person.jpg" alt="blog"/>
                  </Link>
                  <div class="media-body">
                    <span class="text-dark">
                      <Link class="d-inline-block text-inherit font-weight-bold" to={`/?user=${post.username}`}>{post.username}</Link>
                    </span>
                    <small class="d-block">{new Date(post.createdAt).toDateString()}</small>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div id="stickyBlockEndPoint"></div>
        </div>
}

export default Post