import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Forgotpassword from "../pages/Forgotpassword";
import Signup from "../pages/Signup";
import Adimbar from "../pages/Adimbar";
import Allusers from "../pages/Allusers";
import Allproducts from "../pages/Allproducts";
import CategorySeparate from "../pages/CategorySeparate";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchPage from "../pages/SearchPage";
const router= createBrowserRouter([
    {
        path:"",
        element:<App/>,
        children:[{
            path:"/",
            element:<Home/>,
            
        },
        {
            path:"login",
            element:<Login/>
        },
        {
            path:"forgot-password",
            element:<Forgotpassword/>
        },
        {
            path:"sign-up",
            element:<Signup/>
        },
        {
            path:"product-category",
            element:<CategorySeparate/>
        },
        {
            path:"product/:id",
            element:<ProductDetails/>
        },
        {
            path:"cart",
            element:<Cart/>
        },
         {
            path:"search",
            element:<SearchPage/>
         },
        //  {
        //     path:"",
        //     element:
        //  },
        {
            path:"admin-panel",
            element:<Adimbar/>,
            children:[
                {
                    path:"all-user",
                    element:<Allusers/>
                },
                {
                    path:"product",
                    element:<Allproducts/>
                }

            ]
        },
        
       
    ]
    }
])
export default router;