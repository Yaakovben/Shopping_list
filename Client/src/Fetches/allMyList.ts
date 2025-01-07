export  const fetchGetMyLists = async(url:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          return "Can`t get the my lisys"
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}