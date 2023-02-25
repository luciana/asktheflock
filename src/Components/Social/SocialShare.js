import React from "react";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

export default function SocialShare(message) {
  return (
    <div className="d-block">
     <span className="text-sm px-1">Share</span>
     <span className="px-1"> <FacebookShareButton
        url={"https://www.asktheflock.com/"}
        quote={"AskTheFlock.com Decisions made easy - just posted a question"}
        hashtag={"#decisions"}
        description={"aiueo"}
        className=""
      >
        <FacebookIcon size={20} round /> 
      </FacebookShareButton>
      </span><span className="px-1">
      <TwitterShareButton
        title={"AskTheFlock.com Decisions made easy - just posted a question"}
        url={"https://www.asktheflock.com/"}
        hashtags={["help", "decision"]}
      >
        <TwitterIcon size={20} round />
      
      </TwitterShareButton>
      </span>
    </div>
  );
}