import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import makeToast from '../Toaster';
import { connect } from 'react-redux';
import { authenticate, signup } from '../auth';

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

function SignUp({history}) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    // // eslint-disable-next-line no-console
    const formdata = {
      name:data.get('name'),
      email:data.get('email'),
      password:data.get('password')
    }

    signup(formdata).then(response => {
      if(response.error){
        makeToast("error",response.error);
      }else{
        makeToast("success","Hi "+ response.admin.name);
        authenticate(response, () =>{
          history.push("/dashboard");
        });
      }
      setLoading(false);
    }).catch(err => {
      console.log(err);
      setLoading(false);
    })
    // if(data.get("email") && data.get("password") && data.get("name")){
    //   setLoading(true);
    //   try{
    //     const res = await auth.createUserWithEmailAndPassword(data.get("email"),data.get("password"));
    //     const user = res.user;
    //     await fs.collection("users").doc(user.uid).set({
    //      FullName: data.get("name"),
    //      Email: data.get("email"),
    //      role: 'user'
    //     })
    //     setLoading(false);
    //     auth.signOut();
    //     makeToast("warning", "Account Created. Contact admin for authorization.")
    //     history.push("/");
    //   }catch(error){
    //     makeToast("error",error.message);
    //     setLoading(false);
    //   }
    // }else{
    //   setLoading(false);
    // }
  };

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
              REGISTER YOURSELF
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                CREATE ACCOUNT
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin" variant="body2" style={{textDecoration:'none',color:'bla'}}>
                    {"Already have an account? Sign In"}
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
export default connect(null)(SignUp);