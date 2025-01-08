export  const fetchchAddNewProduct = async(url:string,groupName:string,name:string,details:string,amount:number)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                "group_name":groupName,
                "name":name,
                "details":details,
                "amount":amount,
               
            })
        });
        if (!res.ok) {
          return "Can`t add product"
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}