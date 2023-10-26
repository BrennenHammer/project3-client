import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { get } from "../services/authService";
import Subscribers from './Subscribers';


const Profile = () => {
    const { user } = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showSubscribersModal, setShowSubscribersModal] = useState(false);

    useEffect(() => {
        if (user && user._id) {
            get(`/profile/posts?userId=${user._id}`)
                .then(response => {
                    setUserPosts(response.data);
                    return get(`/subscribers/${user._id}`);
                })
                .then(response => {
                    setSubscribers(response.data);
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [user]);

    let checkFormat = (image) => {
        let array = image.split('.');
        return array[array.length - 1] === 'mp4';
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            
            <h1>profile</h1>
        
            {user && <h2>Welcome {user.username}!</h2>}
            <img src={user.profilePicture} alt={`${user.username}'s profile`} />
            <div className="user-posts">
                {userPosts.map(post => {
                    console.log(post); 
                    return (
                        <div key={post._id} className="post">
                            <div className="post-header">
                                <h3>{post.user}</h3>
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
                    subscribers={subscribers} 
                    onClose={() => setShowSubscribersModal(false)}
                />
            )}
            
            <footer >
    <p>&copy; 2023 SkillzArena. All rights reserved.</p>
</footer>
        </div>
    );
};

export default Profile;

