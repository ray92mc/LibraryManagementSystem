import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);
    

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setIsLoggedIn(false);
        localStorage.setItem('isLoggedIn', false)
        localStorage.removeItem('token');
        navigate('/logged-out');
    }

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
            <div className="flexGrow">
                <button className="m-5" onClick={logout}>Sign Out</button>
            </div>
        </section>
        </>
    );
}

export default Home;