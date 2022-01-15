////An action for dealing (add user answer to an existing question/adding new question) with the Users Object at the Store

import { addQuestionAnswer } from './questions';
import { saveQuestionAnswer } from '../utils/api'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

function addUserAnswer(authedUser, questionId, answer) {
  return {
    type: ADD_USER_ANSWER,
    authedUser,
    questionId,
    answer
  };
}

export function addUserQuestion({ id, author }) {
  return {
    type: ADD_USER_QUESTION,
    id,
    author
  };
}

//  change all to objects if problems
export function handleSaveQuestionAnswer(authedUser, questionId, answer) {
  return dispatch => {
    dispatch(addUserAnswer(authedUser, questionId, answer));
    dispatch(addQuestionAnswer(authedUser, questionId, answer));

    return saveQuestionAnswer(authedUser, questionId, answer)
      .catch(err => {
        console.warn('Error in handleSaveQuestionAnswer:', err);
        // can remove the error catch
      });
  };
}