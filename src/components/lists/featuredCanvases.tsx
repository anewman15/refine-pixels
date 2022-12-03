import React from 'react';
import { useList, useNavigation } from '@pankod/refine-core';
import { Button, Col, Empty, Row, Typography } from '@pankod/refine-antd';
import { Canvas } from 'types/canvas';
import { CanvasItem } from '..';

const { Title } = Typography;

const FeaturedCanvases = () => {
  const { data } = useList<Canvas>({
    resource: "canvases",
    config: {
      hasPagination: false,
      sort: [
        {
          field: "created_at",
          order: "desc",
        },
      ],
      filters: [
        {
          field: "is_featured",
          operator: "eq",
          value: true,
        },
      ],
    },
  });

  const { show } = useNavigation();

  return (
    <>
      <Title level={2}>Featured</Title>
      {
        data?.data ? (
          <Row
            gutter={[16, 16]}
            align="middle"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(248px, 1fr))",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            {data?.data?.map((canvas) => (
              <Col
                key={canvas.id}
                style={{
                  height: "100%",
                  width: "100%",
                  maxWidth: "248px",
                }}
              >
                <Button
                  onClick={() => {
                    show("canvases", canvas.id);
                  }}
                  style={{
                    height: "100%",
                    maxHeight: "unset",
                    paddingTop: "15px",
                    display: "flex",
                    alignItems: "start",
                  }}
                >
                  <CanvasItem
                    canvas={canvas}
                    scale={20 / canvas.width}
                    active={false}
                  />
                </Button>
              </Col>
            ))}
          </Row>
        ) : <Empty />
      }
    </>
  );
};

export default FeaturedCanvases;
