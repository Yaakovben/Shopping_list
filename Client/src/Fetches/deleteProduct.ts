export  const fetchchDeleteProduct = async(url:string,groupName:string,productId:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                "group_name":groupName,
                "product_id":productId
            })
        });
        if (!res.ok) {
          return "Can`t delete product"
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}