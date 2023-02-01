import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const EmailReducer=(emailState, action)=>{
  if(action.type==='USER_INPUT'){
    return { value:action.val, isValid: action.val.includes('@')};
  }
  if(action.type === 'INPUT_BLUR'){
    return { value:emailState.value, isValid: emailState.value.includes('@')};
  }
  return { value:'', isValid: false};
};
const passwordReducer=(emailState, action)=>{
  if(action.type==='USER_INPUT'){
    return { value:action.val, isValid: action.val.length>6};
  }
  if(action.type === 'INPUT_BLUR'){
    return { value:emailState.value, isValid: emailState.value.length>6};
  }
  return { value:'', isValid: false};
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState(); 
  const [enteredCollege, setEnteredCollege] = useState('');
  const [collegeIsValid, setCollegeIsValid] = useState(); 
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailstate, dispatchEmail] = useReducer(EmailReducer,{
    value:'',
    isValid :null
  });
  const [passwordState, dispatchPassword]=useReducer(passwordReducer,{
    value:'',
    isValid:null
  });
  useEffect(()=>{
    console.log("Effect running");
    return(()=>{
      console.log('Effect CleanUp');
    })
  },[]);
  const {isValid : emailIsValid} = emailstate;
  const {isValid : passwordIsValid} = passwordState
  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log('checking for validity');
      setFormIsValid(
        
        emailIsValid && passwordIsValid
      );
    },500);
    return ()=>{ 
      console.log('CLEANUP');
      clearTimeout(identifier);
    }
  },[ emailIsValid, enteredCollege,passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});
    // setFormIsValid(
    //   passwordState.isValid && emailstate.isValid
    // );
  };
  const collegeChangeHandler = (event) => {
    setEnteredCollege(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'USER_INPUT', val:event.target.value})
    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailstate.isValid
    // );
  };

  const validateEmailHandler = () => {
   dispatchEmail({type:'INPUT_BLUR'})
  };
  const validateCollegeHandler = () => {
    setCollegeIsValid(enteredCollege.trim().length>0);
  };
  
  const validatePasswordHandler = () => {
    dispatchPassword({typr:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailstate.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailstate.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailstate.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
