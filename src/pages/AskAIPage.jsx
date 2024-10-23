import React from "react";
import { AskAIPageContent, SideNavBar } from "../components/index";

function AskAIPage() {
  return (
    <div className="flex">
      <SideNavBar selectedPageName="AskAI"/>
      <AskAIPageContent />
    </div>
  );
}

export default AskAIPage;
