import React from 'react';
import { Image, Space } from '@pankod/refine-antd';

function SponsorsBanner() {
  return (
    <Space
      style={{
        width: "320px",
        height: "56px",
        background: "#242436",
        borderBottom: "1px solid #f5f5f5",
        borderRadius: "0 0 16px 16px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Image height={24} src="/sponsors.png" />
    </Space>
  );
}

export default SponsorsBanner;
