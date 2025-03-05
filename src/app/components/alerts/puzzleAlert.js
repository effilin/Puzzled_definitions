import { useState, useEffect} from "react";
import '../../../../public/styles/alerts.css';
import '../../globals.css'

export default function PuzzleAlert({onClose}) {

    const [ballsPresent, setBalls] = useState(false)

    useEffect(()=>{

        const shootBalls = () => {
            let numBalls = 0;
        
              while(numBalls <= 500) {
                let locationX
                let locationY
                let X = Math.random();
                let Y = Math.random();
                if ( X < .5) {
                    locationX = Math.random() * -100;
                   } else { 
                    locationX = Math.random() * 100; 
                   }

                if( Y < .5) {
                    locationY = Math.random() * -100;
                   } else { 
                    locationY = Math.random() * 100; 
                   }
              const red = Math.floor(Math.random() * 256);
              const green = Math.floor(Math.random() * 256);
              const blue = Math.floor(Math.random() * 256);
              const ball = document.createElement('div');
              const canvas = document.querySelector('.winner-box');
              ball.classList.add('crazy-ball');
              ball.style.setProperty("--index", numBalls);
              ball.style.setProperty('--bounce-spotX', `${locationX}vw`)
              ball.style.setProperty('--bounce-spotY', `${locationY}vw`)
              ball.style.setProperty('--color', `rgb(${red}, ${green}, ${blue})`)
             
              canvas.appendChild(ball);
              numBalls ++;
            }}
        
            if( ballsPresent === true) {
              const parent = document.querySelector('.winner-box')
              const children = document.querySelectorAll(".crazy-ball")
              children.forEach((child) => parent.removeChild(child))
              setBalls(false);
            } else {
            setBalls(true)
            shootBalls()
        }

    },[])
  

    return (
        <div className="alert-card winner-box d-flex justify-content-center ">
            <div className="alert alert-dismissible alert-box" role="alert">
               <div className="d-flex flex-row justify-content-around align-self-center card main-card">
                    <button type="button" className="btn-close alert-dismissible mt-0" data-bs-dismiss="alert" aria-label="Close" onClick={onClose}></button>
                    <h4 className="text"> Great Job! You won!</h4>
                    
               </div>
            </div>
        </div>     
    );
}