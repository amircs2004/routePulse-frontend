

export const  register = async (data) => {
 try {
    const responce = await fetch(`${process.env.url_base}/api/register`, {
        method : 'POST' , 
       headers : {
        'Content-Type' : 'application/json' ,
    } ,
    credentials : 'include' ,
       body : JSON.stringify(data)

    })
    if (!responce.ok) {
         console.log('error at fetching');
    }
    const result = await responce.json()
    return result
 } catch (error) {
    console.log('big ahhhhhhhhhhhhhh problem bruhhhhhhhhhhhhhh');
 }
}
export const getUser = async () => {
    try {
        const  token = sessionStorage.getItem('token')

        const responce = await fetch(`${process.env.url_base}/api/user` , {
            method : 'GET' , 
            headers : {
                 'Content-Type' : 'application/json' ,
                'Authorization' : `Bearer ${token}`
            }
        })
        const result  =  await responce.json()
        return result 
    } catch (error) {
           console.log('big ahhhhhhhhhhhhhh problem bruhhhhhhhhhhhhhh');
    }
}