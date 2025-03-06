'use client'
import '../globals.css';
import '../../../public/styles/responsive.css'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import { useContext } from "react"
import { PuzzleContext, ThemeContext, UserContext } from "@/app/context"
import { ToastContainer, toast } from 'react-toastify';
import Weather from "@/app/components/weather/weather";
import {Riddle} from '../components/mainPage/Riddle'


export default function Dashboard() {

    const [word, setWord] = useState('');
    const [hint, setHint] = useState('');
    const [userName, setUserName] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const {puzzleInfo, setPuzzleInfo} = useContext(PuzzleContext);
    const {theme, changeTheme} = useContext(ThemeContext);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const [starsPresent, setStar] = useState(false);

    useEffect(() => {

        const stars = () => {
          
          let numStars = 0;
    
          while(numStars <= 1000) {
          const locationX = Math.round(Math.random() * 100);
          const locationY = Math.round(Math.random() * 100);
          const star = document.createElement('div');
          const canvas = document.querySelector('.star-box-dash');
          star.classList.add('star');
          star.style.setProperty("--index", numStars);
          star.style.setProperty("top", `${locationY}%`);
          star.style.setProperty("left", `${locationX}%`);
          canvas.appendChild(star);
          numStars ++;
        }}
    
        if( starsPresent === true) {
          console.log("stars out") 
          const parent = document.querySelector('.star-box-dash')
          const children = document.querySelectorAll(".star")
          children.forEach((child) => parent.removeChild(child))
          setStar(false);
        } else {
        setStar(true)
        stars()
        }
      
    
      },[])

    const toastThanks = () => toast("Thanks for the riddle");

/* Add a Riddle submit button */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/definitions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({word: word, hint: hint})
            });
        if (res.ok) {
            console.log('puzzle created successfully')
        }
        } catch (error) {
            console.log('something went wrong')
        };
        toastThanks();
        setHint('');
        setWord('');
   };

   const handleTheme = (e) => {
    changeTheme(e.target.value)
   }

   const updateUser = async(e) => {
    e.preventDefault();
        if ( !userName) {
            return alert( "please enter username")
        }
        if (!areaCode) {
           return alert( "please enter zip code")
        }
        
        try{
            const res = await fetch(`/api/users?name=${encodeURIComponent(userName)}&zipCode=${encodeURIComponent(areaCode)}&theme=${encodeURIComponent(theme)}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: currentUser.name, zipCode: currentUser.zipCode, theme: currentUser.theme, puzzleStat: currentUser.puzzleStats, riddleStat: currentUser.riddleStats})
            })

            if(res.ok) {
                const newUser = await res.json();
                setCurrentUser(newUser)
                alert("user updated")
            } else {
                const errorMessage = await res.json();
                console.log('error', errorMessage)
                alert("failed to updated")
            }
        } catch (error) {
            console.log('OH NO, DID NOT GET IT', error)
        }
   };

   const deleteUser = async(e) => {
    e.preventDefault();

        if ( !currentUser.name) {
            return alert( "please enter username")
        }
        if (!currentUser.zipCode) {
           return alert( "please enter zip code")
        }
       
        try{
            const res = await fetch(`/api/users?name=${encodeURIComponent(currentUser.name)}&zipCode=${encodeURIComponent(currentUser.zipCode)}`, {
                method: 'DELETE',
            });

            if(res.ok) {
                const user = await res.json();
                setCurrentUser(user)
                
            } else {
                const errorMessage = await res.json();
                console.log('error', errorMessage)
            }
        } catch (error) {
            console.log('OH NO, DID NOT GET IT', error)
        }
   };
   

    return(
    <div className='star-box-dash'>
        <div className="container">
            <div className="row" >
                <div className='d-flex justify-content-evenly'>
                    {!currentUser.name?
                    <h1 className="text">Dashboard</h1>:
                    <h1 className='text'>Dashboard: Welcome Back {currentUser.name}</h1>}
                </div>
            </div>
            <div className="row dash-container d-flex flex-row justify-content-around flex-wrap">
                <div className="card top-row-dash main-card dash-card">
                    <div className="card-body">
                        <h3 className='text'>Preferences</h3>
                        <form className='m2'>
                            <label htmlFor='themeChoice' className='m-1 text2'>Theme : </label>
                            <select id="themeChoice" name="theme" onChange={handleTheme}>
                                <option value='garden-view'>Garden View</option>
                                <option value='synth-wave'> Synth Wave</option>
                                <option value='night-sky'>Night Sky</option>
                            </select>
                        </form>
                        <div className='m-2'>
                           {!currentUser.name? <p className='text2'>Please Sign In</p>:
                           <div>
                                <div>
                                    
                                    <button type="button" className="btn btn-primary m-1"data-bs-toggle='modal' data-bs-target='#update-modal'>Update User</button>
                                    <button type="button" className="btn btn-primary m-1" onClick={deleteUser}>Delete User</button>
                                </div>
                            </div>}
                        </div>

                        {/* modal for updating user info */}
                        <div className='modal fade' id="update-modal" tabIndex='-1' aria-labelledby="signInModalLabel" aria-hidden="true">
                            <div className='modal-dialog'>
                                <div className="modal-content pop-box">
                                   <div className="modal-header">
                                       <h5 className="modal-title" id="UpdateModalLabel">Update Info</h5>
                                       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                                   </div>
                                       <form className="modal-body" >
                                           <div className="mb-3">
                                               <label htmlFor='name' className="form-label">Name</label>
                                               <input type='text' id='name' name='name' className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} ></input><br />
                                           </div>
                                           <div className="mb-3">
                                               <label htmlFor='zipCode'className="form-label"> Zipcode: for weather updates</label>
                                               <input type='text' id='zipCode' name='zipCode' className="form-control" value={areaCode} onChange={(e) => setAreaCode(e.target.value)}></input><br />
                                           </div>
                       
                                           <div className="modal-footer">
                                               <button type='submit' className='btn btn-outline-success'  data-bs-dismiss="modal" onClick={updateUser}>Submit</button>
                                           </div>
                                           
                               
                                       </form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className=" card main-card top-row-dash dash-card">
                    <div className="card-body ">
                        <h4 className='text'>Stats:</h4>
                        <h6 className='text2'>Current Puzzle: { currentUser.name? currentUser.puzzleStat : "none available"}</h6>
                        <h6 className='text2'>Riddle wins: {currentUser.name? currentUser.riddleStat : "none available"}</h6>
                    </div>
                </div>

                <div className="card main-card dash-card m-1">
                    
                    <div className="card-body">
                         <Weather/> 
                    </div>
                </div>

                <div className="card main-card dash-card mt-1">
                    <div className="card-body">
                        <h4 className='text'>Add Your Own Words</h4>
                        <form>
                            <div className="mt-2">
                                <label className='form-label text2' htmlFor="question">Word: </label>
                                <input className="ms-4 form-control" type="text" id="question" name="word" value={word} onChange={(e) => setWord(e.target.value.toString())}></input>
                            </div>
                            <div className="mt-2">
                                <label className='form-label text2' htmlFor="answer">Hint: </label>
                                <input className="ms-3 form-control"type="text" id="answer" name="hintS" value={hint} onChange={(e) => setHint(e.target.value.toString())}></input>
                            </div>
                            <button type="button" className="btn btn-primary m-2" onClick={handleSubmit} >Submit</button>
                        </form>
                    </div>
                </div>
                <div className='card riddle-card mt-2'>
                   <Riddle/> 
                </div>

            </div>
        </div>
    </div>

)}