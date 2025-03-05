

export async function POST(req) {


    const { zipCode} = await req.json();

    const zipCodeCurrent = zipCode || 23228;
    
    const weatherKey = process.env.WEATHER_KEY;
    try {
       const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(weatherKey)}&q=${encodeURIComponent(zipCodeCurrent)}`)
       const weatherData = await response.json();
       console.log(weatherData)
        
       return new Response(JSON.stringify(weatherData), {
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