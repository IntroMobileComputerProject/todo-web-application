import * as React from 'react';
import { useState } from 'react'; // Added this line
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment'; // Adjusted to v5
import IconButton from '@mui/material/IconButton'; // Adjusted to v5
import Visibility from '@mui/icons-material/Visibility'; // Adjusted to v5
import VisibilityOff from '@mui/icons-material/VisibilityOff'; // Adjusted to v5
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Alert } from '@mui/material';
import { Snackbar, Button } from '@mui/material';


const theme = createTheme();
export default function SignIn() {
  let navigate = useNavigate();
  let [cookies, setCookie] = useCookies(['token']);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('');
  const handleOpenSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setOpenSnackbar(true);
  };


  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSignIn = (event) => {
    event.preventDefault();
    axios.post(
      'http://localhost:5131/Tokens',
      {
        "userName": username,
        "userPassword": password,
      },
      {
        headers: { Authorization: `Bearer ${cookies.token}` },
        timeout: 10 * 1000,
      }
    )
      .then((response) => {
        handleOpenSnackbar("login successfully!", 'success');
        setCookie('token', response.data.token);
        navigate('/main');
        console.log(response.data.token);
      })
      .catch((error) => {
        handleOpenSnackbar("login fail!", 'error');
        if (error.code === 'ECONNABORTED') {
          console.log('timeout')
        } else if (error.response) { // Checking if error.response exists to avoid potential issues
          console.log(error.response.status);
        } else {
          console.log(error.message); // Log general error message if nothing else is applicable
        }
      });
  }

  return (
    <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSignIn(e)}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="forget-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
    </ThemeProvider >
    <Snackbar
    open={openSnackbar}
    autoHideDuration={6000}
    onClose={handleCloseSnackbar}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
>
    <Alert variant='filled' onClose={handleCloseSnackbar} severity={snackbarType}>
        {snackbarMessage}
    </Alert>
</Snackbar>
    </div>
  );
}