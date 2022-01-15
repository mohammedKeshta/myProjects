// to answer existing questions, or add new question using the users action

import { RECEIVE_USERS, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }

        case ADD_USER_QUESTION:
            const { id, author } = action

            return {
                ...state,
                [author]: {
                    ...state[author],
                    questions: state[author].questions.concat(id)
                }
            }

        case ADD_USER_ANSWER:
            const { authedUser, questionId, answer } = action

            return {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [questionId]: answer
                    }
                }
            }
            
        default:
            return state
    }
}