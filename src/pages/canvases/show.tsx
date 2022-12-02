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
    <div className="page-shadow">
      <Row style={{ marginBottom: "24px" }}>
        <Col>
          <Button
            onClick={() => list("canvases")}
            style={{ textTransform: "uppercase" }}
          >
            Back
          </Button>
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
      <div
        // gutter={[32, 32]}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", margin: "0 42px" }}>
          <ColorSelect selected={color} onChange={setColor} />
        </div>
        <div>
          {canvas && (
            <CanvasItem
              onPixelClick={onSubmit}
              canvas={canvas}
              scale={(20 / (canvas?.width ?? 20)) * 2}
              active={true}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center", margin: "0 42px" }}>
          <ColorSelect selected={color} onChange={setColor} />
        </div>
      </div>
    </div>
  );
};
