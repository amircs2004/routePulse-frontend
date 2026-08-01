

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

const login = async (data) => {

}
 

export const addProductToOrder = async (ProductData) => {
    try {
       const token = sessionStorage.getItem('token')
        const response = await fetch(`${process.env.url_base}/api/add-product` , { 
            method : 'POST' ,
            headers : {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}` 
            },
            body : JSON.stringify(ProductData)
        })

        if (response.status === 401) {
        // Token expired or invalid -> clear session and redirect
        sessionStorage.removeItem('token');
        window.location.href = '/auth/log';
        throw new Error('Token expired. Please log in again.');
    }
    const data = await response.json(); 
    return data 
    } catch (error) {
        console.log(error);
    }
}

export const deleteProductFromOrderApi = async (productId) => {
    try {
      const token = sessionStorage.getItem('token') 
      const response = await fetch(`${process.env.url_base}/api/delete-product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) {
        throw new Error('Error deleting product from order');
      }
      if (response.status === 401) {
        // Token expired or invalid -> clear session and redirect
        sessionStorage.removeItem('token');
        window.location.href = '/auth/log';
        throw new Error('Token expired. Please log in again.');
      }
        const data = await response.json();
        return data;
    }catch(error) {
        console.log(error);
    }
}