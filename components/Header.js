// Modified version of header code from a previous project (ufds-training) used with author's permission.

import React from "react";
import Logo from "./Intro";

import { Tab, Tablist, Pane, Heading, majorScale } from "evergreen-ui";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const tabs = [
    { label: "Home", path: "/", onSelect: () => router.push("/") },
    { label: "About", path: "/about", onSelect: () => router.push("/about") },
  ];

  return (
    <Pane
      is="nav"
      position="sticky"
      top={0}
      display="flex"
      padding={16}
      background="tint1"
      zIndex={2}
    >
      <Pane flex={1} alignItems="center" display="flex">
        <Heading marginRight={majorScale(3)}>Photong </Heading>
        <Pane>
          <Tablist width="100%">
            {tabs.map(({ label, path, onSelect }, i) => (
              <Tab
                isSelected={router.asPath === path}
                key={i}
                onSelect={onSelect}
              >
                {label}
              </Tab>
            ))}
          </Tablist>
        </Pane>
      </Pane>
    </Pane>
  );
};

export default Header;
