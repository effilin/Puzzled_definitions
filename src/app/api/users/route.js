'use server'
import dbConnect from "@/lib/db"
import User from "@/models/User"
import mongoose from "mongoose";
import { NextResponse } from "next/server"


export async function POST(req , res) {

    await dbConnect();
 
        try {
        
        const { name, zipCode, theme} = await req.json()
        const existingUser = await User.findOne({name: name});

        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User name already taken' }), {
                status: 400,
        })
        }
    
        const newUser = new User({name, zipCode, theme});
        console.log(newUser)
    
        await newUser.save()
        
        return new Response(JSON.stringify({message:'User created successfully!'}), {status: 201})
    
        } catch (error){
            return new Response(JSON.stringify({ error: 'Error creating user' }), {
                status: 500,
        })}
    }

export async function GET(request) {

    await dbConnect();
    
    try {
        
        const searchParams = request.nextUrl.searchParams
       
        const name= searchParams.get('name')
        const zipCode = searchParams.get('zipCode')
        console.log( name + ":" + zipCode)
        console.log("mongoose connection state:" + mongoose.connection.readyState)

        if(!name || !zipCode) {
            return new Response(JSON.stringify({error: 'name or zip code not received'}))
        };

        const user = await User.findOne({ name: name, zipCode: zipCode })
        console.log(user)

         if (!user) {
            return new Response(JSON.stringify({error: 'user not found'}), {status: 404})
         };
        
         return new Response(JSON.stringify({name: user.name, theme: user.theme, zipCode: user.zipCode, puzzleStat: user.puzzleStat, riddleStat: user.riddleStat}), {status: 200})
         
    } catch (error) {
            return new Response(JSON.stringify({error: 'error retrieving '+ error}))
        }
};

export async function DELETE(request) {

    await dbConnect();
    
    try {
        
        const searchParams = request.nextUrl.searchParams
       
        const name= searchParams.get('name')
        const zipCode = searchParams.get('zipCode')

        if(!name || !zipCode) {
            return new Response(JSON.stringify({error: 'name or zip code not received'}))
        };
        await User.deleteOne({ name: name, zipCode: zipCode })

         return new Response(JSON.stringify('deleted'), {status: 200})
    } catch (error) {
            return new Response(JSON.stringify({error: 'error retrieving '+ error}))
        }
};

export async function PUT(req, res) {

    await dbConnect();
    
    try {
        
        const searchParams = req.nextUrl.searchParams
       
        const newName= searchParams.get('name')
        const newZipCode = searchParams.get('zipCode')
        const newTheme = searchParams.get('theme')
        
        
        const { name, zipCode, theme, puzzleStat, riddleStat} = await req.json()
       
    
        const updatedUser = await User.updateOne({name: name, zipCode: zipCode }, 
            {$set: {name: newName, zipCode: newZipCode, theme: newTheme}, 
            $inc: {puzzleStat: puzzleStat || 0, riddleStat: riddleStat || 0}});

        
        return new Response(JSON.stringify({name: newName, zipCode: newZipCode, theme: newTheme, puzzleStat: puzzleStat , riddleStat: riddleStat}),
         {status: 201,
          headers:{'Content-Type': 'application/json'}
          })
    
        } catch (error){
            return new Response(JSON.stringify({ error: 'Error updating user' }), {
                status: 500,
        })}
    }
     
   
    


  


