import React,{useContext} from "react"
import Navigation from "./components/Navigation"
import {Route,Switch} from "react-router-dom"
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Setting from "./components/Setting";
import About from "./components/About";
import SinglePost from "./components/SinglePost";
import CreatePost from "./components/CreatePost";
import {Context} from './context/Context';

function App(){
    const {user} = useContext(Context);
    return(
      <div>
        <Navigation/>
        <Switch>
            <Route path="/" exact>
                <Home/>
            </Route>
            <Route path="/signup">
                {user ?  <Home/>:<Signup/>}
            </Route>
            <Route path="/login">
                {user ?  <Home/>:<Login/>}
            </Route>
            <Route path="/setting">
                {user ?  <Setting/>:<Signup/>}
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/create-post">
                {user ?  <CreatePost/>:<Signup/>}
            </Route>
            <Route path="/post/:id" >
                <SinglePost/>
            </Route>
        </Switch>
      </div>
    );
}
export default App;