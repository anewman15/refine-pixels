import { useList } from '@pankod/refine-core';
import React from 'react';
import { Canvas } from 'types/canvas';
import { Pixel } from 'types/pixel';
import Contributors from './contributors';

type AvatarPanelProps = {
  canvas: Canvas,
}

const AvatarPanel: React.FC<AvatarPanelProps> = ({ canvas: { id } }) => {
  const { data: pixelsData } = useList<Pixel>({
    resource: "pixels",
    liveMode: "auto",
    config: {
      hasPagination: false,
      filters: [
        {
          field: "canvas_id",
          operator: "eq",
          value: id,
        },
      ],
      sort: [
        {
          field: "created_at",
          order: "desc",
        }
      ]
    },
  });

  const pixels = pixelsData?.data;


  return (
    <div>
      <Contributors pixels={pixels}/>
    </div>
  );
};

export default AvatarPanel;
