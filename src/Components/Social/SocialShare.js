import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function SocialShare({message, url}) {

  return (
    <div className="d-block">   
      <span className="px-1"> 
      <FacebookShareButton
          url={url}         
          hashtag={"#decisions"}
          description={"AskTheFlock -We Help with Simple decisions in life."}
          className=""
        >
      <FacebookIcon size={24} round /> 
      </FacebookShareButton>
      </span>
      <span className="px-1">
      <TwitterShareButton
        title={message}
        url={String(url)}
        hashtags={["help", "decisions", "asktheflock"]}
      >
        <TwitterIcon size={24} round />
      
      </TwitterShareButton>
      </span>    
    </div>
  );
}