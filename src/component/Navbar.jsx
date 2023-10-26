import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from '../context/authContext';
import AddPost from '../pages/Addpost';

const Navbar = () => {
    const { logOutUser } = useContext(AuthContext);
    const [isAddPostOpen, setIsAddPostOpen] = useState(false);

    const getToken = () => {
        return localStorage.getItem("authToken");
    };

    return (
        <nav className='navbar1'>
            {!getToken() && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}

            {getToken() && 
                <>
                    <Link to="/feed">feed</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/subscibers">Subscribers</Link>
                    <button onClick={logOutUser}>Logout</button>
                    <button onClick={() => setIsAddPostOpen(true)}>Add Post</button>
                    {isAddPostOpen && <AddPost onClose={() => setIsAddPostOpen(false)} />}
                    <p>SkillzArena 2023 @</p>
                </>
               
            }
        </nav>
    );
};

export default Navbar;
