import {
  Button,
  Col,
  Row,
  Typography,
} from "@pankod/refine-antd";
import { useList, useNavigation, useResource } from "@pankod/refine-core";
import SponsorsBanner from "components/banners/sponsors";
import { CanvasItem } from "components/canvas";
import AllCanvases from "components/lists/allCanvases";
import FeaturedCanvases from "components/lists/featuredCanvases";
import { Canvas } from "types/canvas";

export const CanvasList = () => {
  const {
    resource: { label, name },
  } = useResource();

  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Row
        className="page-shadow"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Row style={{ marginBottom: "24px" }}>
          <Col flex="1">
            <Typography.Title level={3}>{label ?? name}</Typography.Title>
          </Col>
        </Row>
        <FeaturedCanvases />
        <AllCanvases />
      </Row>
      <SponsorsBanner />
    </Row>
  )
};
