import React from "react";

const Subscribers = ({ subscribers, onClose }) => {
  return (
    <div style={{position: 'fixed', top: '10%', left: '10%', width: '80%', height: '80%', background: 'white', zIndex: 1000, overflowY: 'scroll'}}>
      <h3>Subscribers!</h3>
      <button onClick={onClose}>Close</button>
      <ul>
        {subscribers.map(sub => (
          <li key={sub._id}>
            <img src={sub.profileImage} alt={sub.name} width="50" height="50" />
            {sub.name}
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
