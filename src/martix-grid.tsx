import { CSSProperties } from "react";

import { MAX_CELL_VALUE } from "./matrix-store";
import { useMatrixCellValue, useMatrixSize } from "./matrix-store-hooks";

import invertColor from 'invert-color'

const palette =  [
  "#FF0000", // Red
  "#FF7F00", // Orange
  "#FFFF00", // Yellow
  "#7FFF00", // Chartreuse Green
  "#00FF00", // Green
  "#00FF7F", // Spring Green
  "#00FFFF", // Cyan
  "#007FFF", // Azure
  "#0000FF", // Blue
  "#7F00FF", // Violet
  "#FF00FF", // Magenta
  "#FF007F", // Rose
  "#FF6666", // Light Red
  "#FFB266", // Light Orange
  "#FFFF66", // Light Yellow
  "#B2FF66", // Light Chartreuse Green
  "#66FF66", // Light Green
  "#66FFB2", // Light Spring Green
  "#66FFFF", // Light Cyan
  "#66B2FF", // Light Azure
  "#6666FF", // Light Blue
  "#B266FF", // Light Violet
  "#FF66FF", // Light Magenta
  "#FF66B2", // Light Rose
  "#FF9999", // Lighter Red
  "#FFCC99", // Lighter Orange
  "#FFFF99", // Lighter Yellow
  "#CCFF99", // Lighter Chartreuse Green
  "#99FF99", // Lighter Green
  "#99FFCC", // Lighter Spring Green
  "#99FFFF", // Lighter Cyan
  "#99CCFF", // Lighter Azure
  "#9999FF", // Lighter Blue
  "#CC99FF", // Lighter Violet
  "#FF99FF", // Lighter Magenta
  "#FF99CC", // Lighter Rose
  "#FFCCCC", // Lightest Red
  "#FFE5CC", // Lightest Orange
  "#FFFFCC", // Lightest Yellow
  "#E5FFCC", // Lightest Chartreuse Green
  "#CCFFCC", // Lightest Green
  "#CCFFE5", // Lightest Spring Green
  "#CCFFFF", // Lightest Cyan
  "#CCE5FF", // Lightest Azure
  "#CCCCFF", // Lightest Blue
  "#E5CCFF", // Lightest Violet
  "#FFCCFF", // Lightest Magenta
  "#FFCCE5"  // Lightest Rose
];

const FALLBACK_BG_COLOR = "#000"
const FALLBACK_COLOR = '#fff'

const foregroundColorsMap = Object.fromEntries(palette.map(color => [color, invertColor(color)]))

const breakpointInterval = MAX_CELL_VALUE / palette.length

const getBackgroundColor = (value: number) => {
  for (let breakpoint = 1; breakpoint <= palette.length; breakpoint +=1) {
    if (breakpointInterval * breakpoint >= value) {
      return palette[breakpoint - 1]
    }
  }

  return FALLBACK_BG_COLOR
}

const formatCellValue = (value: number) => {
  const [integer, fraction] = value.toString().split('.')

  const integerPart = integer.padStart(2, '0')

  const fractionPart = fraction.slice(0, 2)

  return `${integerPart}.${fractionPart}`.slice(0, 5)
}

const Cell = (props: { x: number; y: number }) => {
  const { x, y } = props;

  const value = useMatrixCellValue(x, y);

  const backgroundColor = getBackgroundColor(value);
  const color = foregroundColorsMap[backgroundColor] ?? FALLBACK_COLOR
  
  const cssVars = { "--backgroundColor": backgroundColor, "--color": color } as CSSProperties;

  return (
    <span className="cell" style={cssVars}>
      {formatCellValue(value)}
    </span>
  );
};

export const MatrixGrid = () => {
  const { rows, columns } = useMatrixSize()

  return (
    <div style={{ fontFamily: "monospace" }}>
      {Array.from({ length: rows }, (_, rowIdx: number) => (
        <div key={rowIdx} className="row">
          {Array.from({ length: columns }, (_, colIdx: number) => (
            <Cell key={`${rowIdx}-${colIdx}`} x={rowIdx} y={colIdx} />
          ))}
        </div>
      ))}
    </div>
  )
}


