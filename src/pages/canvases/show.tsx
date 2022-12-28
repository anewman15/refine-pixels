import React from "react";
import { Button, Col, Row, Typography, Icons, useModal, Space, Modal } from "@pankod/refine-antd";
import { useCreate, useGetIdentity, useNavigation, useShow } from "@pankod/refine-core";
import { Canvas } from "types/canvas";
import { ColorSelect, CanvasItem } from "components";
import { colors } from "utility";
import DisplayCanvas from "components/canvas/display";
import AvatarPanel from "components/avatar/avatar-panel";
import { LogList } from "components/logs";

const { LeftOutlined } = Icons;

export const CanvasShow = () => {
  const { data: identity } = useGetIdentity();
  const { modalProps, show, close } = useModal();

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
        metaData: {
          canvas,
        },
      });
    }
  };

  return (
    <Space direction="vertical" className="page-shadow w-full h-90">
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

      {canvas && (
        <DisplayCanvas canvas={canvas}>
          {(pixels) => (
            <Space
              direction="vertical"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: "24px",
              }}
            >
              <Space
                direction="vertical"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Space
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "16px 56px",
                  }}
                >
                  <ColorSelect selected={color} onChange={setColor} />
                </Space>
                <Space>
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                      // setCurrentCanvas(record);
                      show();
                    }}
                  >
                    View Changes
                  </Button>
                </Space>
              </Space>
              <CanvasItem
                canvas={canvas}
                pixels={pixels}
                onPixelClick={onSubmit}
                scale={(20 / (canvas?.width ?? 20)) * 2}
                active={true}
              />
              <AvatarPanel pixels={pixels} />
              <Modal
                title="Canvas Changes"
                {...modalProps}
                centered
                destroyOnClose
                onOk={close}
                onCancel={() => {
                  close();
                }}
                footer={[
                  <Button type="primary" key="close" onClick={close}>
                    Close
                  </Button>,
                ]}
              >
                <LogList currentCanvas={canvas} />
              </Modal>
            </Space>
          )}
        </DisplayCanvas>
      )}
    </Space>
  );
};
