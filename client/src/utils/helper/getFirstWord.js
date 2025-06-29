const getFirstWord = (text,count=10) =>{
    const words = text.trim().split(/\s+/);
    return words.slice(0,count).join(" ")+(words.length>count ? "...":"");
}

export default getFirstWord;