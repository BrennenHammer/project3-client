import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import logo from "../assets/images/SkillzArenaLogo.png"; // Adjust the path to match your directory structure and file name

function SkillsFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get("/feed")
      .then((response) => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  }, []);

  let checkFormat = (image) => {
    let array = image.split(".");
    return array[array.length - 1] === "mp4";
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="feed-container">
      <div className="skills-feed">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <Link to={`/user-profile/${post.author._id}`}>
              
                <img className="feedprofilep" src={post.author.profilePicture} alt={`${post.author.username}'s profile`} width="50" height="50" />
                <h3 className="feedpagename">{post.author.username}</h3>
              </Link>
            </div>
            {checkFormat(post.mediaUrl) ? (
              <video className="videofeed" src={post.mediaUrl} controls />
            ) : (
              <img src={post.mediaUrl} alt={post.description} />
            )}
            <p className="postcaption">{post.caption}</p>
          </div>
        ))}
      </div>
      <div className="app-name-container">
        <img src={logo} alt="Skillz Arena Logo" />
        <h1 className="feedpara">Skillz Arena</h1>
      </div>
      <footer>
        <p>&copy; 2023 SkillzArena. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default SkillsFeed;


