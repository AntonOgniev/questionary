import axios from '../../axios/axios-quiz';
import { CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION } from './actionTypes';




import { initializeApp } from "@firebase/app";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  storageBucket: "antons-quiz.appspot.com",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const image = '2.png';

// const uploadTask = storage.ref(`images/${image}`);

getDownloadURL(ref(storage, `images/${image}`))
.then((url) => {
  const img = document.getElementById('myimg');
  img.setAttribute('src', url);
})
.catch((error) => {
 console.log(error)
});

// console.log(getDownloadURL(ref(storage, `images/${image}`)));





export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION,
    item,
  };
}

export function resetQuizCreation(){
    return {
        type: RESET_QUIZ_CREATION
      }; 
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
   await axios.post('quizes.json', getState().create.quiz);
   dispatch(resetQuizCreation())
  };
}
