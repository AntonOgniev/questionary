import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswersList from "./AnswersList/AnswersList";



import { initializeApp } from "@firebase/app";
import { getStorage, getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  storageBucket: "antons-quiz.appspot.com",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

const image = '2.png';


// getDownloadURL(ref(storage, `images/${image}`))
// .then((url) => {
//   const img = document.getElementById('myimg');
//   img.setAttribute('src', url);
// })
// .catch((error) => {
//  console.log(error)
// });

const getImg = () => {
  console.log("sdcdv")
}




const ActiveQuiz = (props) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <img id="myimg" alt="myimg" width={'350px'}></img>
      <span>
        <strong>{props.answerNumber}.</strong>&nbsp;
        {props.question}
      </span>
      <small>
        {props.answerNumber} з {props.quizLength}
      </small>
    </p>

    <AnswersList
      answers={props.answers}
      onAnswerClick={props.onAnswerClick}
      state={props.state}
    />
  </div>
);

export default ActiveQuiz;
