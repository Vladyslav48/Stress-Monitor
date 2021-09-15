import React, {Component} from 'react' 
import { Container, Row, Col, Button } from "react-bootstrap"
import CanvasJSReact from '../../assets/canvasjs.react';
import {firestore} from "../../firebase"
import {auth} from "../../firebase"
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

//The default diagram settings
let diagramData = {
		animationEnabled: true,
		title:{
			text: "Stress Diagram"
		},
		axisX: {
			valueFormatString: "DD MMMM YYYY"
		},
		axisY: {
			title: "Stress level",
			suffix: "  points"
		},
		data: [{
			xValueFormatString: "DD MMMM YYYY",
			type: "spline",
			dataPoints: []
		}]
	
}


class StressDiagram extends Component {
	constructor(){
		super()

		//Gets current user and defines the DB
		const user = auth.currentUser.uid;
		this.state = {
			db: firestore,
			user
		}
		this.getData = this.getData.bind(this);
	}
	
	//Retrives all the user's test data and assigns it to the diagram
	async getData(){
		const user =  (await this.state.db.collection('users').doc(this.state.user).get()).data()
		let diagramData2 = diagramData
		diagramData2.data[0].dataPoints = user.tests.map(val => {
			return {
				x: new Date(val.date),
				y: val.score
			}
		})
		diagramData = diagramData2		
		window.chart = this.chart
		this.chart.render()
	}

		render() {
			return (
				<div>
					<Container className="mt-4">
                <Row >
                  <Col className="border text-center" >
				  <Button size="lg" block  className="btn btn-default mb-4 my-4 w-50" id="nextQuestion"  onClick ={this.getData}>Get Diagram</Button>
				 
					<CanvasJSChart options = {diagramData}
						onRef={ref => this.chart = ref}
					/>
					 </Col>
				</Row>
					</Container>
				</div>
				);
		}
		
	}

export default StressDiagram;