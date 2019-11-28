const config = require(`./site-config`)

const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || `development`

console.log(`Using environment config: "${activeEnv}"`)

require(`dotenv`).config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `WhatJackHasMade`,
    siteUrl: `https://whatjackhasmade.co.uk`,
    description: `Award winning freelance fullstack website developer`,
  },
  plugins: [
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "WORDPRESS",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "wordpress",
        // Url to query from
        url: "https://wjhm.noface.app/graphql",
        // refetch interval in seconds
        // refetchInterval: 600,
      },
    },
    `gatsby-source-bonus`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-plugin-favicon`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-lodash`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: `1261093`,
        sv: `6`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: config.googleAnalyticsID,
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-html-attributes`,
      options: {
        lang: `en`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeLinkHeaders: false,
        mergeCachingHeaders: false,
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.whatjackhasmade.co.uk`,
        sitemap: `https://www.whatjackhasmade.co.uk/sitemap.xml`,
        resolveEnv: () => activeEnv,
        env: {
          development: {
            policy: [{ userAgent: `*`, disallow: [`/`] }],
          },
          production: {
            policy: [
              {
                userAgent: `*`,
                allow: `/`,
                disallow: [`/inspiration`, `/assets`, `/client/*`, `/twitter`],
              },
            ],
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-polyfill-io`,
      options: {
        features: [
          `Array.prototype.map`,
          `fetch`,
          `IntersectionObserver`,
          `IntersectionObserverEntry`,
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "wp-block-code-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: true,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
            },
          },
        ],
      },
    },
  ],
}
