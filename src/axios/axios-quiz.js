import axios from 'axios';

export default axios.create({
  baseURL: 'https://antons-quiz-default-rtdb.europe-west1.firebasedatabase.app/',
});
