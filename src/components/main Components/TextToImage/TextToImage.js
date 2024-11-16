import React from "react";
const ReactCanvas = require("react-canvas");
const Surface = ReactCanvas.Surface;
const Image = ReactCanvas.Image;
const Text = ReactCanvas.Text;
function TextToImage({ data }) {
  const surfaceWidth = window.innerWidth;
  const surfaceHeight = window.innerHeight;
  return (
    <Surface width={surfaceWidth} height={surfaceHeight} left={0} top={0}>
      <Text>{data}</Text>
    </Surface>
  );
}

export default TextToImage;
