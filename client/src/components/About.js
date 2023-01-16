import Sidebar from "./Sidebar";

const About = () =>{
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
        <Sidebar/> 
      </div>

    </div>
    </div>
}

export default About