import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/');
        localStorage.removeItem('token');
    }

    return (
        <>
        <section className="home-wrapper-1 py-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-6">
                        <div className="row">
                            <h4>Online Library Management</h4>
                            <h5>Join today, it's free!</h5>
                            <Link to={"register"}>Sign Up</Link>
                        </div>
                        <div className="row">
                        <img src="images/libraryBanner1.svg" className="img-fluid p-1" alt="main banner" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="main-banner p-3">
                            <img src="images/dal2.png" className="img-fluid rounded-3" alt="main banner" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="flexGrow">
            <button className="m-5" onClick={logout}>Sign Out</button>
        </div>
        </>
    );
}

export default Home;