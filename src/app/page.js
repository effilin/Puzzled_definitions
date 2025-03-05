'use client'
import './globals.css';
import Welcome from "./components/mainPage/welcome";
import { useEffect, useState, useContext } from 'react';
import { PuzzleContext, HelpfulContext,ThemeContext } from './context';



export default function Home() {

  const [starsPresent, setStar] = useState(false)
  const {puzzleInfo, setPuzzleInfo} = useContext(PuzzleContext);
  const {helpfulMessage, setHelpfulMessage} = useContext(HelpfulContext);
  const {theme, changeTheme} = useContext(ThemeContext);

  useEffect(() => {

    const stars = () => {
      
      let numStars = 0;

      while(numStars <= 400) {
      const locationX = Math.round(Math.random() * 100);
      const locationY = Math.round(Math.random() * 100);
      const star = document.createElement('div');
      const canvas = document.querySelector('.star-box');
      star.classList.add('star');
      star.style.setProperty("--index", numStars);
      star.style.setProperty("top", `${locationY}%`);
      star.style.setProperty("left", `${locationX}%`);
      canvas.appendChild(star);
      numStars ++;
    }}

    if( starsPresent === true) {
      console.log("stars out") 
      const parent = document.querySelector('.star-box')
      const children = document.querySelectorAll(".star")
      children.forEach((child) => parent.removeChild(child))
      setStar(false);
    } else {
    setStar(true)
    stars()

    }

  },[])

  useEffect(()=> {
    const fetchData = async() => {
      try {
        const res= await fetch(`/api/puzzles?number=1`, {
            method: 'GET',
        });

        if(res.ok) {
          const puzzleResult = await res.json();
          console.log(`puzzle fetched ${puzzleResult.riddle}`)
          setPuzzleInfo({riddle: puzzleResult.riddle, answer: puzzleResult.answer, count:puzzleResult.count, number: 1} )
        } else {
          const errorMessage = await res.json();
          console.log('error', errorMessage)
        }
      } catch (error) {
        console.log('OH NO, DID NOT GET IT', error)
      }
    };
    fetchData()
  },[])

  





  return (
    <main className='star-box'>
      <div className="main-body">
          <div className="main-card card d-flex flex-row justify-content-around flex-wrap p-3">
            <div className='border-bottom welcome-div'>
              <Welcome />
            </div>

            <div>
              <h1 className="text welcome-div py-4 border-bottom">Welcome Mrs Irwin&apos;s Kindergarten to Software Engineering</h1>
              <ul>
                <li className='text2 py-2'>Software engineers are responsible for creating and maintaining code for websites, apps, video games, and all electronics.  </li>
                <li className='text2 py-2'>Code is written instructions for computers. Its like a recipe to build a robot!</li>
                <li className='text2 py-2'>There are alost 9,000 coding languages but popular ones include: Javascript, Python,Java, SQL, HTML, CSS , C#, and many more!</li>
              </ul>
              
          </div>
        </div>
      </div>
    </main>
  );
}
