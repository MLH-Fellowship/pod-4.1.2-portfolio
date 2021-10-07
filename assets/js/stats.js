"use strict";
import React from "https://unpkg.com/react@17/umd/react.development.js";
import ReactDOM from "https://unpkg.com/react-dom@17/umd/react-dom.development.js";

// Libraries
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";
import { Bar } from "https://cdnjs.cloudflare.com/ajax/libs/react-chartjs-2/3.0.5/chart.d.ts";

const createElement = React.createElement;

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "rgba(255,255, 255, 0.8)",
      },
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
      color: "rgba(255,255, 255, 0.8)",
    },
  },
  scales: {
    y: {
      ticks: {
        color: "rgba(255,255, 255, 0.8)",
      },
    },
    x: {
      ticks: {
        color: "rgba(255,255, 255, 0.8)",
      },
    },
  },
};

const PodStats = () => {
  console.log(Octokit);

  return /*#__PURE__*/ createElement(
    "div",
    {
      className: "pod-stats-container",
    },
    /*#__PURE__*/ createElement(
      "div",
      {
        className: "pod-stats-child-container",
      },
      /*#__PURE__*/ createElement(
        "h2",
        {
          className: "pod-stats-heading",
        },
        "MLH Prep: Pod 4.1.2 aka Mocking Sparrows"
      ),
      /*#__PURE__*/ createElement(
        "div",
        {
          className: "details-adjuster",
        },
        /*#__PURE__*/ createElement(
          "div",
          {
            className: "repository-stats-container",
          },
          /*#__PURE__*/ createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            "Total Commits: 20"
          ),
          /*#__PURE__*/ createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            "Open Pull Requests: 20"
          ),
          /*#__PURE__*/ createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            "Closed Pull Requests: 20"
          ),
          /*#__PURE__*/ createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            "Open Issues: 20"
          ),
          /*#__PURE__*/ createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            "Closed Issues: 20"
          )
        ),
        /*#__PURE__*/ createElement(
          "div",
          {
            className: "pod-leaderboard-container",
          },
          /*#__PURE__*/ createElement(Bar, {
            data: data,
            options: options,
          })
        )
      )
    )
  );
};

ReactDOM.render(
  createElement(PodStats),
  document.querySelector("#react-root-stats")
);
