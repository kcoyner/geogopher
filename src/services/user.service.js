import axios from 'axios';

export const userService = {
    register,
    getGoogleUserInfo,
    logout,
    login,
};

function register(user) {
    let body = user || { 'anonymous': true };
    if(body.anonymous) {
        return axios.post('/api/anonymous', body)
            .then(function (response) {
                return response.data
            })
            .catch(function (error) {
                return error;
            })
    } else {
        return axios.post('/api/user', body)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
         return;
        });
    }
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
            return response.data;
        })
        .catch(function(error) {
            return error;
        })
}

function logout() {
    return new Promise(function(resolve) {
        localStorage.removeItem('user');
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
