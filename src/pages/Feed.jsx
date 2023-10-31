import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import axios from "axios";
import logo from "../assets/images/SkillzArenaLogo.png";
import { AuthContext } from "../context/authContext";

function SkillsFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useContext(AuthContext);

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
  const deletePost = async (postId) => {
    try {
      await axios.delete(`/delete/${postId}`);
      // Remove the post from the UI
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(`/posts/${postId}/like`);
      const updatedLikes = response.data.likes;

      const updatedPosts = posts.map((post) =>
        post._id === postId ? { ...post, likes: updatedLikes } : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const isOwner = (pic, id) => {
    return pic.author._id === id;
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="feed-container">
      <div className="skills-feed">
        {posts.map((post) => (
          <div key={post._id} className="post">

            
            {user && isOwner(post, user._id) &&
            
            
            <button
              className="delete-post-btn"
              onClick={() => deletePost(post._id)}
            >
              X
            </button>
            
            }
            <div className="post-header">
              <Link to={`/user-profile/${post.author._id}`}>
                <img
                  className="feedprofilep"
                  src={post.author.profilePicture}
                  alt={`${post.author.username}'s profile`}
                  width="50"
                  height="50"
                />

                <h3 className="feedpagename">{post.author.username}</h3>
              </Link>
              <button
                className="likebutton"
                onClick={() => handleLike(post._id)}
              >
                Like ({post.likes.length})
              </button>
            </div>
            {checkFormat(post.mediaUrl) ? (
              <video className="videofeed" src={post.mediaUrl} controls />
            ) : (
              <img src={post.mediaUrl} alt={post.caption} />
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
