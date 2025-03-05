import dbConnect from "@/lib/db";
import Definition from "@/models/Definition";







export async function GET(request) {
    await dbConnect();
    try {
        
        const searchParams = request.nextUrl.searchParams

        const word = searchParams.get('word')
        console.log(word)
        

        if(!word ) {
            return new Response(JSON.stringify({error: 'word not received'}))
        };

        const hint = await Definition.findOne({ hint: hint });
        

         if (!answer) {
            return new Response(JSON.stringify({error: 'puzzle not found'}), {status: 404})
         };
         
        
         return new Response(JSON.stringify({word: definitions.riddle, hint: definitions.answer}), {status: 200})
         
    } catch (error) {
            return new Response(JSON.stringify({error: 'error retrieving '+ error}))
        }
};

export async function POST(req , res) {

    await dbConnect();
 
        try {
        
        const { word, hint} = await req.json()
    
        const newPuzzle = new Definition({word, hint});
        
        await newPuzzle.save()
        
        return new Response(JSON.stringify({message:'definition created successfully!'}), {status: 201})
    
        } catch (error){
            return new Response(JSON.stringify({ error: 'Error creating definition' }), {
                status: 500,
        })}
    }

    