import React, {useState} from 'react'
import { Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import useStyles from './Styles'
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signup,signin} from '../../actions/auth'



const Auth = () => {
    const classes = useStyles();

    const initialState = {firstName: '',lastName: '',password:'',confirmPassword: ''};


    const [isSignup,setSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);


    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = ()=> setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit= (e)=>{
        e.preventDefault();

        if(isSignup){
         dispatch((signup(formData,history)));
        }else{
            dispatch((signin(formData,history)));
        }

}

const handleChange = (e)=>{
setFormData({...formData, [e.target.name]: e.target.value})
};


    const switchMode = ()=>{
        setSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }


    const googleSuccess= async (res) =>{
        const result = res?.profilrObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH',data: {result,token}});

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    }
    
    const googleFailure= (error) =>{
        console.log("Goodle Sign In was unsuccessfull.");
        console.log(error);
    }




  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}
            >

        
                <Grid container spacing={2}>
                    {
                        isSignup && (
                            <>
                            <Input name="firstName" label = "First Name" handleChange = {handleChange} autoFocus half/>
                            <Input name="lasttName" label = "Last Name" handleChange = {handleChange} half/>
                            </>
                        )}

                        <Input name = "email" label = "Email Address" handleChange={handleChange} type = "email"/>
                        <Input name = "password" label = "Password" handleChange={handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword} />
                        {isSignup && <Input name = "confirmPassword" label = "Repeat Password" handleChange={handleChange} type = {"password"} />}
                </Grid>

               

                <Button type = "submit" fullWidth variant="contained" color="primary" className="classes.submit">
                   {isSignup ? 'Sign Up' : 'Sing In'} 
                </Button>

                <GoogleLogin
                clientId ="998311529236-92cfkl9bl50e0941vkjkcjk0ros5a0mf.apps.googleusercontent.com"
                render = {(renderProps) => (
                    <Button className={classes.googleButton} color = "primary" 
                    fullWidth onClick = {renderProps.onClick}
                    disabled = {renderProps.disabled}
                    startIcon = {<Icon />}
                    variant = "contained"
                     >Google Sign In
                     </Button>
                )}
                onSuccess = {googleSuccess}
                onFailure = {googleFailure}
                cookiePolicy = "single_host_origin"
                />

                <Grid container justifyContent="flex-end">
                    <Grid item>
                         <Button onClick = {switchMode}>
                            {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sgin Up "}
                         </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>

    </Container>
  );
};

export default Auth