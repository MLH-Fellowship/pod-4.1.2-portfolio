// Libraries
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit({
  // Add GitHub Access Token
  auth: "",
});
const createElement = React.createElement;

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
      text: "Mocking Sparrows Contribution",
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
  const canvasRef = React.useRef(null);
  const [repoDetails, setRepoDetails] = React.useState({
    commits: "loading",
    openedPR: "loading",
    mergedPR: "loading",
    openedIssues: "loading",
    closedIssues: "loading",
  });

  React.useEffect(() => {
    const fetchDetails = async () => {
      const { repository } = await octokit.graphql(`
        query {
          repository (name:"pod-4.1.2-portfolio", owner:"MLH-Fellowship") {
            name
            closedIssues: issues (states:CLOSED) {
              totalCount
            }
            openedIssues: issues (states:OPEN) {
              totalCount
            }
            openedPR: pullRequests(states:OPEN) {
              totalCount
            }
            mergedPR: pullRequests(states:MERGED) {
              totalCount
            }
            object(expression: "main") {
              ... on Commit {
                history {
                  totalCount
                  nodes {
                    additions
                    committedDate

                    author {
                      name
                      avatarUrl
                    }
                  }
                }
              }
            }
          }
        }
      `);

      let commitCount = {};
      repository.object.history.nodes.forEach(({ author }) => {
        commitCount[author.name] = commitCount[author.name]
          ? commitCount[author.name] + 1
          : 1;
      });

      setRepoDetails((current) => ({
        ...current,
        commits: repository.object.history.totalCount,
        openedPR: repository.openedPR.totalCount,
        mergedPR: repository.mergedPR.totalCount,
        openedIssues: repository.openedIssues.totalCount,
        closedIssues: repository.closedIssues.totalCount,
      }));

      const ctx = canvasRef.current.getContext("2d");
      const data = {
        labels: Object.keys(commitCount),
        datasets: [
          {
            label: "# of Commits",
            data: Object.keys(commitCount).map((key) => commitCount[key]),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      };

      new Chart(ctx, {
        type: "bar",
        data,
        options,
      });
    };

    fetchDetails();
  }, []);

  return createElement(
    "div",
    {
      className: "pod-stats-container",
    },
    createElement(
      "div",
      {
        className: "pod-stats-child-container",
      },
      createElement(
        "h2",
        {
          className: "pod-stats-heading",
        },
        "MLH Prep: Pod 4.1.2 aka Mocking Sparrows"
      ),
      createElement(
        "div",
        {
          className: "details-adjuster",
        },
        createElement(
          "div",
          {
            className: "repository-stats-container",
          },
          createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            `Total Commits:     ${repoDetails.commits}`
          ),
          createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            `Pull Requests Opened:     ${repoDetails.openedPR}`
          ),
          createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            `Pull Requests Merged:     ${repoDetails.mergedPR}`
          ),
          createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            `Open Issues:     ${repoDetails.openedIssues}`
          ),
          createElement(
            "h2",
            {
              className: "pod-stats-para",
            },
            `Closed Issues:     ${repoDetails.closedIssues}`
          )
        ),
        createElement(
          "div",
          {
            className: "pod-leaderboard-container",
          },
          createElement("canvas", {
            ref: canvasRef,
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
