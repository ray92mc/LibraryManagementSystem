import { Link } from "react-router-dom";

const Home = () => {
    

    return (
        <>
        <section className="bgimage" id="home">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hero-text">
                        <h2 className="hero_title">Online Library Management</h2>
                        <p className="hero_desc">Join today, it's free!</p>
                        <Link to={"register"} className="hero-link">Sign Up</Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Home;