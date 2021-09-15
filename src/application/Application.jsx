import Header from "../components/Header";
import DialPlate from "./main/DialPlate";
import StressDiagram from "./main/StressDiagram";
import firebase from "firebase"


export default function Application() {
    const user = firebase.auth().currentUser;
    
    return (
        <div>
            <Header />
            {user ? (
            <div>
            <DialPlate />
            <StressDiagram />
            </div>
            ): <p>Loading</p>
            }
            
        </div>
    )
  }