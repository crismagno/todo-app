import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"

import { markAsDone, markAsPending, remove } from './todoActions'

import IconButton from "../template/iconButton"

const TodoList = props => {

    const renderRows = () => {
        const list = props.list || []
        return list.map(todo => {
            return (
                <tr key={todo._id}>
                    <td className={todo.done ? 'markedAsDone' : ''}>{todo.description} 
                        <span className="data">{todo.createDate}</span></td>
                    <td className='tableActions'>
                        <IconButton style='success' icon="check" hide={todo.done}
                            onClick={() => props.markAsDone(todo)}/>
                        <IconButton  style='warning' icon="undo" hide={!todo.done}
                            onClick={() => props.markAsPending(todo)}/>
                        <IconButton  style='danger' icon="trash-o"
                            onClick={() => props.remove(todo)}  />
                    </td>
                </tr>
            )
        })
    }
    
    return (
        <div className='divTable'>
            <table className="table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = state => ({list: state.todo.list})
const mapDispatchToProps = dispatch => bindActionCreators({ markAsDone, markAsPending, remove }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)