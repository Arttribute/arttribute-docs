import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export default function Baseurl() {
  const { siteConfig } = useDocusaurusContext();
  const { title, tagline } = siteConfig;

  return <span>`title is ${title}`</span>;
}
