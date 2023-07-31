import axios from 'axios';

const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regular expression pattern for email validation

const getAll = (url) => axios.get(url);

// Check if the email matches the pattern
const validateEmail = (email) => {
    return pattern.test(email);
}

export { getAll, validateEmail };