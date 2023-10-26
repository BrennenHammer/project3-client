import { useState } from 'react';
import { post } from '../services/authService';
import { photoService } from '../services/photoService'

function AddPost({ onClose }) {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState('');  
    const [disabled, setDisabled] = useState(false)    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setIsLoading(true);

        post('/feed', {file, description})
            .then(response => {
                console.log("new post", response.data)
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

    const handleFileChange = (e) => {
        setDisabled(true)
        photoService(e)
        .then((response) => {
            setFile(response.data.image)
            setDisabled(false)
        })
        .catch((err) => {
            console.log(err)
            setDisabled(false)
        })
    }

    return (
        <>
            <div className="backdrop" onClick={onClose}></div>
            <div className="add-post-page">
                <button className="exit-button" onClick={onClose}>X</button> {/* Add this line for the exit button */}
                <h2>Add a New Skill!</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Describe Your Skill..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        accept="image/*,video/*"
                    />
                    <button disabled={disabled} type="submit">Post</button>
                </form>
            </div>
        </>
    );
}

export default AddPost;
