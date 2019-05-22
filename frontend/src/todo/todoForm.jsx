import React, { Component } from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { add, changeDescription, search, clear } from "./todoActions";
import Grid from '../template/grid'
import IconButton from '../template/iconButton'

class TodoForm extends Component {

    componentWillMount() {
        this.props.search()
    }
    
    keyHandle = e => {
        const { add, clear, search, description } = this.props
        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description) 
        } else if (e.key === 'Escape') {
            clear()
        }
    }

    render(){
        const { add, search, description } = this.props
        return (
            <div role="form" className="todoForm">
                <Grid cols="12 9 10">
                    <input id="description" className="form-control" 
                        placeholder="Adicione uma tarefa..." 
                        value={description}
                        onKeyUp={this.keyHandle}
                        onChange={this.props.changeDescription}></input>
                </Grid>
    
                <Grid cols="12 3 2">
                    <IconButton style="primary" icon="plus" 
                        onClick={() => add(description)}/>
                    <IconButton style="info" icon="search" 
                        onClick={search}/>
                    <IconButton style="default" icon="close" 
                        onClick={this.props.clear}/>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })
const mapDispatchToprops = dispatch => bindActionCreators({ add, changeDescription, search, clear }, dispatch)

export default connect(mapStateToProps, mapDispatchToprops)(TodoForm)