import React, {Component} from 'react' 
import GaugeChart from 'react-advanced-gauge-chart'
import {Container, Button, Row, Col } from "react-bootstrap"
import {firestore} from "../../firebase"
import {auth} from "../../firebase"


class DialPlate extends Component{
     constructor() {
        super();
        const db = firestore;
        const user = auth.currentUser.uid;

        //defining initial state
        this.state = {
          name: "React",
          pointsSum: 0,
          currentQuest: "",
          questIndex : 0,
          started: 0,
          selectedOption:"",
          gaugeChartValue:0,
          randomizedQuestions:[],
          questionList : [],
          db,
          user                     
        };

        //Binding functions
        this.onValueChange = this.onValueChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.startTest = this.startTest.bind(this);
      }

      //Gets the question list when component is mounted 
      async componentDidMount(){
        window.db = this.state.db
        const qs = await this.state.db.collection('questions').get()
        const documents = qs.docs.map(doc => doc.data())
        this.setState({questionList: documents[0].question})
      }

      //Changes the current chosen answer
      onValueChange(event) {
        this.setState({
          selectedOption: event.target.value
        });
      }

      //Mixes up the question list
      startTest() {
         var newQuestions = this.state.questionList.sort(() =>Math.random()-Math.random())
         document.getElementById("startBtn").setAttribute("disabled", true)
        const currQ = newQuestions[0]
        newQuestions.shift()
          this.setState({
            currentQuest: currQ,
            randomizedQuestions: newQuestions,
            started: 1
          })        
        }

        //Checks if answer is chosen 
        isOneChecked() {
          var chx = document.getElementsByTagName('input');
          for (var i=0; i<chx.length; i++) {
 
            if (chx[i].type === 'radio' && chx[i].checked) {
              return true;
            } 
          }
          return false;
        }

      //Gives one question after another and summurizes user's answers.
      //When the 10nth question is reached, it sets value for the chart and 
      //sends user's result to the DB 
      async formSubmit(event) {
        event.preventDefault()
        if (!this.isOneChecked()) return
        if(this.state.questIndex === 9){
            document.getElementById("nextQuestion").setAttribute("disabled", true);
            this.setState({
                pointsSum: this.state.pointsSum +  parseInt( this.state.selectedOption),
                gaugeChartValue : (this.state.pointsSum + parseInt( this.state.selectedOption))*0.025
            })

            const user =  (await this.state.db.collection('users').doc(this.state.user).get()).data()
            const tests = user.tests
            await this.state.db.collection('users').doc(this.state.user).set({
              tests: [...tests, {
                date: (new Date()).getTime(),
                score: this.state.pointsSum
              }]
            })

          }else{
            let newQuestions = this.state.randomizedQuestions
            const currQ = newQuestions[0]
            newQuestions.shift()
            this.setState({
                questIndex: this.state.questIndex +1,
                pointsSum: this.state.pointsSum +  parseInt( this.state.selectedOption),
                currentQuest: currQ,
               randomizedQuestions: newQuestions
              })         
          }}
      

      render() {
        return ( 
            <div>
              <Container className="mt-2">
                <Row >
                  <Col md={{ span: 6, offset: 3 }}  className="border" >
                        <h2 className="text-center pt-2">
                      How often do you {this.state.currentQuest}
                    </h2>
                    <hr/>
                  <form onSubmit={this.formSubmit}>
                    <div className="form-check">

                    <div className="radio ">
                    <input
                          type="radio"
                          name="answer"
                          value="0"
                          className="form-check-input"
                          id="radio-0"
                          checked={this.state.selectedOption === "0"}
                          onChange={this.onValueChange}
                          required
                        />
                      <label htmlFor="radio-0">  
                        Never
                      </label>
                    </div>

                    <div className="radio ">
                    <input
                          type="radio"
                          name="answer"
                          value="1"
                          className="form-check-input"
                          id="radio-1"
                          checked={this.state.selectedOption === "1"}
                          onChange={this.onValueChange}
                          required
                        />
                      <label htmlFor="radio-1">
                        Seldom
                      </label>
                    </div>

                    <div className="radio">
                    <input
                          type="radio"
                          value="2"
                          name="answer"
                          className="form-check-input"
                          id="radio-2"
                          checked={this.state.selectedOption === "2"}
                          onChange={this.onValueChange}
                        />
                      <label htmlFor="radio-2">
                        Sometimes
                      </label>
                    </div>

                    <div className="radio">
                    <input
                          type="radio"
                          name="answer"
                          className="form-check-input"
                          id="radio-3"
                          value="3"
                          checked={this.state.selectedOption === "3"}
                          onChange={this.onValueChange}
                        />
                      <label htmlFor="radio-3"> 
                        Often
                      </label>
                    </div>

                    <div className="radio">
                    <input
                          type="radio"
                          name="answer"
                          className="form-check-input"
                          id="radio-4"
                          value="4"
                          checked={this.state.selectedOption === "4"}
                          onChange={this.onValueChange}
                        />
                      <label htmlFor="radio-4">
                        Constantly
                      </label>
                    </div>
                    </div>

                    {
                      this.state.started ?
                        <Button size="lg" block type="submit" className="btn btn-default mb-2" id="nextQuestion"  onClick ={this.formSubmit}>
                          Submit
                        </Button>
                        : null
                    }
                    
                  </form>
                  {
                  this.state.questionList.length && !this.state.started ?
                    <Button size="lg" block className="btn btn-default mb-2" id ="startBtn" disabled={false} onClick ={this.startTest}>
                      Start Test
                    </Button>
                    : null
                  }
                  </Col>
                </Row>
              </Container>
              
            
          
              <Container className="mt-2 ">
                <Row >
                  <Col md={{ span: 6, offset: 3 }}  className="border " >  
                  <h2 className="text-center pt-2">
                      Stress % measure 
                    </h2>
                    <p>Green zone: low stress level</p>
                    <p>Yellow zone: moderate stress level</p>
                    <p>Red zone: high stress level</p>
                    <hr/>          
                  <GaugeChart id="gauge-chart1"
              percent= {this.state.gaugeChartValue}
              textColor={"#000"}
             />
             </Col>
             </Row>
             </Container>
        </div>
        );
      }
}


export default DialPlate