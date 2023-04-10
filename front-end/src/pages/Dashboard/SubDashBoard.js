import * as React from "react";
import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import {
  Alert,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Menu, MenuItem, Divider } from "react-desktop-menus";
import { useDispatch, useSelector } from "react-redux";
import { folderActions, projectActions } from "../../store/actions";
import Folder from "./Folder";
import Project from "./Project";
import config from "config";

export default function FullWidthTabs() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [folderName, setFolderName] = React.useState("");
  const [isDetail, setIsDetail] = React.useState("folder");
  const [selectedFolder, setSelectedFolder] = React.useState();
  const folders = useSelector((state) => state.folder.folders);
  const projects = useSelector((state) => state.project.projects);
  const [points, setPoints] = React.useState({
    x: 0,
    y: 0,
  });
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState();
  const [uploadError, setUploadError] = useState();

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          // <Box sx={{ p: 5 }}>
          //   <Typography id="folder" sx={{display: "flex", flexDirection: "row"}}>{children}</Typography>
          // </Box>
          <Box id="folder" sx={{ display: "flex", flexDirection: "row", p: 5 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  const createNewFolder = () => {
    if (folderName.length == 0) {
      setIsError(true);
      setErrorMessage("A Folder name can' t be empty.");
    } else {
      dispatch(
        folderActions.create({
          folder_name: folderName,
          user_id: JSON.parse(localStorage.user).user.id,
        })
      );
      handleCloseModal();
    }
  };
  const createNewProject = () => {
    if (folderName.length == 0) {
      setIsError(true);
      setErrorMessage("A project name can' t be empty.");
    } else {
      dispatch(
        projectActions.create({
          folder_id: selectedFolder.id,
          project_name: folderName,
          user_id: JSON.parse(localStorage.user).user.id,
          video_file_path: "-",
          subtitle_file_path: "-",
        })
      );
      setOpenModal(false);
    }
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }

  const handleTextFieldChange = (event, newValue) => {
    setFolderName(event.target.value);
    if (event.target.value.length == 0) {
      setIsError(true);
      setErrorMessage("A project name can' t be empty.");
    } else {
      setIsError(false);
      setErrorMessage("");
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsError(false);
    setFolderName("");
    setErrorMessage("");
  };

  const deleteFolder = (id) => {
    dispatch(folderActions.remove(id));
    // setFolders(newFolder);
  };

  const renameFolder = (id, folderName) => {
    dispatch(folderActions.update({ id, folder_name: folderName }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const exploreFolder = (event, folder) => {
    setSelectedFolder(folder);
    dispatch(
      projectActions.getByUserIdAndFolderId(
        JSON.parse(localStorage.user).user.id,
        folder.id
      )
    );
    setIsDetail("project");
  };
  const handleUploadClick = (e) => {
    let temp = [];
    [...e.target.files].forEach((file) => {
      var reader = new FileReader();
      reader.onload = function (evt) {
        temp.push({ name: file.name, data: evt.target.result });
        if (temp.length === e.target.files.length)
          setFiles([...files, ...temp]);
      };
      reader.readAsDataURL(file);
    });
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let formats = [
      ".MOV",
      ".MPEG4",
      ".MP4",
      ".MPG",
      ".AVI",
      ".WMV",
      ".MPEGPS",
      ".FLV",
    ];
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (
        formats &&
        [...e.dataTransfer.files].some(
          (file) =>
            !formats.some((format) =>
              file.name.toLowerCase().endsWith(format.toLowerCase())
            )
        )
      ) {
        toast.error(
          `Only following file formats are acceptable: ${formats.join(", ")}`
        );
        return;
      }
      let temp = [];
      let length = e.dataTransfer.files.length;
      [...e.dataTransfer.files].forEach((file) => {
        var reader = new FileReader();
        reader.onload = function (evt) {
          temp.push({ name: file.name, data: evt.target.result });
          if (temp.length === length) {
            setFiles([...files, ...temp]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  function uploadVideoToBackend() {
    console.log(files);
    var formData = new FormData();
    formData.append("file", files[0]);

    console.log(formData.get("file"), "--------file-------------");
    const axiosInstance = axios.create({
      baseURL: `${config.apiUrl}`,
    });

    console.log(JSON.stringify(formData));
    axiosInstance
      .post("/projects/uploadVideo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // "Content-Type": "application/json",
        },
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
      })
      .catch((error) => {
        const { code } = error?.response?.data;
        switch (code) {
          case "FILE_MISSING":
            setUploadError("Please select a file before uploading!");
            break;
          default:
            setUploadError(
              "Sorry! Something went wrong. Please try again later"
            );
            break;
        }
      });
  }

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };

  function LinearWithValueLabel({ now, label }) {
    // const [progress, setProgress] = React.useState(0);

    // React.useEffect(() => {
    //   const timer = setInterval(() => {
    //     setProgress((prevProgress) =>
    //       prevProgress >= 100 ? 10 : prevProgress + 10
    //     );
    //   }, 800);
    //   return () => {
    //     clearInterval(timer);
    //   };
    // }, []);

    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgressWithLabel value={now} />
      </Box>
    );
  }

  React.useEffect(() => {
    dispatch(folderActions.getByUserId(JSON.parse(localStorage.user).user.id));
  }, []);

  React.useEffect(() => {
    console.log(isDetail);
  }, [isDetail]);

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar
        position="static"
        sx={{
          dipslay: "flex",
          flexDirection: "row",
          background: "white",
          boxShadow: "none",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          aria-label="tabs example"
          sx={{
            "& .MuiTabs-scroller .MuiTabs-indicator": {
              background: "transparent",
            },
          }}
        >
          <Tab
            label="All Projects"
            {...a11yProps(0)}
            sx={{ background: "#dde1d5", color: "black", "&.Mui-selected": {} }}
          />
          {/* <Tab label="Item Two" {...a11yProps(1)} sx={{color: "black"}}/>
          <Tab label="Item Three" {...a11yProps(2)} sx={{color: "black"}}/> */}
        </Tabs>
        <Box sx={{ my: "auto", pl: 4, color: "black" }}>
          <Box
            component="img"
            width={"100%"}
            src="/assets/img/createNewFolderIcon.png"
            sx={{ cursor: "pointer" }}
            onClick={handleOpenModal}
          />
        </Box>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel id="tab_panel" value={value} index={0} dir={theme.direction}>
          {isDetail === "folder" ? (
            folders && folders?.length ? (
              folders.map((folder, index) => (
                <Folder
                  folder={folder}
                  renameFolder={renameFolder}
                  deleteFolder={deleteFolder}
                  exploreFolder={exploreFolder}
                  key={index}
                />
              ))
            ) : (
              <></>
            )
          ) : isDetail === "upload" ? (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                mb={2}
              >
                <Typography variant="h5">Upload your Video</Typography>
                <Button
                  variant="contained"
                  color={"warning"}
                  component="label"
                  onClick={uploadVideoToBackend}
                >
                  Upload your file
                </Button>
                {uploadError && <Alert variant="danger">{uploadError}</Alert>}
                {!uploadError && progress && (
                  <LinearWithValueLabel now={progress} label={`${progress}%`} />
                )}
              </Box>
              <Box
                sx={{
                  height: "calc( 100vh - 250px)",
                  overflow: "auto",
                  border: "dashed 4px grey",
                  borderRadius: "30px",
                  display: "flex",
                  justifyContent: "center",
                  mx: "auto",
                }}
                onDrop={handleDrop}
                onDragOver={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                {files.length > 0 ? (
                  <video controls>
                    <source
                      type="video/mp4"
                      src={files[files.length - 1].data}
                    />
                  </video>
                ) : (
                  <Box
                    textAlign="center"
                    display={"flex"}
                    flexDirection={"column"}
                    width={"100%"}
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {/* <Typography variant="h6">Upload your video here (drag and drop) or </Typography> */}
                    <label htmlFor="contained-button-file">
                      <input
                        accept="video/*"
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleUploadClick}
                      />
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        Drag & drop files here
                      </Typography>
                      <Typography variant="span" sx={{ color: "gray" }}>
                        Supported file formats: .mp4, .mov, .avi, .flv, .webm
                        <br />
                        (Max File Upload Size: 30 GB)
                      </Typography>
                    </label>
                  </Box>
                )}
              </Box>
            </Box>
          ) : projects ? (
            projects.map((project) => {
              return (
                <Project
                  key={project.id}
                  folder={selectedFolder}
                  project={project}
                  setIsDetail={setIsDetail}
                />
              );
            })
          ) : (
            <></>
          )}
        </TabPanel>
        {/* <TabPanel value={value} index={1} dir={theme.direction}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Item Three
        </TabPanel> */}
      </SwipeableViews>

      {
        // <Menu
        // open={contextMenu !== null}
        // onClose={closeContextMenu}
        // anchorReference="anchorPosition"
        // anchorPosition={
        //   contextMenu !== null
        //     ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
        //     : undefined
        // }
        // keyboard>
        //   <MenuItem label="Rename"/>
        //   <MenuItem label="Delete"/>
        // </Menu>
      }

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {isDetail === "folder"
            ? "Create a new folder"
            : "Create a new project"}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To suplease enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            onChange={handleTextFieldChange}
            error={isError}
            margin="dense"
            id="project_name"
            label={isDetail === "folder" ? "Folder Name" : "Project Name"}
            type="text"
            fullWidth
            variant="standard"
            helperText={errorMessage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            onClick={isDetail === "folder" ? createNewFolder : createNewProject}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
