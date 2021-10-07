---
---

// Libraries
import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const auth = {{site.env.GITHUB_ACCESS_TOKEN | jsonify}}

/**
 * - Create an instance of Github Octokit module for fetching data
 * - To be able to make a successful request, github requires to
 *   send in a personal access token.
 * - To generate a personal access token follow the instructions in
 *   the following link:
 *   https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
 */
const octokit = new Octokit({
  auth,
});
const createElement = React.createElement;

/**
 * Options to configure the look of the bar graph (Chart.js)
 */
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

/**
 * React Component for Stats component
 * React library is imported from the cdn in _includes/header.html
 */
const PodStats = () => {
  /**
   * A React ref used for the bar graph
   * Passes as a ref to the div inside which chart.js renders graph
   */
  const canvasRef = React.useRef(null);
  // Local States
  const [repoDetails, setRepoDetails] = React.useState({
    commits: "loading",
    openedPR: "loading",
    mergedPR: "loading",
    openedIssues: "loading",
    closedIssues: "loading",
  });

  React.useEffect(() => {
    // An asynchronous function to fetch repository details and create the graph
    const fetchDetails = async () => {
      try {
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

        /**
         * Generate an object from an array of commits
         * The key here is the name of the contributor and
         * the value is the number of contributions
         */
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

        // Generate the bar graph from the obtained data
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
      } catch (error) {
        console.log(error)
      }
    };

    fetchDetails();
  }, []);

  /**
   * JSX (Javascript XML) cannot be implemented without setting up
   * a javascript bundler such as webpack, parcel or rollup which is
   * sort of overkill for a single component
   * Hence the inbuilt React.createElement syntax is used to create
   * html elements.
   * Babel, a tool used to convert JSX to ES5 provides a playground
   * One can convert the code below to get the JSX equivalent and
   * get a better understanding of the html structure
   */
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

// Renders the above element in the appropriate div (inside _includes/stats.html)
ReactDOM.render(
  createElement(PodStats),
  document.querySelector("#react-root-stats")
);
