import axios from 'axios';

export const userService = {
    register,
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