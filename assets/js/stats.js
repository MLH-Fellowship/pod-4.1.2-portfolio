"use strict";
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
const createElement = React.createElement;

const e = React.createElement;

const PodStats = () => {
  console.log(Octokit);

  return createElement(
    "div",
    { className: "stats-container" },
    createElement("h1", null, "Pod Stats")
  );
};

ReactDOM.render(
  createElement(PodStats),
  document.querySelector("#react-root-stats")
);
