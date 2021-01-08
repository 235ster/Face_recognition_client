import React from 'react'

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			email : '',
			password: '',
			name : '',
			invalidFormSubmission : ''
		}
	}
	onNameChange = (event) => {
		this.setState({name : event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email : event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password : event.target.value});
	}

	onClickRegister =() => {
		fetch('https://evening-waters-08019.herokuapp.com/register', {
			method : 'post',
			headers : {'Content-Type' : 'application/json'},
			body : JSON.stringify({email : this.state.email , 
								password : this.state.password,
								name : this.state.name
								})
		})
	    .then(response => response.json())
	    .then(user => {
	    	if(user.id){	    		
	    	this.props.setUserProfile(user);
	    	this.props.setChoice('home')
	    }
	    else{
			this.setState({invalidFormSubmission : <p className='b link dim dark-red'>Enter all the mandatory fields</p> });
	    }})	
	    // this.props.setChoice('signin')
	}

	render(){
		return(
		<article className="mw6 center br3 pa3 pa4-ns mv3 ba b--black-10 bw1 shadow-5">
			<main className="pa4 black-80 center">
			  <div className="measure">																																																																																							
			    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
			    <legend className="f4 fw6 ph0 mh0">Register</legend>
			   	  <div className="mt3">
			        <label className="db fw6 lh-copy f6">Name</label>
			        <input onChange={this.onNameChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="name" name="name"  id="name" />
			      </div>
			      <div className="mt3">
			        <label className="db fw6 lh-copy f6">Email</label>
			        <input onChange={this.onEmailChange}
			        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="email" name="email-address"  id="email-address" />
			      </div>
			      <div className="mv3">
			        <label className="db fw6 lh-copy f6">Password</label>
			        <input onChange={this.onPasswordChange}
			        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
			        type="password" name="password"  id="password" />
			      </div>
			    </fieldset>
			    <div className="">
			      <input onClick={this.onClickRegister}
			      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib" 
			      	type="submit"
			      	value="Register" />
			    </div>
			    <div className="">{this.state.invalidFormSubmission}
			    </div>
			  </div>
			</main>
		</article>
		);
	}
}
export default Register;
