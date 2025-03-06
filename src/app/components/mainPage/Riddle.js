'use client'

import'../../globals.css';
import '../../../../public/styles/responsive.css';
import { useState, useEffect,useContext } from 'react';
import { UserContext } from '@/app/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiddleAlert from '../alerts/riddleAlert';





export function Riddle() {

    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [riddle, setRiddle] = useState({});
    const [guess, setGuess] = useState('');
    const [correct, setCorrect] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext);
       

    const updateUser = async() => {
            if ( !currentUser.name) {
                
                toastSignIn()
            } else{
                try {
                let newRiddleStat = currentUser.riddleStat + 1;
                
                const res = await fetch(`/api/users?name=${encodeURIComponent(currentUser.name)}&zipCode=${encodeURIComponent(currentUser.zipCode)}&theme=${encodeURIComponent(currentUser.theme)}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name: currentUser.name, zipCode: currentUser.zipCode, theme: currentUser.theme,  puzzleStat: currentUser.puzzleStat, riddleStat: newRiddleStat })
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

    useEffect(() => {

        const getRiddle = async() => {
            try {
                
                const riddleNumber = correct;
                const newRiddle = await fetch(`/api/definitions?number=${encodeURIComponent(riddleNumber)}`, {
                    method: 'Get'
                })
                const data = await newRiddle.json()
                console.log('data from fetching words:' + data)
     
                    if (newRiddle) {
                        console.log('riddle fetched')
                        setRiddle(data)
                        setHint(data.hint)
                        console.log(hint)
                        setWord(data.word)
                        
                    } else {
                        console.log(`failed to fetch riddle:${newRiddle.status}`)
                    }  
            }catch(error) {
                console.log("error fetching the riddle in client")
            }
        };

        getRiddle()

    }, [correct]);


    const toastAlert = () => {
        toast(" Almost! Keep trying.")
    }
    const toastSignIn = () => {
        toast(" Sign in to keep track of your stats!")
    }


    const handleGuess = async(e, guess) => {
        e.preventDefault()
        const myAnswer = word.toLowerCase().split(' ');
        const myGuess = guess.toLowerCase().split(' ');
        const aLength = myAnswer.length;
        let correctWords = [];

        if(!guess) {
            alert('please enter your guess')
        }else{
            myGuess.map((word) => {
                myAnswer.includes(word)? correctWords.push(word): console.log("not included")
            })
            let percent = (correctWords.length/aLength) *100;
            console.log(`Percent : ${percent}%`);
            if (percent > 50 ) {
                setAlertVisible(true)
                updateUser();
                setCorrect( correct+1);
                setGuess('');
                
            } else {
                toastAlert();
                setGuess('');
            }
        }
    };

    

    return(
        <div className="">
            <div className="card-body  ">
                <h3 className='text d-flex justify-content-center py-4 border-bottom'>Can You Guess This Word? </h3>
                <h5 className='text2'>{hint? hint : "loading..."}</h5>
                <div className='form-box d-flex justify-content-start'>
                <ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" /> 
                    <form onSubmit={(e) => handleGuess(e, guess)}>
                        <label className='m-1 form-label text2' htmlFor="guess">Answer: </label>
                        <input className='m-1 form-control' type="text" id="guess" name="guess" value={guess} onChange={(e) => setGuess(e.target.value.toString())}/>
                        <button  type='submit' className='btn btn-primary m-1' >Submit</button>
                    </form>
                    {/* Alert for winning the riddle */
                    alertVisible? 
                    <div id="winnerAlert" >
                        <RiddleAlert onClose={() => setAlertVisible(false)} />
                    </div>:
                    <div></div>
                     }
                </div>

            </div>
        </div>
    )

 }