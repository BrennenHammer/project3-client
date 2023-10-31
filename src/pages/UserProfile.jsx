import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';  // Make sure to include this if not already
import { AuthContext } from "../context/authContext"; 
import { get, post } from "../services/authService";
import Subscribers from "./Subscribers";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showSubscribersModal, setShowSubscribersModal] = useState(false);
    const { user: currentUser } = useContext(AuthContext); 
    const { id } = useParams();

    const handleSubscribe = async () => {
        try {
            await post(`/subscribers/subscribe/${id}`, { subscriberId: currentUser._id });
            setIsSubscribed(true);
        } catch (err) {
            console.error('Error subscribing:', err);
        }
    };

    const handleUnsubscribe = async () => {
        try {
            await axios.delete(`/subscribers/unsubscribe/${id}`, { data: { subscriberId: currentUser._id } });
            setIsSubscribed(false);
        } catch (err) {
            console.error('Error unsubscribing:', err);
        }
    };

    let checkFormat = (image) => {
        let array = image.split('.');
        return array[array.length - 1] === 'mp4';
    };

    useEffect(() => {
        get(`/users/detail/${id}`)
            .then((response) => {
                setUser(response.data);
                if (currentUser && currentUser.following.includes(response.data._id)) {
                    setIsSubscribed(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, currentUser]);

    return (
        <div>
            { user &&
                <>
                    <h2>{user.username}'s profile!</h2>
                    <img src={user.profilePicture} alt={`${user.username}'s profile`} />
                    <div className="user-posts">
                        {user.posts.map(post => (
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
                        ))}
                    </div>
                    {
                        isSubscribed ? 
                        <button onClick={handleUnsubscribe}>Unsubscribe</button> : 
                        <button onClick={handleSubscribe}>Subscribe</button>
                    }
                    <button onClick={() => setShowSubscribersModal(true)}>Subscribers</button>
                    {showSubscribersModal && (
                        <Subscribers 
                            subscribers={user.subscribers} 
                            onClose={() => setShowSubscribersModal(false)}
                        />
                    )}
                </>
            }
        </div>
    );
}

export default UserProfile;

