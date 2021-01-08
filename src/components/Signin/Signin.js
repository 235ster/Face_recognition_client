import React from 'react';


class Signin extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			signInEmail : '',
			signInPassword: '',
			showError : ''
		}
	}

	OnEmailChange = (event) => {
		this.setState({signInEmail : event.target.value});
	}

	OnPasswordChange = (event) => {
		this.setState({signInPassword : event.target.value});
	}

	onClickSubmit =() => {
		fetch('https://evening-waters-08019.herokuapp.com/signin', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({email : this.state.signInEmail , password : this.state.signInPassword})
		})
	    .then(response => response.json())
	    .then(user => {
	    	if(user.id){
	    		console.log("Hey the user is", user);
	    		this.props.setUserProfile(user);
	    		this.props.setChoice('home');
	    	}else{
	    	this.setState({showError : <p className='b link dim dark-red'>Invalid credentials</p>}); 
	    	}
		})
		.catch(err => console.log (err))
	}

	render(){
		return(
			<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 bw1 shadow-5">
				<main className="pa4 black-80 center">
				  <div className="measure">																																																																																							
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				    <legend className="f4 fw6 ph0 mh0">Face Recognition</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6">Email</label>
				        <input onChange={this.OnEmailChange}
				        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="email" name="email-address"  id="email-address" />
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6">Password</label>
				        <input onChange={this.OnPasswordChange}
				        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
				        type="password" name="password"  id="password" />
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onClickSubmit}
				      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
				      	type="submit"
				      	value="Sign in" />
				    </div>
				    <div className="lh-copy mt3">
				      <p className="f5 link dim black db" onClick={() => this.props.setChoice('register')}>Register</p>
				    </div>
				    <div>
				    	{this.state.showError}
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}
export default Signin;
