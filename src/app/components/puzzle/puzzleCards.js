'use client'
import { useEffect, useState } from "react";
import SingleCard from "./singleCard";
import { useContext } from "react"
import { PuzzleContext } from "@/app/context"
import { UserContext } from "@/app/context";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PuzzleCards() {

    const [cardList, setCardList] = useState([]); /* this sets the single cards */
    const [currentCards, setCurrentCards] = useState([]) 
    const [number, setNumber] = useState(1)
    const {puzzleInfo, setPuzzleInfo} = useContext(PuzzleContext);
    const [ correct, setCorrect] = useState(false)
    
    const {currentUser, setCurrentUser} = useContext(UserContext);
    

/* update user stats if won */ 
    const updateUser = async() => {
            console.log(currentUser.name)
        
            if ( !currentUser.name) {
                toastSignIn()
                setCurrentUser({puzzleStat: puzzleInfo.number +1})
            } else{
                try {
                let newPuzzleStat = puzzleInfo.number + 1;
                
                const res = await fetch(`/api/users?name=${encodeURIComponent(currentUser.name)}&zipCode=${encodeURIComponent(currentUser.zipCode)}&theme=${encodeURIComponent(currentUser.theme)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: currentUser.name, zipCode: currentUser.zipCode, theme: currentUser.theme,  puzzleStat: newPuzzleStat, riddleStat: currentUser.riddleStat })
                })
    
                if(res.ok) {
                    const newUser = await res.json();
                    setCurrentUser(newUser)
                } else {
                    const errorMessage = await res.json();
                    console.log('error', errorMessage)
                    alert("failed to updated")
                }
            } catch (error) {
                console.log('OH NO, DID NOT GET IT', error)
            }
        }};

        const toastSignIn = () => {
            toast(" Sign in to keep track of your stats!")
        }
    
useEffect(() => {
    
    if (!puzzleInfo.answer) {
        return console.log( 'waiting on puzzle info')
    } else {

        const answer = puzzleInfo.answer.toString();
        const myString = answer.toUpperCase();
        /* cardStock is Array of the correct answer */
        const cardStock = myString.split('');
        const arrayLength = cardStock.length;
        const spaces = cardStock.filter((x) => x === ' ').length;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let results = '';

    for (let i=0; i < (arrayLength - spaces); i++) {
        results += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    for(let i=0; i < spaces; i++) {
        let spot = Math.floor(Math.random() * arrayLength);
        results = results.slice(0, spot) + ' ' + results.slice(spot);
            }
    /* finalResults is the array of random char */
    let finalResults = results.split('');

    /* assigning side A and and side B randomly */

    let sideA = cardStock;
    let sideB = finalResults;
    let myCards = cardStock.map((card, index) => {
        return card = {
          sideA: sideA.at(index), 
          sideB: sideB.at(index), 
          key: (index + 1), 
          id:(index + 1), 
          activeSide: Math.random() > .5? sideA.at(index): sideB.at(index),
    }})

   setCardList(myCards)
   setCurrentCards(myCards)

}}, [puzzleInfo.riddle])


/* handles the click and the change of current cards */
const  handleChange = ( value , id) => {
    let newCards = currentCards.map(card => card.id === id? {...card, activeSide: value}:card)
    setCurrentCards(newCards); 
    
 };

 useEffect(()=>{
   
    if (currentCards.every((card) => {card.activeSide})) {
        return console.log( `matching not running`)
    } else {
    const answerString = puzzleInfo.answer.toString();
    const answerUpperCase = answerString.toUpperCase(); /* this is the answer */
    
    let currentActiveSide = currentCards.map((card) => card.activeSide); /* this is the active side */

    let isCorrect = currentActiveSide.every((card, index) => { 
        const matched = card === answerUpperCase[index];
        return matched
        })
    
    if (isCorrect === true) {

        updateUser()
        setNumber(number +1)
        let newInfo = {...puzzleInfo}
        newInfo.number + 1;
        newInfo.alert = true;
        setPuzzleInfo(newInfo);
        }
    }

 },[currentCards])
 

return (
    <div className="d-flex flex-column">
        <div className="d-flex flex-row justify-content-around">
            <div className="">
                <h4 className="text">Riddle: {puzzleInfo.riddle}</h4> 
            </div>
            <div className="">
                <div className="">
                    <h4 className="text">Puzzle #{puzzleInfo.number}</h4>
                </div>
            </div>
        </div>
        <div className="">
            <div className=" d-flex flex-wrap">
                { !currentCards?
                <h1 className="text">Loading....</h1>:
                    cardList.map( card => (
                        <SingleCard {...card} handleChange={handleChange} key={card.key}/> ))
                }
            </div>
       </div>
    </div>
)

}
