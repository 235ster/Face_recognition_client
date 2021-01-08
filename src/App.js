import './App.css';
import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageSearch from './components/ImageSearch/ImageSearch';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';



const initialState = {
  searchInput:'',
  imageLink:'' ,
  box: {},
  route : 'signin',
  user : {
    id : '',
    name : '',
    email : '',        
    entries : '',
    join_date : ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    }
  

  setUserProfile = (data) => {
    console.log("Register data", data);
    this.setState({ user : {
      id : data.id,
      name : data.name,
      email : data.email,        
      entries : data.enteries,
      join_date : data.joined
    }})
    console.log("From front end user saved as :", this.state.user);
  }

  getboxBoundary = (dimensions) =>{
    const boxdim= dimensions.outputs[0].data.regions[0].region_info.bounding_box;    
    const width=document.getElementById('imgDim').width;
    const height=document.getElementById('imgDim').height;
    const bounding_box={
      leftCol: width * boxdim.left_col,
      topRow : height * boxdim.top_row,
      rightCol: width - (boxdim.right_col * width),
      bottomRow: height - (boxdim.bottom_row * height)
    }
    this.setState({box : bounding_box} );
  }

  setChoice =(choice)=> {
    if (choice === 'signin') {
      this.setState(initialState);
    }
    this.setState({route : choice});
  }

  onSearch = (event) => {
    this.setState({searchInput: event.target.value});
  }

  onButtonClick  = (event)=> {
    this.setState({imageLink : this.state.searchInput});
    fetch('https://evening-waters-08019.herokuapp.com/imagedetect', {
        method: 'post', 
        headers: {'Content-Type': 'application/json'},        
        body: JSON.stringify({searchInput : this.state.searchInput})})
    .then(res => res.json())
    .then(response => { if(response) {
      this.getboxBoundary(response);
      fetch('https://evening-waters-08019.herokuapp.com/image', {
        method: 'put', 
        headers: {'Content-Type': 'application/json'},        
        body: JSON.stringify({id : this.state.user.id})})
      .then(res => res.json())
      .then (data => {this.setState(Object.assign(this.state.user, { entries :data }))})
    }}    
    ).catch((err) => console.log(err));
  }
  render(){
    const {imageLink, box} = this.state;
    return (
      <div className="App">
        <div>
          { (this.state.route === 'home' ) ?
            <div>
              <Navigation setChoice={this.setChoice}/>          
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageSearch onSearch={this.onSearch} onButtonClick={this.onButtonClick} />
              <FaceRecognition imageLink={imageLink} box={box}/>
            </div>
            : (this.state.route === 'signin') ?
              <Signin setUserProfile={this.setUserProfile} setChoice={this.setChoice}/>              
              :
              <Register setChoice={this.setChoice} setUserProfile={this.setUserProfile}/>            
          }          
      </div>
      </div>
    );
  }
}
export default App;
