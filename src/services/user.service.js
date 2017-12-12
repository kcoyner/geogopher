import axios from 'axios';

export const userService = {
    register,
    getUserInfo,
};

function register(user) {
    return axios.post('/api/user', user)
      .then(function (response) {
          return response.data;
      })
      .catch(function (error) {
       return error;
      });
}

function getUserInfo(id, google) {
    let user = {};
    user.id = id;
    user.google = google;
    return axios.get('/api/user/', { params: user })
        .then(function(response) {
            return response.data.user_id;
        })
        .catch(function(error) {
            return error;
        })
}