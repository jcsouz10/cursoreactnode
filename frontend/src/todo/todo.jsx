import React, {Component} from 'react';
import PageHeader from '../template/pageHeader';

import TodoForm from './todoForm';
import TodoList from './todoList';

import axios from 'axios';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
    constructor (props) {
        super(props);
        
        this.state={
            description: '',
            list: [],
        }

        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPeding = this.handleMarkAsPeding.bind(this);        
        this.handleAdd = this.handleAdd.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refresh()
    }

    refresh (description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp=>this.setState({
            ...this.state, description, list: resp.data
        }))
    }

    handleChange(e){
       this.setState({
           ...this.state, description: e.target.value
       })

       console.log(this.state.description)
    }

    handleAdd(){
        const description = this.state.description;
        axios.post(URL, {description})
        .then(resp=>this.refresh())
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
        .then(resp=>this.refresh(this.state.description))
    }

    handleMarkAsDone(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
        .then(resp=>this.refresh(this.state.description))
    }

    handleMarkAsPeding(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
        .then(resp=>this.refresh(this.state.description))
    }

    handleSearch (){
        this.refresh(this.state.description)
    }

    render (){
        return (
            <div>
               <PageHeader name='Tarefas' small='Cadastro'/>
               <TodoForm handleSearch={this.handleSearch} handleChange={this.handleChange} handleAdd={this.handleAdd}/>
               <TodoList 
               handleMarkAsPeding={this.handleMarkAsPeding}
               handleMarkAsDone={this.handleMarkAsDone}
               handleRemove={this.handleRemove} 
               list={this.state.list}/>
            </div>
        )
    }
}