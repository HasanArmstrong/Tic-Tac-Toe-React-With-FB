import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookRoute extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn: false,
      username: null
    }
  }

   handleTest= async () => {
     // make post request to server to write high score
     let data= new URLSearchParams();
     data.append('player',resp.name)
     data.append('score',resp.score)
 
     const url ='http://ftw-highscores.herokuapp.com/tictactoe-dev'
    const resp= await fetch(url,{
      method:'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });
    let json = await resp.json();
    console.log('received response', json);
   }

  responseFacebook = (resp) => {
    console.log(resp)
   this.setState({
    isLoggedIn: true,
    username: resp.name
   })

  }

  render() {
    return (
      <div className="App">
      
      <h1>Welcome to My App</h1>
     
      {this.state.isLoggedIn ? null: <FacebookLogin
        appId="319866152003850"
        autoLoad={true}
        callback={(resp) => this.responseFacebook(resp)} />}
         <p>Username: {this.state.username}</p>
         <button onClick={this.handleTest}>Send new high score</button>
      </div>
    
    );
  }
}

export default FacebookRoute;
