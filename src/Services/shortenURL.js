import axios from 'axios';

const shortenURL = async (input) => {

    const url = input.replace(/(^\w+:|^)\/\//, '');  
     return await axios(
      `https://api.shrtco.de/v2/shorten?url=${url}`
      
    ).then((response) =>{
        return response.data.result.full_short_link;
    }).catch((error) => {
        console.error("Error shortening URL Service", error);
        return null;
     });
};

export default shortenURL;