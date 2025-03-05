
import dbConnect from "@/lib/db";
import Puzzle from "@/models/Puzzle";






export async function GET(request) {
    await dbConnect();
    try {
        
        const searchParams = request.nextUrl.searchParams

        const number = searchParams.get('number')
        console.log(number)
        

        if(!number ) {
            return new Response(JSON.stringify({error: 'number not received'}))
        };

        const puzzle = await Puzzle.findOne({ number: number });
        const count = await Puzzle.countDocuments();
        

         if (!puzzle) {
            return new Response(JSON.stringify({error: 'puzzle not found'}), {status: 404})
         };
         
        
         return new Response(JSON.stringify({riddle: puzzle.riddle, answer: puzzle.answer, count: count}), {status: 200})
         
    } catch (error) {
            return new Response(JSON.stringify({error: 'error retrieving '+ error}))
        }
};

export async function POST(req , res) {

    await dbConnect();
 
        try {
        
        const { number, riddle, answer} = await req.json()
    
        const newPuzzle = new Puzzle({number, riddle, answer});
        
        await newPuzzle.save()
        
        return new Response(JSON.stringify({message:'Puzzle created successfully!'}), {status: 201})
    
        } catch (error){
            return new Response(JSON.stringify({ error: 'Error creating user' }), {
                status: 500,
        })}
    }

    