import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import { projectActions } from "../../store/actions";

const Project = (Props) => {
  const dispatch = useDispatch();
  const { project } = Props;

  useEffect(() => {}, []);

  return (
    <Box
      key={project.id}
      mb={5}
      mr={5}
      sx={{ width: "120px", cursor: "pointer", textAlign: "center" }}
    >
      <Box
        component="img"
        width={"100px"}
        src="/assets/img/videoFolderIcon.png"
        sx={{ cursor: "pointer" }}
        onClick={() => {
          Props.setIsDetail("upload");
        }}
      />
      <Box
        id={`box${project.id}`}
        key={project.id}
        sx={{ textAlign: "center" }}
      >
        {project.project_name}
      </Box>
    </Box>
  );
};

export default Project;
