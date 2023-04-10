import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
// import { Container, createStyles, makeStyles } from "@mui/core";
import LoopIcon from '@mui/icons-material/Loop';
import { } from 'react-icons'
// import "./LoaderButton.css";

// export const useStyles = makeStyles(() =>
//   createStyles({
//     rotateIcon: {
//       animation: "$spin 2s linear infinite"
//     },
//     "@keyframes spin": {
//       "0%": {
//         transform: "rotate(360deg)"
//       },
//       "100%": {
//         transform: "rotate(0deg)"
//       }
//     }
//   })
// );

export default function LoaderButton({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoopIcon sx={{
                      animation: "spin 2s linear infinite",
                      "@keyframes spin": {
                        "0%": {
                          transform: "rotate(360deg)",
                        },
                        "100%": {
                          transform: "rotate(0deg)",
                        },
                      },
                    }}/>
      }
      {props.children}
    </Button>
  );
}
