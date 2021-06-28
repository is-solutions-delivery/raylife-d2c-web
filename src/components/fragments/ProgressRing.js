import React from "react";
import styled from "styled-components";
import { calculateCircumference, calculateOffset } from "../../utils";

export const ProgressRing = ({
  className,
  strokeColor = "#4C85FF",
  strokeWidth = 2,
  diameter = 24,
  percent = 0,
}) => {
  const radius = diameter / 2;
  const normalizedRadius = radius - strokeWidth * 2;

  return (
    <ProgressRingStyled
      className={className}
      width={diameter}
      height={diameter}
      radius={normalizedRadius}
      percent={percent}
    >
      <circle
        className="progress"
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </ProgressRingStyled>
  );
};

const ProgressRingStyled = styled.svg`
  & > .progress {
    stroke-dasharray: ${({ radius }) =>
      `${calculateCircumference(radius)} ${calculateCircumference(radius)}`};

    stroke-dashoffset: ${({ radius, percent }) =>
      calculateOffset(percent, calculateCircumference(radius))};

    transition: 0.35s stroke-dashoffset;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }
`;
