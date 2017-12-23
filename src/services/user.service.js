import axios from 'axios';

export const userService = {
    register,
    getGoogleUserInfo,
    logout,
    login,
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

function getUserInfo(userId) {
    return axios.get('/api/userId', { params: userId })
        .then(function(response) {
            console.log(response.data);
        })
}

function getGoogleUserInfo(userObj, google) {
    let user = {};
    user = userObj;
    user.google = google;
    return axios.get('/api/user/', { params: user })
        .then(function(response) {
            let user = {};
            localStorage.setItem('user', JSON.stringify(response.data));
            return response.data.user_id;
        })
        .catch(function(error) {
            return error;
        })
}

function logout() {
    return new Promise(function(resolve) {
        console.log("+++++++++",localStorage);
        localStorage.removeItem('user');
        console.log(localStorage);
        return resolve(localStorage.user);
      });
}

function login(user) {
    return axios.post('/api/login', user )
    .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    })
    .catch(function(error) {
        return error;
    })
}
