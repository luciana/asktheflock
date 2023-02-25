// eslint-disable-next-line
import React, { Component } from "react";
import { Auth as AmplifyAuth } from "aws-amplify";

export default class FacebookButton extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn;
    this.signOut = this.signOut;
    this.state = {
      isLoading: true
    };
  }

  async componentDidMount() {
    console.log("FB button is mounted");
    this.loadFacebookSDK();
    this.createScript();
    this.setState({ isLoading: false });
  }

  loadFacebookSDK() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "871844790696427",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v6.0",
        cookie: true,
    
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }


  signOut=() => {
    const fb = window.FB;
    if (!fb) {       
        return Promise.resolve();
    }

    fb.getLoginStatus(response => {
        if (response.status === 'connected') {
            return new Promise((res, rej) => {
                console('facebook signing out');
                fb.logout(response => {
                    res(response);
                });
            });
        } else {
            return Promise.resolve();
        }
    });
}

  // #1
  signIn = () => {
    const fb = window.FB;
    fb.getLoginStatus(response => {
      if (response.status === "connected") {
        console.log("You're already connected");
        this.getAWSCredentials(response.authResponse);
      } else {
        console.log("You're not connected");
        fb.login(
          response => {
            if (!response || !response.authResponse) {
              return;
            }
            console.log(
              "response.authResponse: " +
                JSON.stringify(response.authResponse, null, 2)          
            );
            this.getAWSCredentials(response.authResponse);
          },
          {
            // The authorized scopes
            scope: "public_profile,email"
          }
        );
      }
    });
  };

  // #2
  getAWSCredentials =(response)=> {
    console.log("Get AWS credentials response: " + response);
    const { accessToken, expiresIn } = response;
    const date = new Date();
    // eslint-disable-next-line
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const fb = window.FB;
    try {
      fb.api("/me", { fields: "name,email,gender,birthday,location" }, response => {
        console.log("FacebookButton.js signIn response", response);   
        const user = {
          name: response.name,
          email: response.email,
          locale: "en-US",
          gender: (response.gender ? response.gender : ""),
          address:(response.location ? response.location : ""),
          birthdate: (response.birthday ? response.birthday : ""),
          socialId: response.id,
          userTag: "",
        };
        console.log("Auth.federatedSignIn attempt", user);
        try {
            AmplifyAuth.federatedSignIn(
            "facebook",
            { token: accessToken, expires_at },
            user
          ).then(credentials => {                      
            console.log("User Name: " + user.name);
            console.log("User Email: " + user.email);           
            console.log("FacebookButton.js credentials=>", credentials);    
            return AmplifyAuth.currentAuthenticatedUser();                                 
          });         
          
        } catch (error) {
          console.log("Auth.federateSignIn error: " + error);
          return null;
        }
        console.log("After Auth.federatedSignIn attempt");
        return null;
      });
     
    } catch (error) {
      console.log("FB API error: " + error);
      return null;
    }
  }

  fbAsyncInit() {
    // Init the fb sdk client
    const fb = window.FB;
    fb.init({
      appId: "871844790696427",
      cookie: true,
      xfbml: true,
      version: "v6.0"
    });
  }

  initFB() {
    // eslint-disable-next-line
    const fb = window.FB;
    console.log("FB SDK inited");
  }

  createScript() {
    // Load the sdk
    window.fbAsyncInit = this.fbAsyncInit;
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    //script.onload = this.initFB;
    document.body.appendChild(script);
  }

  handleError(error) {
    console.log("Error encountered: " + error);
    alert(error);
  }

  render() {
    return (
      <div>
        <div>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="button"
            aria-pressed="false"
            autoComplete="off"
            onClick={this.signIn}
            disabled={this.state.isLoading}
          >
            Login With Facebook
          </button>
        </div>
      </div>
    );
  }
}