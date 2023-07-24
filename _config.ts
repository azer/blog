import lume from "lume/mod.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  prettyUrls: false,
});

site.use(date());

site.use(
  codeHighlight({
    options: {
      classPrefix: "hljs-",
    },
  })
);

site.remoteFile(
  "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
);

export default site;
