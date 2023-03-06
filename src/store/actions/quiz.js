import axios from '../../axios/axios-quiz';
import {
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ,
} from './actionTypes';

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart);
    try {
      const response = await axios.get('quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuiz(id) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart);
    try {
      const response = await axios.get(`quizes/${id}.json`);
      const quiz = response.data;
      console.log(quiz);
      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'success') return;
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    console.log(state.activeQuestion );

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }
      dispatch(quizSetState({ [answerId]: 'success' }, results));


      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } if (state.activeQuestion === 0) {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        } if (state.activeQuestion !== 0) {
          dispatch(quizNextQuestion(state.activeQuestion * 2 + 1));
        }
        window.clearTimeout(timeout);
      }, 500);
    } else {
      if (state.activeQuestion === 0) {
        dispatch(quizNextQuestion(state.activeQuestion + 2));
      } if (state.activeQuestion !== 0) {
        dispatch(quizNextQuestion(state.activeQuestion * 2 + 2));
      }
    }
  };
}

function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  };
}
export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e,
  };
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  };
}

export function quizNextQuestion(questionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    questionNumber: questionNumber,
  };
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ,
  };
}
