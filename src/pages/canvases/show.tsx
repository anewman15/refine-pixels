import React from "react";
import { Button, Col, Row, Typography, Icons } from "@pankod/refine-antd";
import { useCreate, useGetIdentity, useNavigation, useShow } from "@pankod/refine-core";
import { Canvas } from "types/canvas";
import { ColorSelect, CanvasItem } from "components";
import { colors } from "utility";
import AvatarPanel from "components/avatar-panel";

const { LeftOutlined } = Icons;

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
            type="text"
            onClick={() => list("canvases")}
            style={{ textTransform: "uppercase" }}
          >
            <LeftOutlined />
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
            Back
          </Button>
        </Col>
      </Row>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: "24px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", margin: "0 56px" }}>
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
        <div style={{ display: "flex", justifyContent: "center", margin: "0 56px" }}>
          {
            canvas && (
              <AvatarPanel canvas={canvas} />
            )
          }
        </div>
      </div>
    </div>
  );
};
