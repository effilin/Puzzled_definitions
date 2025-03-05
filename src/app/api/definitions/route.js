import dbConnect from "@/lib/db";
import Definition from "@/models/Definition";







export async function GET(request) {
    await dbConnect();
    try {
        
        const searchParams = request.nextUrl.searchParams
        const number = searchParams.get('number')
        
        console.log(number)

        if(!number ) {
            return new Response(JSON.stringify({error: 'word not received'}))
        };

        const puzzle = await Definition.findOne({ number: number });
                const count = await Definition.countDocuments();
                
                 if (!puzzle) {
                    return new Response(JSON.stringify({error: 'puzzle not found'}), {status: 404})
                 };
         
         return new Response(JSON.stringify({word: puzzle.word, hint: puzzle.hint, number: puzzle.number}), {status: 200})
         
    } catch (error) {
            return new Response(JSON.stringify({error: 'error retrieving '+ error}))
        }
};

export async function POST(req , res) {

    await dbConnect();
 
        try {
        
        const { word, hint } = await req.json()
        const number = await Definition.countDocuments();
    
        const newPuzzle = new Definition({number, word, hint,});
        
        await newPuzzle.save()
        
        return new Response(JSON.stringify({message:'definition created successfully!'}), {status: 201})
    
        } catch (error){
            return new Response(JSON.stringify({ error: 'Error creating definition' }), {
                status: 500,
        })}
    }

    