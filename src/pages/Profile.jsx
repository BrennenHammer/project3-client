//dont have to do but what be cool to have gears and new look and all the fame
//likes, subs, rating bar w sub Count
//fire!!

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext"

const Profile = () => {

    const { user } = useContext(AuthContext)

  return (
    <div>
        <h1>Profile</h1>

        {
            user &&
        
            <h2>Welcome {user.name}!</h2>
        }

        <Link to='/Addpost'>Add post</Link>

    </div>
  )
}

export default Profile
