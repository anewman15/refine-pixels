import { useList } from "@pankod/refine-core";
import React from "react";
import { Canvas } from "types/canvas";
import { Pixel } from "types/pixel";
import { DEFAULT_SCALE, PIXEL_SIZE } from "utility/constants";

type Props = {
  canvas: Canvas;
  scale?: number;
  border?: boolean;
  active?: boolean;
  onPixelClick?: (x: number, y: number) => void;
};

export const CanvasItem: React.FC<Props> = ({
  canvas: { id, name, width, height },
  scale = DEFAULT_SCALE,
  border = true,
  active = true,
  onPixelClick,
}) => {
  const { data } = useList<Pixel>({
    resource: "pixels",
    liveMode: "auto",
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
          field: "canvas_id",
          operator: "eq",
          value: id,
        },
      ],
    },
  });

  return (
    <div>
      <div>
        {Array.from({ length: height }).map((_, i) => (
          <div key={`row-${i}`} style={{ display: "flex" }}>
            {Array.from({ length: width }).map((_, j) => (
              <div key={`row-${i}-col-${j}`}>
                <div
                  onClick={() => {
                    if (onPixelClick && active) {
                      onPixelClick(j, i);
                    }
                  }}
                  className={active ? "canvas-pixel-item" : undefined}
                  style={{
                    cursor: active ? "pointer" : undefined,
                    width: PIXEL_SIZE * scale,
                    height: PIXEL_SIZE * scale,
                    border: border ? "0.5px solid rgba(0,0,0,0.05)" : undefined,
                    background:
                      data?.data?.find((el) => el.x === j && el.y === i)
                        ?.color ?? "transparent",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        style={{
          whiteSpace: "normal",
          display: active ? "none" : "block",
          padding: "12px",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "12px",
        }}
      >
        {name ?? id}
      </div>
    </div>
  );
};
