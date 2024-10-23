import React from "react";
import { GeminiAI, ProfileHeader } from "./index";

function AskAIPageContent() {
  return (
    <div className="flex flex-col gap-8 py-6 pr-4 w-full">
      <ProfileHeader />
      <GeminiAI />
    </div>
  );
}

export default AskAIPageContent;
