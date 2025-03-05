'use client'
import PuzzleCards from "@/app/components/puzzle/puzzleCards";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import '../globals.css';
import { useEffect, useState, useContext } from "react";
import { PuzzleContext, UserContext, HelpfulContext } from "../context";
import PuzzleAlert from "../components/alerts/puzzleAlert";

export default function PuzzlePage() {

    const [starsPresent, setStar] = useState(false);
    const {puzzleInfo, setPuzzleInfo} = useContext(PuzzleContext);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [alertVisible, setAlertVisible] = useState(false);
    const {helpfulMessage, setHelpfulMessage} = useContext(HelpfulContext);
    const [allSolved, setAllSolved] = useState(false);

    const toastComeBack = () => toast("Please come back for new puzzles");

    useEffect(() => {

        const stars = () => {
          
          let numStars = 0;
    
          while(numStars <= 1000) {
          const locationX = Math.round(Math.random() * 100);
          const locationY = Math.round(Math.random() * 100);
          const star = document.createElement('div');
          const canvas = document.querySelector('.star-box-puzzle');
          star.classList.add('star');
          star.style.setProperty("--index", numStars);
          star.style.setProperty("top", `${locationY}%`);
          star.style.setProperty("left", `${locationX}%`);
          canvas.appendChild(star);
          numStars ++;
        }}
    
        if( starsPresent === true) {
          console.log("stars out") 
          const parent = document.querySelector('.star-box-puzzle')
          const children = document.querySelectorAll(".star")
          children.forEach((child) => parent.removeChild(child))
          setStar(false);
        } else {
        setStar(true)
        stars()
        }
      
    
      }, [])

      useEffect(() => {

        let number = currentUser.puzzleStat? currentUser.puzzleStat: 1;
        setAllSolved(false);
        console.log(`number${number}`)
        
        const fetchData = async() => {
          if (number === 0 ){
            number = 1;
          }
          if (number > puzzleInfo.count) {
            setAllSolved(true);
            toastComeBack();
            setHelpfulMessage({message:" You solved all the current puzzle's please come back next time for new puzzles!"});
          }
          
                try {
            const res= await fetch(`/api/puzzles?number=${encodeURIComponent(number)}`, {
                    method: 'GET',
                });
    
                if(res.ok) {
                    const puzzleResult = await res.json();
                    
                    setPuzzleInfo({riddle: puzzleResult.riddle, answer: puzzleResult.answer, count:puzzleResult.count, number: number} )
                } else {
                    const errorMessage = await res.json();
                    console.log('error', errorMessage)
                }
            } catch (error) {
                console.log('OH NO, DID NOT GET IT', error)
            }
       };
       fetchData();
      
       
    }, [currentUser.puzzleStat, puzzleInfo.number]);

   useEffect(() => {
    setHelpfulMessage({message:"Click the cards to try and form the answer!"})
}, [allSolved]); 
    
    
      useEffect(() =>{
        if (puzzleInfo.alert === true) {
          setAlertVisible(true)
          const cleanUp = () =>{
          let newInfo = {...puzzleInfo};
          newInfo.alert = false;
          setPuzzleInfo(newInfo)
        }
        
      cleanUp()
        }
      },[puzzleInfo.alert])
     
      
    return (
        <div className="star-box-puzzle">
            <div className="container text-center">
                <div className="col">
                    <div className="row">
                      {/* Alert for winning the riddle */
                    alertVisible? 
                    <div id="winnerAlert" >
                        <PuzzleAlert onClose={() => setAlertVisible(false)} />
                    </div>
                    
                    : allSolved? <h1> Until Next Time!</h1>:
                     <PuzzleCards />
                     }
                    </div>
               </div>
            </div>
        </div>
    )
}