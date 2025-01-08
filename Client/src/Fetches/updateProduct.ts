export  const fetchchUpdateProduct = async(url:string,groupName:string,name:string,details:string,amount:number,product_id:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                "group_name":groupName,
                "details":details,
                "amount":amount,
                "product_id":product_id,
                "name":name,
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