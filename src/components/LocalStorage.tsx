export function getSavedGifs (): Array<string> {
    const gifs = localStorage.getItem('gifs') || '';
    return (gifs === '')? [] : JSON.parse(gifs);
} 

export function toLocStor (url: string)  {
    const saved = localStorage.getItem('gifs') || '';
    const parseGifs = (saved === '')? [] : JSON.parse(saved);
    parseGifs.push(url);
    alert("You saved this gif(sticker)");
    localStorage.setItem('gifs', JSON.stringify(parseGifs));
}