import { wrappingInputRule } from "prosemirror-inputrules";
import toggleWrap from "../commands/toggleWrap";
import { WarningIcon, InfoIcon, StarredIcon } from "outline-icons";
import * as React from "react";
import ReactDOM from "react-dom";
import Node from "./Node";
import noticesRule from "../rules/notices";

export default class Notice extends Node {
  get styleOptions() {
    return Object.entries({
      info: this.options.dictionary.info,
      warning: this.options.dictionary.warning,
      tip: this.options.dictionary.tip,
    });
  }

  get name() {
    return "container_notice";
  }

  get rulePlugins() {
    return [noticesRule];
  }

  get schema() {
    return {
      attrs: {
        style: {
          default: "info",
        },
      },
      content: "block+",
      group: "block",
      defining: true,
      draggable: true,
      parseDOM: [
        {
          tag: "div.notice-block",
          preserveWhitespace: "full",
          contentElement: "div:last-child",
          getAttrs: (dom: HTMLDivElement) => ({
            style: dom.className.includes("tip")
              ? "tip"
              : dom.className.includes("warning")
              ? "warning"
              : undefined,
          }),
        },
      ],
      toDOM: (node) => {
        const select = document.createElement("select");
        select.addEventListener("change", this.handleStyleChange);

        this.styleOptions.forEach(([key, label]) => {
          const option = document.createElement("option");
          option.value = key;
          option.innerText = label;
          option.selected = node.attrs.style === key;
          select.appendChild(option);
        });

        let component;

        if (node.attrs.style === "tip") {
          // component = <StarredIcon color="currentColor" />;
          component = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "20px", height: "20px", marginTop: "4px" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (node.attrs.style === "warning") {
          // component = <WarningIcon color="currentColor" />;
          component = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "20px", height: "20px", marginTop: "4px" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          );
        } else {
          // component = <InfoIcon color="currentColor" />;
          component = (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "20px", height: "20px", marginTop: "4px" }}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          );
        }

        const icon = document.createElement("div");
        icon.className = "icon";
        ReactDOM.render(component, icon);

        return [
          "div",
          { class: `notice-block ${node.attrs.style}` },
          icon,
          ["div", { contentEditable: false }, select],
          ["div", { class: "content" }, 0],
        ];
      },
    };
  }

  commands({ type }) {
    return (attrs) => toggleWrap(type, attrs);
  }

  handleStyleChange = (event) => {
    const { view } = this.editor;
    const { tr } = view.state;
    const element = event.target;
    const { top, left } = element.getBoundingClientRect();
    const result = view.posAtCoords({ top, left });

    if (result) {
      const transaction = tr.setNodeMarkup(result.inside, undefined, {
        style: element.value,
      });
      view.dispatch(transaction);
    }
  };

  inputRules({ type }) {
    return [wrappingInputRule(/^:::$/, type)];
  }

  toMarkdown(state, node) {
    state.write("\n:::" + (node.attrs.style || "info") + "\n");
    state.renderContent(node);
    state.ensureNewLine();
    state.write(":::");
    state.closeBlock(node);
  }

  parseMarkdown() {
    return {
      block: "container_notice",
      getAttrs: (tok) => ({ style: tok.info }),
    };
  }
}
