import { post } from "./authService";

export const photoService = (e) => {
    
    const uploadData = new FormData();

    uploadData.append("image", e.target.files[0]);

    return post('/photo/single', uploadData)

}