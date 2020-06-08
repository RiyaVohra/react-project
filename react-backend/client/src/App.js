import React, { Component } from 'react';
import './App.scss';
import { AiOutlineSearch } from 'react-icons/ai';
import { FcSurvey,FcSearch } from 'react-icons/fc';
import { FiXCircle,FiSearch } from "react-icons/fi";
import { AiFillPlusSquare,AiFillMinusSquare} from 'react-icons/ai'

import { MdPerson } from "react-icons/md";
// import SearchField from "react-search-field";
// import SelectSearch from 'react-select-search';
import { IconButton } from '@material-ui/core';


class App extends Component {

    constructor(props) {
      super(props);
        this.state = {
            employees: [],
            employee: '',
            value:'select',
            surveys:[],
            assigned_surveys:[],
            unassigned_surveys:[],
            survey: '',
            assigned_survey:'',
            unassigned_survey:'',
            searchString:[],
            responseData: [],
            assigned_responseData:[],
            unassigned_responseData:[],
            query: ''

        };
    }
    change = (event) => {
        this.setState({value: event.target.value});
    }

    onSurveyChange = (event) => {
        this.setState({
            survey : event.value
        });
    }

    handleInputChange = (event) => {
        this.setState({
            query: event.target.value
        },()=>{
            this.filterArray();
        })

    }
    filterArray = () => {
        let searchString = this.state.query;
        let surveys = this.state.surveys;
        let responseData;


        if(searchString.length > 0){
            responseData = surveys.filter((surveyname) => {
                let surveyName = surveyname.name;
                if (surveyName.includes(searchString))
                    return surveyname
            })

            this.setState({
                responseData
            })
        }

    }
    handleClearClick= (event) =>  {
        this.setState({
            query: '',
            responseData:this.state.surveys
        });
    }


    componentDidMount() {
        console.log("fetching data");
        fetch('/server/employeelist', {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        })
            .then(response => response.json())
             .then(data => this.setState({employees: data}))
             .catch(error => this.setState({error}));

        console.log("data:"+ this.state.employees);


         console.log("fetching survey list data");
         fetch('/server/surveylist', {
             headers : {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
             }

         })
             .then(response => response.json())
             .then(data => this.setState({responseData: data,surveys: data,assigned_surveys: data}))
             .catch(error => this.setState({error}));

              this.state.assigned_surveys=this.state.assigned_surveys.filter(survey => survey.name.includes('Survey6'));


         // we only get here if there is no error
    }
    render()
    {
        let employees = this.state.employees;
        let optionItems = employees.map((employee) =>
            <option key={employee.name} value={employee.name}>
                {employee.name}
            </option>
        );

    return (
    <div align="left">
    <div className="App">
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="">
                    <img class="rounded-img" src="data:image/png;base64,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"/>
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item">
                        Home
                    </a>

                    <a className="navbar-item">
                        Documentation
                    </a>

                    <a className="navbar-item">
                            Contact Us
                    </a>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-primary">
                                <strong>Sign up</strong>
                            </a>
                            <a className="button is-light">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <nav className="navbar is-primary" role="navigation" aria-label="navigation" color={'#fa7c91'}>
            <div className="navbar-brand">
            <p className="navbar-item">Employee Portal</p>
            </div>
        </nav>
      <header className="App-header">
        <p>
            <h5 color={'#8a4d76'}>Select Employee</h5>
            <div className="field">
                <p className="control">
                <span className="select">
                    <select id="employee" onChange={this.change} value={this.state.value} className="fa">
                      <option value="select">Select </option>
                        {optionItems}
                    </select>
                    {/*<p className="subtitle is-4">{this.state.value}</p>*/}
                </span>
                </p>
            </div>
        </p>
      </header>
    </div>
        <div className="flex-container">
           <div className="flex-child" align="left">
               <div className="list">
                <article className="panel is-primary">
                <p className="panel-heading">
                    Survey List
                </p>
                <div className="panel-block" align="left">
                    <p className="control has-icons-left">
                        <form>
                            <input type="text" className="input is-rounded" id="filter" placeholder="Search for..."   value={this.state.query} onChange={this.handleInputChange}/>
                            <button type="button" className="button is-rounded is-small is-info" color={'#8a4d76'} value={this.state.query} onChange={this.handleInputChange}>
                                <FiSearch/>
                            </button>
                            <button type="button" className="button is-rounded is-small is-danger" color={'#8a4d76'} value='Search for...' onClick={this.handleClearClick}>
                               <FiXCircle/>
                            </button>
                        </form>
                        <div className="container is-grouped">
                            {this.state.responseData.map((i) =>
                                    <div className="field " style={{ paddingRight: '0px', cursor: 'pointer' }}>
                                      <a color={'#000000'}>
                                       <span className="icon">
                                        <FcSurvey/>
                                       </span>
                                       {i.name}
                                      </a>
                                    <div  className="button is-primary is-light is-small field " style={{ position: "relative",
                                        left: '130px',cursor: 'pointer', alignItems:'center'}} >
                                          <AiFillPlusSquare/>
                                    </div>

                                    </div>)}
                        </div>
                        <div className="search-icon-container">
                            <div className="search-icon" />
                        </div>
                    </p>
                </div>
            </article>
           </div>
           </div>
            <div className="flex-child" align="left">
            <div className="assignedlist">
                <article className="panel is-primary">
                    <p className="panel-heading">
                        Assigned Survey
                    </p>
                        <div className="panel-block" align="left">
                            <p className="control has-icons-left">
                                <form>
                                    <input type="text" className="input is-rounded" id="filter" placeholder="Search for..."   value={this.state.query} onChange={this.handleInputChange}/>
                                    <button type="button" className="button is-rounded is-small is-info" color={'#8a4d76'} value={this.state.query} onChange={this.handleInputChange}>
                                        <FiSearch/>
                                    </button>
                                    <button type="button" className="button is-rounded is-small is-danger" color={'#8a4d76'} value='Search for...' onClick={this.handleClearClick}>
                                        <FiXCircle/>
                                    </button>
                                </form>
                                <div className="container is-grouped">
                                    {this.state.assigned_surveys.map((i) =>
                                        <div className="field " style={{ paddingRight: '0px', cursor: 'pointer' }}>
                                            <a color={'#000000'}>
                                       <span className="icon">
                                        <FcSurvey/>
                                       </span>
                                                {i.name}
                                            </a>
                                            <div  className="button is-primary is-light is-small field " style={{ position: "relative",
                                                left: '90px',cursor: 'pointer', alignItems:'center'}} >
                                                <AiFillPlusSquare/>
                                            </div>
                                            <div  className="button is-danger is-light is-small field" style={{ position: "relative",
                                                left: '90px',  cursor: 'pointer' }} >
                                                <AiFillMinusSquare/>
                                            </div>

                                        </div>)}
                                </div>
                                <div className="search-icon-container">
                                    <div className="search-icon" />
                                </div>
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </div>

         <br/>

        <footer className="App">
            <div className="content has-text-centered">
                <p>
                    <figure className="image is-70x70">
                        <div class="rounded-img-container">
                            <img alt="Image" class="rounded-img" src="https://media.glassdoor.com/sqlm/863092/outline-india-squarelogo-1577440102139.png"/>
                        </div>
                    </figure>
                    The source code is licensed.
                    <br/>The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                </p>
            </div>
        </footer>
    </div>

     );
    }
}

export default App;



