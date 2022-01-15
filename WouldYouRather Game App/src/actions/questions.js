//An action for dealing(adding new question/answering an existing questions) with the questions object at the Store
import { addUserQuestion } from '../actions/users';
import { saveQuestion } from '../utils/api'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestionAnswer(authedUser, questionId, answer) {
    return {
        type: ADD_QUESTION_ANSWER,
        authedUser,
        questionId,
        answer
    };
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    };
}

export function handleSaveQuestion(optionOneText, optionTwoText, author) {
    return dispatch => {
        return saveQuestion({ optionOneText, optionTwoText, author })
            .then(
                question => {
                    dispatch(addQuestion(question));
                    dispatch(addUserQuestion(question)); //there something wrong in here **********
                }
            );
    };
}