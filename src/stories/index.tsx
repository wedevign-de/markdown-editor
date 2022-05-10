import * as React from "react";
import { dark, light } from "../styles/theme";
import Editor from "..";

const articleSearchResults = [
  {
    title: "Hiring",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/hiring",
  },
  {
    title: "Product Roadmap",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/product-roadmap",
  },
  {
    title: "Finances",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/finances",
  },
  {
    title: "Security",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/security",
  },
  {
    title: "Super secret stuff",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/secret-stuff",
  },
  {
    title: "Supero notes",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/supero-notes",
  },
  {
    title: "Meeting notes",
    subtitle: "Here is the first part of the short_description ...",
    url: "/article/meeting-notes",
  },
];

class YoutubeEmbed extends React.Component<{
  attrs: any;
  isSelected: boolean;
}> {
  render() {
    const { attrs } = this.props;
    const videoId = attrs.matches[1];

    return (
      <iframe
        className={this.props.isSelected ? "ProseMirror-selectednode" : ""}
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
      />
    );
  }
}

const embeds = [
  {
    title: "YouTube",
    keywords: "yt youtube video tube google",
    defaultHidden: true,
    // eslint-disable-next-line react/display-name
    icon: () => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
        width={24}
        height={24}
      />
    ),
    matcher: (url) => {
      return url.match(
        /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
      );
    },
    component: YoutubeEmbed,
  },
];

export default function Example(props) {
  const { body } = document;
  if (body)
    body.style.backgroundColor = props.dark
      ? dark.background
      : light.background;

  return (
    <div style={{ padding: "1em 2em" }}>
      <Editor
        onCreateArticleLink={(title) => {
          // Delay to simulate time taken for remote API request to complete
          return new Promise((resolve, reject) => {
            console.log(title);
            setTimeout(() => {
              if (title !== "error") {
                return resolve(
                  `/article/${encodeURIComponent(title.toLowerCase())}`
                );
              } else {
                reject("500 error");
              }
            }, 1500);
          });
        }}
        onSearchArticleLink={async (term) => {
          // Delay to simulate time taken for remote API request to complete
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(
                articleSearchResults.filter((result) =>
                  result.title.toLowerCase().includes(term.toLowerCase())
                )
              );
            }, Math.random() * 500);
          });
        }}
        uploadImage={(file) => {
          console.log("File upload triggered: ", file);

          // Delay to simulate time taken to upload
          return new Promise((resolve) => {
            setTimeout(() => resolve(URL.createObjectURL(file)), 1500);
          });
        }}
        embeds={embeds}
        {...props}
      />
    </div>
  );
}
