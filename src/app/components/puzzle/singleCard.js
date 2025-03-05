'use client'
import '../../../../public/styles/puzzle.css';
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";


export default function SingleCard({sideA , sideB, handleChange, id, activeSide}) {

    const [value, setValue] = useState(activeSide)


    const [letterStyle, letterApi] = useSpring(() => ({
         transform: ` rotateY(0deg)`,
        config:{ tension: 200, friction: 180, bounce: 1},
        
    }));
    

    const [flipStyle, api] = useSpring(() => ({
        transform: ` rotateY(0deg)`,
        config:{ tension: 180, friction: 10 },
        
    }));


    const handleClick = () => {
        let newValue = "";
        if(value === sideA) {
            newValue = sideB 
        }
        else{
            newValue = sideA
        }
        setValue(newValue),
        api.start ({
                from: { transform: ` rotateY(0deg)`},
                to: { transform: `rotateY( ${ newValue === sideA ? 360 : -360 }deg)`},
                }),
        letterApi.start({
                from: {transform: ` rotateY(0deg)`},
                to:  { transform: `rotateY( ${ newValue === sideA ? 360 : -360 }deg)`},
            })
        handleChange( newValue, id );
        }
    
       
return (
    
     
    <animated.div className="card-puzzle flip-front" style={{...flipStyle}} >
            <animated.div className="flip-inner card-body" onClick={handleClick}>
                <div className="flip-front" >
                   <animated.h1 className='letters' style={{...letterStyle}}>{value}</animated.h1>
                </div>
            </animated.div>
    </animated.div>
    )

};

