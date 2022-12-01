import React from "react";
import { Button, Col, Row, Typography } from "@pankod/refine-antd";
import { useCreate, useGetIdentity, useNavigation, useShow } from "@pankod/refine-core";
import { Canvas } from "types/canvas";
import { ColorSelect, CanvasItem } from "components";
import { colors } from "utility";

export const CanvasShow = () => {
  const { data: identity } = useGetIdentity();

  const {
    queryResult: { data: { data: canvas } = {} },
  } = useShow<Canvas>();

  const [color, setColor] = React.useState<typeof colors[number]>("black");

  const { mutate } = useCreate();
  const { list, push } = useNavigation();

  const onSubmit = (x: number, y: number) => {
    if (!identity) { return push("/login") };

    if (typeof x === "number" && typeof y === "number" && canvas?.id) {
      mutate({
        resource: "pixels",
        values: { x, y, color, canvas_id: canvas?.id, user_id: identity.id },
      });
    }
  };

  return (
    <>
      <Row style={{ marginBottom: "24px" }}>
        <Col>
          <Button onClick={() => list("canvases")}>Go Back</Button>
        </Col>
        <Col flex="1" style={{ textAlign: "center" }}>
          <Typography.Title level={3}>
            {canvas?.name ?? canvas?.id ?? ""}
          </Typography.Title>
        </Col>
        <Col>
          <Button disabled style={{ visibility: "hidden" }}>
            Go Back
          </Button>
        </Col>
      </Row>
      <Row
        gutter={[32, 32]}
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "24px",
        }}
      >
        <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
          <ColorSelect selected={color} onChange={setColor} />
        </Col>
        <Col>
          {canvas && (
            <CanvasItem
              onPixelClick={onSubmit}
              canvas={canvas}
              scale={(20 / (canvas?.width ?? 20)) * 2}
              active={true}
            />
          )}
        </Col>
      </Row>
    </>
  );
};
