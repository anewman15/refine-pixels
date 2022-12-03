import { Button, Col } from '@pankod/refine-antd';
import { useNavigation } from '@pankod/refine-core';
import React from 'react'
import { Canvas } from 'types/canvas';
import { CanvasItem } from '.';

type CanvasTileProps = {
  canvas: Canvas;
};

const CanvasTile: React.FC<CanvasTileProps> = ({ canvas }) => {
  const { show } = useNavigation();

  return (
    <Col
      key={canvas.id}
      style={{
        height: "auto",
        width: "100%",
        maxWidth: "248px",
      }}
    >
      <Button
        onClick={() => {
          show("canvases", canvas.id);
        }}
        style={{
          height: "auto",
          maxHeight: "auto",
          paddingTop: "15px",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <CanvasItem canvas={canvas} scale={20 / canvas.width} active={false} />
      </Button>
    </Col>
  );
};

export default CanvasTile;
