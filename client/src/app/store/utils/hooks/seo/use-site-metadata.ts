export const useSiteMetadata = () => {
  const { siteMetadata } = Object.assign({}, window.__SITE_STATE__, {
    siteMetadata: {
      siteTitle: "游牧诗人 —— 烛火录",
      siteTitleAlt: "游牧诗人 —— 烛火录",
      siteUrl: "https://o-w-o.ink",
      siteDescription: "游牧诗人 —— 烛火录",
      siteLanguage: "zh_CN",
      siteImage: "/logo.png",
      author: "symbols@dingtalk.com",
    },
  });
  const {
    siteTitle,
    siteTitleAlt,
    siteUrl,
    siteDescription,
    siteLanguage,
    siteImage,
    author,
  } = siteMetadata;

  return {
    siteTitle,
    siteTitleAlt,
    siteUrl,
    siteDescription,
    siteLanguage,
    siteImage,
    author,
  };
};
