export  const fetchchangeStatus = async(url:string,groupName:string,productId:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                "group_name":groupName,
                "product_id":productId
            })
        });
        if (!res.ok) {
          return "Can`t change status"
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}