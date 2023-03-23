import Auth from "../Services/auth";

const isAdmin = async () => {   
  try {
   // console.log("Are you authorized?" );
    const result = await Auth.IsAdminUser();   
   // console.log(result);
    if (result) {
      return true;
    } else {
      return false;
    }

  }catch(error){
      console.error("Admin error", error);
      return false;
  }
   
  };
  
  export default isAdmin;