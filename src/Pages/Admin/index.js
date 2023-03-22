//import { Auth } from 'aws-amplify';
import React, { useContext, useState, useEffect } from 'react';
import '../pages.css';
import './../profile-nav.css';
import { AppContext} from '../../Contexts';
import { Alert, Loading } from '../../Components';
import {isAdmin} from '../../Helpers';


function Admin() {
    const { state } = useContext(AppContext);
    const { user } = state;
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
   
    useEffect(() => {   
        if (isAdmin){
            setIsAuthorized(true);
        }
      }, []);
   
    
    return (
    <section className="App profile mx-auto max-w-screen-lg h-screen">
     {loading && <Loading />}
      <Alert type={alert?.type} text={alert?.text} />

      <div className="">      
            { isAuthorized  && (<>test - can you access this page.</> )}          
      </div>     
     
    </section>
      )}
    ;

export default Admin;


