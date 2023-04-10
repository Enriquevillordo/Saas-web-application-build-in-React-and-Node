import config from 'config';
import { Redirect } from 'react-router-dom';
export const userService = {
    login,
    logout,
    register,
    getAll
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(response => {
            if(response.success) {
                localStorage.setItem('user', JSON.stringify(response));
                return response;
            } else {
                return response;
            }
        });
}

function logout() {
    localStorage.removeItem('user');
    // Redirect('/login');
    window.location.reload('/login')
}

function getAll() {
    return fetch(`https://jsonplaceholder.typicode.com/posts`).then(handleResponse);
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    
    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse)
        .then(response => {
            if(response.success) {
                localStorage.setItem('user', JSON.stringify(response));
                return response;
            } else {
                return response;
            }
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}