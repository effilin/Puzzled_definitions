import '../../globals.css'
import '../../../../public/styles/responsive.css';

export default function Spotify() {

    return(
    <div id="spotify-box" className='spotify'>
        <iframe style={{borderRadius:"12px"}} src="https://open.spotify.com/embed/playlist/7fqvZvuZNHdip52yJY9xbp?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>   
)
}