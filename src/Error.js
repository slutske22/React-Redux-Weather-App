import React from 'react';

class Error extends React.Component{
  constructor(props){
     super(props)
  }

  render(){
     return(
        <h3 className="error">{this.props.callerError}</h3>
     )
  }
}

export default Error;
