import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function SocialShare(message) {
  return (
    <div className="d-block">   
      <span className="px-1"> <FacebookShareButton
          url={"https://www.asktheflock.com/"}
          quote={"AskTheFlock.com Decisions made easy - just posted a question"}
          hashtag={"#decisions"}
          description={"aiueo"}
          className=""
        >
      <FacebookIcon size={24} round /> 
      </FacebookShareButton>
      </span>
      <span className="px-1">
      <TwitterShareButton
        title={"AskTheFlock.com Decisions made easy - just posted a question"}
        url={"https://www.asktheflock.com/"}
        hashtags={["help", "decision"]}
      >
        <TwitterIcon size={24} round />
      
      </TwitterShareButton>
      </span>
    </div>
  );
}