import React from "react";
import "./progressCircle.css";

const Circle = ({ color, percentage, size, strokeWidth }) => {
    // Ensure size is a valid number and set minimum size for radius calculation
    const radius = size / 2 - 15;
    const circ = 2 * Math.PI * radius - 30; // Full circumference of the circle
    const strokePct = ((100 - Math.round(percentage))) * circ / 100; // Percentage of the circle to draw

    return (
        <circle
            r={radius} // Make sure radius is not NaN
            cx="50%"
            cy="50%"
            fill="transparent"
            stroke={percentage ? color : ""} // Only apply stroke if percentage is valid
            strokeWidth={strokeWidth}
            strokeDasharray={circ} // Full circumference
            strokeDashoffset={strokePct} // Offset based on percentage
            strokeLinecap="round"
        />
    );
};

export default function ProgressCircle({ percentage = 0, size = 100, color = "#000", image, isPlaying = false}) {
    return (
        <div className="progress-circle flex">
            <svg width={size} height={size}>
                <g>
                    <Circle
                        strokeWidth={"0.4rem"}
                        color="aqua"
                        size={size}
                        percentage={100} // Background circle, 100% filled
                    />
                    <Circle
                        strokeWidth={"0.6rem"}
                        color={color}
                        size={size}
                        percentage={percentage} // Foreground circle, filled based on percentage
                    />
                </g>
                <defs>
                    <clipPath id="myCircle">
                        <circle cx="50%" cy="50%" r={(size / 2) - 30} fill="#ffff" />
                    </clipPath>
                    <circlePath id="myInnerCircle">
                        <circle cx="50%"  cy="50%" r={(size / 2) - 100} fill="#ffff" />
                    </circlePath>
                </defs>
                <image 
                    className={isPlaying ? "active" : ""} 
                    x={30}
                    y={30} 
                    width={2 * ((size / 2) - 30)} 
                    height={2 * ((size / 2) - 30)}
                    href="https://cdn.pixabay.com/photo/2013/07/13/12/07/record-159211_1280.png" 
                    clipPath="url(#myCircle)"
                />
                <image 
                    className={isPlaying ? "active" : ""} 
                    x={100} 
                    y={100} 
                    width={2 * ((size / 2) - 100)} 
                    height={2 * ((size / 2) - 100)}
                    href={image}
                    clipPath="url(#myInnerCircle)"
                />
            </svg>
        </div>
    );
}
