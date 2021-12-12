import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import makeToast from '../Toaster';
import { authenticate, signin } from '../auth';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
        Gandhi-india.com
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignIn({history}) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmitLogin = async(event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const formdata ={
        email:data.get('email'),
        password:data.get('password')
    }
    signin(formdata).then(response => {
        if(response.err){
            makeToast("error",response.err);
        }else{
            makeToast("success","Welcome "+response.admin.name);
            authenticate(response, () =>{
                history.push("/dashboard");
            });
        }
        setLoading(false);
    }).catch(err => {
        console.log(err);
        setLoading(false);
    })

    // try{
    //   const res = await auth.signInWithEmailAndPassword(data.get("email"),data.get("password"));
    //   const user = res.user;
    //   const usr = await fs.collection("users").doc(user.uid).get();
    //   const role = await usr.data().role;
    //   if(role==="admin" || role==="staff"){
    //     setCurrentUser({...usr.data(),id:usr.id});
    //     setLoading(false);
    //     history.push("/shop");
    //   }else{
    //     makeToast("error","Contact Admin for Authorization");
    //     setLoading(false);
    //   }
    // }catch(error){
    //   makeToast("error",error.message);
    //   setLoading(false);
    // }
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://flatlogic.com/blog/wp-content/uploads/2018/08/article_openSource.png)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmitLogin} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              { loading && (<div style={{textAlign:"center"}}>
                <CircularProgress/>
              </div>)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2" style={{textDecoration:'none',color:'black'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
// const mapDispatchToProps = (dispatch) => ({
//     setCurrentUser: user => dispatch(setCurrentUser(user))
// })
// const mapStateToprops = (state) => ({
//     currentUser: state.user.currentUser,
// })

export default withRouter(SignIn);