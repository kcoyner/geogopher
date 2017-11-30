import axios from 'axios';

export const userService = {
    register,
};

function register(user) {
    axios.post('/api/user', user)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
}