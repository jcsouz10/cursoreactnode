import React from 'react';

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => (
        <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                        <input onChange={props.handleChange} id='description' className='form-control' placeholder='Adicione uma tarefa'></input>
                </Grid>

                <Grid cols='12 3 2'>
                        <IconButton onClick={props.handleAdd} style='primary' icon='plus'/>
                        <IconButton style='info' icon='search' onClick={props.handleSearch}/>
                </Grid>
        </div>
)