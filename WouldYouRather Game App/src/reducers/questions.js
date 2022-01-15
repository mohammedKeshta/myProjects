// to answer existing questions, or add new question using the questions action

import { RECEIVE_QUESTIONS, ADD_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }

        case ADD_QUESTION_ANSWER:
            const { authedUser, questionId, answer } = action

            return {
                ...state,
                [questionId]: {
                    ...state[questionId],
                    [answer]: {
                        ...state[questionId][answer],
                        votes: state[questionId][answer].votes.concat([authedUser]) //i added []
                    }
                }
            }

        case ADD_QUESTION:
            const { question } = action;

            return {
                ...state,
                [question.id]: question
            }
        default:
            return state
    }
}