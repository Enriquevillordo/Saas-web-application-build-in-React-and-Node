import React from "react";
import { Box, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { folderActions } from "../../store/actions";

var updatedFolderName = "";
var targetId = 0;
var activeInput = false;

const Folder = ({ folder, renameFolder, deleteFolder, exploreFolder }) => {
  const [contextMenu, setContextMenu] = React.useState(null);
  const dispatch = useDispatch();

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null
    );
  };

  const handleRename = (e, id) => {
    e.stopPropagation();
    targetId = id;
    let box = document.getElementById(`box${id}`);
    updatedFolderName = box.innerText;

    let input = document.createElement("input");
    input.setAttribute("id", `input${id}`);
    input.value = box.innerText;
    input.style.width = "120px";
    input.addEventListener("change", (event) => {
      updatedFolderName = event.target.value;
      // setUpdatedFolderName(event.target.value);
    });

    box.innerHTML = "";
    box.appendChild(input);
    activeInput = true;

    setContextMenu(null);
  };

  const handleEnter = (event) => {
    if (event.keyCode == 13 && activeInput == true) {
      let box = document.getElementById(`box${targetId}`);
      box.innerHTML = updatedFolderName;
      activeInput = false;

      dispatch(
        folderActions.update({ id: targetId, folder_name: updatedFolderName })
      );
    }
  };

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setContextMenu(null);
    deleteFolder(id);
  };

  React.useState(() => {
    document.addEventListener("keydown", (event) => {
      handleEnter(event);
    });
  });

  return (
    <Box
      key={folder.id}
      mb={5}
      mr={5}
      onContextMenu={handleContextMenu}
      onClick={(event) => {
        exploreFolder(event, folder);
      }}
      sx={{ width: "120px", cursor: "pointer", textAlign: "center" }}
    >
      <Box
        component="img"
        width={"100px"}
        src="/assets/img/folderIcon.png"
        sx={{ mb: 3 }}
      />
      <Menu
        open={contextMenu !== null}
        onClose={() => setContextMenu(null)}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={(e) => handleRename(e, folder.id)}>Rename</MenuItem>
        <MenuItem onClick={(e) => handleDelete(e, folder.id)}>Delete</MenuItem>
      </Menu>
      <Box id={`box${folder.id}`} key={folder.id} sx={{ textAlign: "center" }}>
        {folder.folder_name}
      </Box>
    </Box>
  );
};

export default Folder;
