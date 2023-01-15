import React from "react";

import { Pane, Heading, Text } from "evergreen-ui";

function Intro() {
  return (
    <Pane>
      <Pane display="flex">
        <Heading size={900} fontWeight={850} letterSpacing={-1}>
          Photong
        </Heading>
        <Heading size={200} marginLeft={4}>
          BETA
        </Heading>
      </Pane>
      <Heading size={500} marginTop={5}>
        Photong uses machine learning to generate soundtracks from images.
      </Heading>
    </Pane>
  );
}

export default Intro;
