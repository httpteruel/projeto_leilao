import {Navigate, Outlet} from "react-router-dom";

const privateRouteLayout = () => {
    const usuario = localStorage.getItem("usuario")?true:false;
    return(
        usuario?<Outlet/>:<Navigate to="/login" replace/>
    );
}

export default privateRouteLayout