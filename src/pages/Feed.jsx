import React, { useState, useEffect } from "react";
import { get } from "../services/authService";

function SkillsFeed() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    get('/feed')   // This assumes your endpoint in the server is "/feed" for fetching posts
      .then(response => {
        setPosts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="skills-feed">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-header">
            <h3>{post.user}</h3>
            <h5>{post.skill}</h5>
          </div>
          <img src={post.imageUrl} alt={post.description} />
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}

export default SkillsFeed;

