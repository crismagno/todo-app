import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = e => ({
    type: 'CHANGE_DESCRIPTION',
    payload: e.target.value
})

export const search = (description = '') => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const pesquisa = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createDate${pesquisa}`)
            .then(resp => dispatch({ type: 'TODO_SEARCHED', payload: resp.data }))
    }
}

export const add = description => {
    return dispatch => {
        axios.post(URL, { description })
            .then(resp => dispatch(clear()))
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch({ type: 'TODO_MARK_AS_DONE', payload: resp.data }))
            .then(resp => dispatch(search()))
    }
}

export function markAsPending(todo) {
    return function(dispatch) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch({ type: 'TODO_MARK_AS_PENDING', payload: resp.data }))
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch(search()))
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR'}, search()]
}