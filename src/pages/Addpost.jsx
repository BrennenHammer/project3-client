import { useState } from 'react';
import { post } from '../services/authService';

function AddPost({ onClose }) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');      

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('media', file);
        formData.append('description', description);
        setIsLoading(true);

        post('/feed', formData)
            .then(response => {
                setIsLoading(false);
                setDescription('');  
                setFile(null);       
                setFeedback('Successfully uploaded!');
            })
            .catch(error => {
                setIsLoading(false);
                setFeedback('Error occurred. Please try again.');
            });
    };

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="add-post-page">
                <button className="exit-button" onClick={onClose}>X</button> {/* Add this line for the exit button */}
                <h2>Add a New Skill Post</h2>
                <form onSubmit={handleSubmit}>
                    <textarea 
                        placeholder="Describe your skill.."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={e => setFile(e.target.files[0])} 
                        accept="image/*,video/*"
                    />
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    );
}

export default AddPost;
