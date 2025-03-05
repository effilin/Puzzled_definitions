'use client'
import Spotify from "./mainPage/Spotify"
import { useEffect, useState, useContext } from "react";
import { HelpfulContext } from "../context";
import '../globals.css'
import '../../../public/styles/responsive.css';



export default function Footer() {

    const [starsPresent, setStar] = useState(false);
    const {helpfulMessage, setHelpfulMessage} = useContext(HelpfulContext);

    useEffect(() => {

        const stars = () => {
          
          let numStars = 0;
    
          while(numStars <= 500) {
          const locationX = Math.round(Math.random() * 100);
          const locationY = Math.round(Math.random() * 100);
          const star = document.createElement('div');
          const canvas = document.querySelector('.star-box-footer');
          star.classList.add('star');
          star.style.setProperty("--index", numStars);
          star.style.setProperty("top", `${locationY}%`);
          star.style.setProperty("left", `${locationX}%`);
          canvas.appendChild(star);
          numStars ++;
        }}
    
        if( starsPresent === true) {
          
          const parent = document.querySelector('.star-box-footer')
          const children = document.querySelectorAll(".star")
          children.forEach((child) => parent.removeChild(child))
          setStar(false);
        } else {
        setStar(true)
        stars()
        }
      }, [])

    return (
      <div className="star-box-footer d-flex justify-content-center">
        <div className="footer card main-card d-flex flex-row flex-wrap">
            
            <div className="d-flex flex-column justify-content-between">
              
                  <div className="helpful-hints footer-card card main-card align-self-start p-2">
                    <h4 className="text2">Helpful Hints: </h4>
                      <h5>{helpfulMessage.message? helpfulMessage.message: `Hello! \u{1F44B}`}</h5>
                   
                  </div>
            </div>
            <img src="/images/logo.png" className="float-end logo-me align-self-end" alt="Cactus logo for Eva Nummer" />
        </div>
      </div>
        
    )
}