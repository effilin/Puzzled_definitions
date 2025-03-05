
export async function GET(req) {

    try {
        const riddle = await fetch('https://riddles-api.vercel.app/random', {
            cache: 'no-store'
          })
       const riddleData = await riddle.json();
        
       return new Response(JSON.stringify(riddleData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    })
    } catch (error) {
       return new Response(JSON.stringify({error:'error fetching data at route'}), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
       })
    }     
}