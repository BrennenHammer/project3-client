import React, { useContext } from "react";
import axios from 'axios';
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
const Subscribers = ({ subscribers = [], onClose }) => {
    const { user } = useContext(AuthContext);

    const handleSubscribe = async (userIdToSubscribeTo) => {
        try {
            await axios.post(`/subscribers/subscribe/${userIdToSubscribeTo}`, { subscriberId: user._id });
        } catch (err) {
            console.error('Error subscribing:', err);
        }
    };

    const handleUnsubscribe = async (userIdToUnsubscribeFrom) => {
        try {
            await axios.delete(`/subscribers/unsubscribe/${userIdToUnsubscribeFrom}`, { data: { subscriberId: user._id } });
        } catch (err) {
            console.error('Error unsubscribing:', err);
        }
    };

    return (
        <div style={{ position: 'fixed', top: '10%', left: '10%', width: '80%', height: '80%', background: 'white', zIndex: 1000, overflowY: 'scroll' }}>
            <h3>Subscribers!</h3>
            <p>subscribers: {user && Array.isArray(user.subscribers) ? user.subscribers.length : 0}</p>

            <Link to="/profile">
            <button onClick={onClose}>Close</button>
            </Link>
            <ul>
                {subscribers.map(sub => (
                    <li key={sub._id}>
                        <img src={sub.subscriberId.profileImage} alt={sub.subscriberId.name} width="50" height="50" />
                        {sub.subscriberId.name}
                        <button onClick={() => handleSubscribe(sub.subscriberId._id)}>Subscribe</button>
                        <button onClick={() => handleUnsubscribe(sub.subscriberId._id)}>Unsubscribe</button>
                    </li>
                ))}
            </ul>
            <footer>
                <p>&copy; 2023 SkillzArena. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Subscribers;