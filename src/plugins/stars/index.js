const fetch = require("node-fetch")


/**
 *  @type {import('@docusaurus/types').PluginModule}
 *
 *  This plugin is used to load the stargazer count for the GitHub repository.
 */

const pluginModule = function (context) {
  const isProd = process.env.NODE_ENV === "production";
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { githubRepo } = themeConfig || {};

  return {
    name: "docusaurus-plugin-stars",

    async contentLoaded({ actions }) {

      const { setGlobalData } = actions;
      const repoInfoReq = await fetch(
        `https://api.github.com/repos/${githubRepo}`
      );
      const repoInfo = await repoInfoReq.json();
      // using global data so that we can access it from any theme component
      setGlobalData({
        starGazers: repoInfo.stargazers_count
      });
    }
  };
};

// When migrating to newer plugin system
// pluginModule.validateOptions = ({ options }) => {
//   if (!options.githubRepo) {
//     throw new Error("You must provide a GitHub repository name.");
//   }
// };

module.exports = pluginModule;
