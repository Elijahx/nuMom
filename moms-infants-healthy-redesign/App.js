import React from 'react';
import LogIn from "./LogIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import Firebase from "./Firebase";
import {AsyncStorage} from 'react-native';



export default class App extends React.Component {
  state = {
    screen: 'login',
    uid: null,
    fullName: null,
    babyGender: null
  };

  constructor(props) {
    super(props);
    this.getCookie('email').then((email) => {
      this.getCookie('password').then((password) => {
        if (email && password) this.loginWithEmailPassword(email, password);})
  })
}

  setAppState = (object) => {
    this.setState(object)
  };

  saveCookie = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value).then((result) => console.log('Stored key to value: ', key, value))
    } catch (e) {
      console.log("Error storeData: " + e)
    }
  };

  getCookie = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch(e) {
      console.log("Error getData: " + e)
    }
  };

  loginWithEmailPassword = (email, password) => {
    this.setAppState({email: email});
    this.setAppState({password: password});
    this.saveCookie('email', email);
    this.saveCookie('password', password);

    if (email && password) {
      let fb = new Firebase();
      fb.logIn(email, password).then(response => {
        this.loginWithUid(response.user.uid);
        console.log("Successful Login!", response);
      }, e => {
        alert("Invalid E-mail and Password Combination!")
      })
    } else {
      alert("Please enter your E-Mail and Password!")
    }
  };

  loginWithUid = (uid) => {
    let fb = new Firebase();
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'@'+today.getHours()+':'+today.getMinutes();
    fb.storeInKeyToValue(uid, 'lastInteraction', date);
    fb.getUserInfo(uid).on('value', (snapshot) => {
      this.setAppState({fullName: snapshot.val().fullName});
      this.setAppState({babyGender: snapshot.val().babyGender});
      this.setAppState({screen: 'homepage'});
    });
  };


  logout = () => {
    this.setAppState({uid: null});
    this.setAppState({fullName: null});
    this.setAppState({screen: 'login'});
    this.saveCookie('email', '');
    this.saveCookie('password', '');
  };

  render() {
    if (this.state.screen === 'login') {
      return (<LogIn setAppState={this.setAppState} login={this.loginWithEmailPassword}/>)
    } else if (this.state.screen === 'signup') {
      try {
        return (<SignUp setAppState={this.setAppState} login={this.loginWithEmailPassword}/>)
      } catch (err) {
        this.setAppState({screen: 'login'})
      }
    } else {
      return (<Homepage setAppState={this.setAppState} fullName={this.state.fullName} logout={this.logout}/>)
    }
  }
}
