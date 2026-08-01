
//get all products form the api 
export const getAllProducts = async () => {
  try {
      const responce = await fetch('https://dummyjson.com/products/') 
      if (!responce.ok) {
        console.log('error at fetching products ');
      }
      const result  =await  responce.json()
    return result
  } catch (error) {
        console.log('server error / probably the error with fetching'); 
  }
} 

//get a sing product 
export const getOneProductById = async (id) =>  {
   try {
       
       const responce = await fetch(`https://dummyjson.com/products/${id}`)
        if (!responce.ok) {
           console.log('error at fetching products ');
         }
          const result  =await  responce.json()
       return result
   } catch (error) {
    console.log('server error / probably the error with fetching'); 
   }
}

//search product 
//we will work on it 
//get all categories 


const getAllCategories = async () => {
       try {
       
      
       const responce = await fetch(`https://dummyjson.com/products/categories`)
        if (!responce.ok) {
           console.log('error at fetching categories ');
         }
          const result  =await  responce.json()
       return result
   } catch (error) {
    console.log('server error / probably the error with fetching'); 
   }
}