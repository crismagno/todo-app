const INITIAL_STATE = {
    description: '',
    list: [{
        _id: 1,
        description: 'pagar fatura amanhã!',
        done: false
    }, {
        _id: 2,
        description: 'ir ao shopping!',
        done: true
    }, {
        _id: 3,
        description: 'estudar angular!',
        done: true
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'CHANGE_DESCRIPTION':
            return { ...state, description: action.payload }
        case 'TODO_SEARCHED':
            return { ...state, list: action.payload }
        case 'TODO_ADDED':
        case 'TODO_CLEAR':
            return { ...state, description: '' }
        default: 
            return state
    }
}