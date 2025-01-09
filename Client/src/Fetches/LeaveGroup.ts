export  const fetchchLeaveGroup = async(url:string,groupName:string,userId:string)=>{
    try {
        const res: Response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                "group_name":groupName,
                "user_id":userId
            })
        });
        if (!res.ok) {
          return "Can`t leave a group"
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        
    }
}