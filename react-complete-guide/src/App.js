import React, { useState }  from 'react';
import './App.css';
import Person from './Person/Person';

const app = props =>  {

  const [personsState, setPersons] = useState({
  
    persons: [
      {name: "Troy", age: 34},
      {name: "Kimmie", age: 32},
      {name: "Stephen", age: 30}
    ],
    otherState: "something else"
    
  });

  const [otherState, setOtherState]=useState('some other value');
  console.log(otherState);
  const switchNameHandler = () => {
    //console.log("Clicked")
    // nope!! this.state.persons[0] = "The Sun God, Ra";
    setPersons({
      persons: [
        {name: "Garfield", age: "Eternal"},
        {name: "sorry Jon", age: "Endless"},
        {name: "going to save us all, Jon", age: "uncalculable"}
      ]
    });
  };




   {
    return (
      <div className="App">
        <h1>Hi, I'm a react App</h1>
        <p>This is working</p>
        <button onClick={switchNameHandler}>Switch Name</button>
        <Person name = {personsState.persons[0].name} age = {personsState.persons[0].age} />
        <Person name = {personsState.persons[1].name} age = {personsState.persons[1].age} > I like DnD </Person>
        <Person name = {personsState.persons[2].name} age = {personsState.persons[2].age} />

      </div>
    );
    //return React.createElement('div', null, React.createElement('h1', {className: 'App'}, "Does this work now?"));
  }
}



export default app;


