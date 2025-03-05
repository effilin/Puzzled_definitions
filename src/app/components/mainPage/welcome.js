'use client'
import { useContext, useEffect } from "react";
import { UserContext , ThemeContext, HelpfulContext} from "@/app/context";
import { toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState, } from "react";
import '../../globals.css'
import '../../../../public/styles/responsive.css'


export default function Welcome() {

    const [userName, setUserName] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const {theme, changeTheme} = useContext(ThemeContext);
   const {currentUser, setCurrentUser} = useContext(UserContext);
   const {helpfulMessage, setHelpfulMessage} = useContext(HelpfulContext);

   const toastUserName = () => {
    toast(" User name is already taken! Please choose a different one!")};
                                                                     
   const toastWentWrong = () => {
    toast("Something went wrong! Please reach out to Eva via LinkedIn")};
   

 /* New User Function*/
   const handleSubmit = async (e) => {
        e.preventDefault();
        if ( !userName) {
            return alert( "please enter username")
        }
        if (!areaCode) {
           return alert( "please enter zip code")
        }
        
        try {
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: userName, zipCode: areaCode, theme: theme })
            });
            console.log(res)

     if (res.ok) {
            console.log('user created successfully')
            setCurrentUser({name: userName, zipCode: areaCode, puzzleStat: 0, riddleStat: 0})
            setHelpfulMessage({message:`Thanks for logging in ${userName}! Please explore. I highly recommend the page not found!`})
        } else if (res.status === 400) { 
        
            console.log('username already taken')
           toastUserName()
        }
        } catch (error) {
            console.log('something went wrong')
            toastWentWrong()
        };
   };   

   const getUser = async(e) => {
    e.preventDefault();

        if ( !userName) {
            return alert( "please enter username")
        }
        if (!areaCode) {
           return alert( "please enter zip code")
        }
       
        try{
            const res = await fetch(`/api/users?name=${encodeURIComponent(userName)}&zipCode=${encodeURIComponent(areaCode)}`, {
                method: 'GET',
            });

            if(res.ok) {
                const user = await res.json();
                console.log(user)
                setCurrentUser(user)
                setHelpfulMessage({message:"Thanks for coming back! check out the new puzzles! As always check out the page not found! "})
            } else {
                const errorMessage = await res.json();
                console.log('error', errorMessage)
                alert('User was not found')
            }
        } catch (error) {
            console.log('OH NO, DID NOT GET IT', error)
        }
   };

  
{/* home page when not logged in */}
    if ( currentUser.name === undefined) {
        return (
         <div>
            <div className="m-2">
                <div className="card-body d-flex flex-column justify-content-center ">
                    <h2 className="text d-flex justify-content-center">Welcome</h2>
                    <div className="d-flex flex-column justify-content-around ">
                       <h5 className="card-text text2">sign in or sign up for an account!</h5>
                    </div>
                    <button type="button" className="btn btn-primary m-2"data-bs-toggle='modal' data-bs-target='#sign-in-modal'>Sign In</button>
                    <button type="button" className="btn btn-success m-2" data-bs-toggle='modal' data-bs-target='#sign-up-modal' >Sign Up</button>
                </div>
            </div>
            
{/* modal one is for sign up */}
             <div className='modal fade' id="sign-up-modal" tabIndex='-1' aria-labelledby="signupModalLabel" aria-hidden="true">
             <div className='modal-dialog'>
                 <div className="modal-content pop-box">
                    <div className="modal-header">
                        <h5 className="modal-title" id="signupModalLabel">SignUp</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                        <form className="modal-body">
                            <div className="mb-3">
                                <label htmlFor='name' className="form-label">Name</label>
                                <input type='text' id='name' name='name' className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)}></input><br />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='zipCode'className="form-label"> Zipcode &#40;for weather updates&#x28;</label>
                                <input type='text' id='zipCode' name='zipCode' className="form-control" value={areaCode} onChange={(e) => setAreaCode(e.target.value)}></input><br />
                            </div>
                    
                            <p> Choose Your Theme </p>

                            
                                <input type="radio" id="garden" name="theme" value="garden-view" className="radioButtons" onChange={(e) => changeTheme(e.target.value)} />
                                <label htmlFor="garden" className="radioLabel"> Garden </label>
                          
                                <input type="radio" id="synth" name="theme" value="synth-wave" className="radioButtons" onChange={(e) => changeTheme(e.target.value)}/>
                                <label htmlFor="synth" className="radioLabel"> SynthWave </label>
                            
                                <input type="radio" id="night" name="theme" value="night-sky" className="radioButtons" onChange={(e) => changeTheme(e.target.value)}/>
                                <label htmlFor="night" className="radioLabel"> Night Sky </label>
                            
                            <div className="modal-footer">
                                <button type='submit' className='btn btn-outline-success'  data-bs-dismiss="modal" onClick={handleSubmit}>Submit</button>
                            </div>
                
                        </form>
                     
                 </div>
             </div>
         </div>
{ /* modal two is for sign In */}
         <div className='modal fade' id="sign-in-modal" tabIndex='-1' aria-labelledby="signInModalLabel" aria-hidden="true">
             <div className='modal-dialog'>
                 <div className="modal-content pop-box">
                    <div className="modal-header">
                        <h5 className="modal-title" id="signInModalLabel">Sign In</h5>
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
                                <button type='submit' className='btn btn-outline-success'  data-bs-dismiss="modal" onClick={getUser}>Submit</button>
                            </div>
                            
                
                        </form>
                     
                 </div>
             </div>
         </div>
    </div>
        )} else  {
        return(
            <div>
                <h2 className="welcome1">Welcome, {currentUser.name}!</h2>
            </div>

    )}
}

