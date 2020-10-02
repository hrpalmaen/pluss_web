import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = (props) =>
    <>
        <CircularProgress  size={props.size}/>
    </>


export default Loading