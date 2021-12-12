import React from 'react'
import { Typography } from '@mui/material'
import { withRouter } from 'react-router-dom';

function Home({history}) {
    return (
        <div className='App'>
            <h1 className='landingTitle'>GANDHI-INDIA {"    "} ADMIN AREA</h1>
        <div className='landing'>
            <button className='landingbutton' onClick={() => history.push("/signin")}>LOGIN</button>
            <button className='landingbutton' onClick={() => history.push("/signup")}>REGISTER</button>
        </div>
        <div style={{position:'fixed',bottom:'10px', marginLeft:"50%", transform:'translateX(-50%)'}}>
        <Typography variant="body2" color="#fff" align="center" >
        {'Copyright © '}
            Gandhi-india.com
        {' '}
        {new Date().getFullYear()}
        {'.'}
        </Typography>
        </div>
        </div>
    )
}

export default withRouter(Home);
