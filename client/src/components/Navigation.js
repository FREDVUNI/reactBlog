import {Link} from "react-router-dom"
import {useContext} from "react"
import {Context} from "../context/Context"

const Navigation = () =>{
    const { user,dispatch } = useContext(Context)
    const HandleLogout = () =>{
        dispatch({type:"LOGOUT"})

    }
    const PF = "http://localhost:5000/images/uploads/"
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div className="container">
                <i className="fab fa-facebook-square"></i>   
                <i className="fab fa-twitter-square ml-2"></i>   
                <i className="fab fa-pinterest-square ml-2"></i>   
                <i className="fab fa-instagram-square ml-2"></i>   
                <Link to="/" className="navbar-brand ml-5">
                    <img src={"./logo512.png"} alt={"blog"} className="logo mr-2 ml-5"/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nanv-item">
                            <Link to='/' className="nav-link">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/about' className="nav-link">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/setting' className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to='/create-post' className="nav-link">Create post</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {user ? (
                            <li className="nav-item">
                                {user.profilePic ?
                                    (
                                      <img src={PF + user.profilePic} alt={"userprofile"} className="profile rounded-circle"/>
                                    ):(
                                        <img src={'./person.jpg'} alt={"userprofile"} className="profile rounded-circle"/>
                                    )
                                }
                            </li>
                        ):(
                           <span className="d-flex">
                                <li className="nav-item">
                                    <Link to='/signup' className="nav-link">Sign up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link">Sign in</Link>
                                </li>
                           </span>
                        )}
                        
                        <li className="nav-item">
                            <Link to='/signup' className="nav-link" onClick={HandleLogout}>{user && 'Log out'}</Link>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navigation