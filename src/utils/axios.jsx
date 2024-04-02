import axios from 'axios'



 const instance = axios.create({
    baseURL:  `https://api.themoviedb.org/3/`,
    headers:{
        Accept: "application/json",
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTdhYTZkNGRhNzY0NmUyMGM5YTk3ZGM0Y2Y4MDdhNiIsInN1YiI6IjY2MDE1NzQ0MWIxZjNjMDE3YzliZTQzZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rZZJgQOvQXIW02vo0W5M1eSCel7NqVJvAB4dMoSdH88' ,
    }
}
)

export default instance;