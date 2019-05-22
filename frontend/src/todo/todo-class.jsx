import React, { Component }  from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {


    constructor(props) {
        super(props) 
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.refresh()
    }
    
    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '' 
        axios(`${URL}?sort=-createDate${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data}))
    }

    handleAdd (){
        const description = this.state.description
        axios.post(URL, { description })
            .then(resp => this.refresh())
    }

    handleSearch = () => {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value})
    }

    handleRemove (todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMArkAsDone = (todo) => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending = (todo) => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    handleClear = () => {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm 
                    description={this.state.description}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    handleSearch={this.handleSearch}
                    handleClear={this.handleClear}
                    />

                <TodoList 
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMArkAsDone={this.handleMArkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                    />
            </div>
        )
    }
}