import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { get } from "../services/authService"
import Subscribers from "./Subscribers"

const UserProfile = () => {

    const [user, setUser] = useState(null)
    const [showSubscribersModal, setShowSubscribersModal] = useState(false);

 const { id } = useParams()

 let checkFormat = (image) => {
    let array = image.split('.');
    return array[array.length - 1] === 'mp4';
};

 useEffect(() => {
    get(`/users/detail/${id}`)
        .then((response) => {
            console.log("Found user ===>", response.data)
            setUser(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
 }, [])

  return (
    <div>

        { user &&
        
        <>
        
        {user && <h2>{user.username}'s profile!</h2>}
        <img src={user.profilePicture} alt={`${user.username}'s profile`} />
        <div className="user-posts">
            {user.posts.map(post => {
                console.log(post); 
                return (
                    <div key={post._id} className="post">
                        <div className="post-header">
                            <h3>{post.user}</h3>
                            <h5>{post.skill}</h5>
                        </div>
                        {
                            checkFormat(post.mediaUrl) ? 
                            <video className="videofeed" src={post.mediaUrl} controls /> 
                            : 
                            <img src={post.mediaUrl} alt={post.caption} />
                        }
                        <p>{post.caption}</p>
                    </div>
                );
            })}
        </div>
    
        <button onClick={() => setShowSubscribersModal(true)}>Subscribers</button>
    
        {showSubscribersModal && (
            <Subscribers 
                subscribers={Subscribers} 
                onClose={() => setShowSubscribersModal(false)}
            />
        )}
        
        </>
        
        
        }
    


</div>
  )
}

export default UserProfile