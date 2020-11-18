import Axios from 'axios';

const SPRING_API_URL = 'http://localhost:8090/youtube';

class ApiService {
    fetchMovies(){
        return Axios.get(SPRING_API_URL);
    }

    addMovie(video) {
        return Axios.post(SPRING_API_URL, video);
    }

    removeMovie(id) {
        return Axios.delete(SPRING_API_URL+ '/' + id);
    }
}

export default new ApiService();