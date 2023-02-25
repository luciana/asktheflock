import React, { useEffect, useState } from 'react';
import Toast, {toast, Toaster} from 'react-hot-toast';
import { requestForToken, onMessageListener } from '../../Services/firebase';

const WebNotification = () => {
    console.log("Web Notification ready");
    const [notification, setNotification] = useState({title: '', body: ''});
    const notify = ()=> toast(<ToastDisplay/>);
    function ToastDisplay(){
        return (
            <div>
                <p><b>{notification?.title}</b></p>
                <p>{notification?.body}</p>
            </div>
        );
    };

    useEffect(() => {
        console.log("web notification value", notification);
        if(notification?.title){
            notify();
        }
    }, [notification]);

    requestForToken();

    onMessageListener()
    .then((payload) => {
        setNotification({title: payload?.notification?.title, body: payload?.notification?.body});
    })
    .catch((err) => console.log('error: ', err));

    return (
        <Toaster />
    )
}

export default WebNotification;