const backenddomain="http://localhost:8080"
const summaryapi={
    signup:{
        url:`${backenddomain}/api/signup`,
        method:"post"
    },
    signin:{
        url:`${backenddomain}/api/signin`,
        method:"post"
    },
    current_user : {
        url:`${backenddomain}/api/userdetails`,
        method:"get"
    },
    logout:{
        url:`${backenddomain}/api/userlogout`,
        method:"get"
        
    },
    AllUsers:{
         url:`${backenddomain}/api/all-user`,
        method:"get"

    },
    UpdateUser:{
        url:`${backenddomain}/api/update-user`,
        method:"post"
    },
    uploadimage:{

        url:`${backenddomain}/api/upload_product`,
        method:'post'
    },
    Allproducts:{
        uri:`${backenddomain}/api/get-product`,
        method:'get'
    },
    updateproduct:{
        url:`${backenddomain}/api/update_product`,
        method:'post'
    },
    getcaterogy:{
         url:`${backenddomain}/api/get-category`,
         method:"get"
    },
    getallcategory:{
        url:`${backenddomain}/api/all-category`,
        method:'post'
    },
    productdetails:{
        url:`${backenddomain}/api/product-details`,
        method:'post'

    },
    allcartproduct:{
        url:`${backenddomain}/api/addtocart`,
        method:'post'
    },
    productsincart:{
        url:`${backenddomain}/api/countitems`,
        method:'get'
    },
    productsincardview:{
        url:`${backenddomain}/api/view-allproduct`,
        method:'get'
    },
    updateproductcart:{
        url:`${backenddomain}/api/update-cart-product`,
        method:'post'
    },
    deletecartproduct:{
        url:`${backenddomain}/api/delete-product`,
        method:"post"
    },
    searchProduct:{
        url:`${backenddomain}/api/search`,
        method:"get"
    },
    filterproduct:{
        url:`${backenddomain}/api/filter-product`,
        method:"post"
    }

    

}
export default summaryapi;