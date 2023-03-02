import axios from 'axios';

const shortenURL = async (input) => {

     return await axios(
      `https://api.shrtco.de/v2/shorten?url=${input}`
    ).then((response) =>{
        console.log("calling shorten url ", response.data.result.full_short_link);
        return response.data.result.full_short_link;
    }).catch((error) => {
        console.error("Error shortening URL Service", error);
        return null;
     });
};

export default shortenURL;