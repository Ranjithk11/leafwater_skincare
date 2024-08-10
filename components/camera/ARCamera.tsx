import React, { useRef, useState } from "react";
import {
  camera,
  faceDetectionAdapter,
  loadFaceDetectorModels,
} from "@biopassid/face-sdk";
import { arCameraOptions } from "./config";
import Button from "@mui/material/Button";
import { Box, Grid, Typography, styled } from "@mui/material";
import { APP_BAR_SIZE } from "@/utils/constants";
import { Icon } from "@iconify/react";

const StyledARCameraComponent = styled(Box)(({ theme }) => ({
  height: `calc(100vh - ${APP_BAR_SIZE}px)`,
  width: "60%",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  [theme.breakpoints.only("xs")]: {
    padding: 0,
    width: "100%",
  },
  "& .camera_wrapper": {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    "& .ar_camera": {
      flex: 1,
      position: "relative",
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 20,
      [theme.breakpoints.only("xs")]: {
        borderRadius: 0,
      },
      overflow: "hidden",
      "& .info_view": {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTypography-body1": {
          color: theme.palette.common.white,
          fontSize: 18,
          width: "55%",
          lineHeight: 1.3,
          textAlign: "center",
          [theme.breakpoints.only("xs")]: {
            fontSize: 18,
            width: "95%",
          },
        },
        "& svg": {
          fontSize: 120,
          [theme.breakpoints.only("xs")]: {
            fontSize: 100,
          },
        },
      },
      "& .camaera_view": {
        width: "100%",
        height: "100%",
      },
    },
    "& .footer": {
      minHeight: 50,
      padding: 20,
      display: "flex",
      justifyContent: "center",
      [theme.breakpoints.only("xs")]: {
        padding: 10,
      },
      alignItems: "center",
      "& .MuiButtonBase-root": {
        // width: 175,
        minWidth: 0,
        // [theme.breakpoints.only("xs")]: {
        //   width: 100,
        // },
      },
    },
  },
}));

interface ARCameraComponentProps {
  onCaptured: (file: any) => void;
  onSkip: () => void;
  disabledSkipBtn?: boolean;
}

const ARCameraComponent = ({
  onCaptured,
  onSkip,
  disabledSkipBtn,
}: ARCameraComponentProps) => {
  const { takePicture } = camera();
  const [isCamOpen, setIsCamOpen] = useState<boolean>(false);
  const refAccessFiles = useRef<HTMLInputElement>(null);

  async function handleTakePicture() {
    setIsCamOpen(true);
    await loadFaceDetectorModels();
    try {
      const resp = await takePicture({
        element: document.querySelector("#elementId") as HTMLDivElement,
        faceDetectionAdapter: faceDetectionAdapter,
        options: arCameraOptions,
      });
      onCaptured(resp?.base64);
      setIsCamOpen(false);
    } catch (error) {
      setIsCamOpen(false);
    }
  }

  const handleUploadFiles = async (event: any) => {
    let file = event?.target?.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      onCaptured(reader.result);
    };
    reader.onerror = function (error) {
      alert("Something wrong please try again...");
    };
  };

  return (
    <StyledARCameraComponent>
      <Box component="div" className="camera_wrapper">
        <Box component="div" className="ar_camera">
          {!isCamOpen && (
            <Box component="div" className="info_view">
              <Box mb={2}>
                <Icon icon="tabler:camera-selfie" />
              </Box>
              <Typography variant="body1">
                Please, set your desired configurations and press the Capture
                button to start
              </Typography>
            </Box>
          )}
          {isCamOpen && (
            <Box component="div" id="elementId" className="camaera_view"></Box>
          )}
        </Box>
        <Box component="div" className="footer">
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={4}>
              <Button
                fullWidth={true}
                variant="outlined"
                onClick={() => {
                  if (isCamOpen) {
                    return null;
                  } else {
                    refAccessFiles?.current?.click();
                  }
                }}
              >
                Gallery
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                fullWidth={true}
                disabled={isCamOpen}
                onClick={handleTakePicture}
              >
                Capture
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                color="inherit"
                disabled={disabledSkipBtn}
                fullWidth={true}
                onClick={()=>{
                  if (isCamOpen) {
                    return null;
                  } else {
                    onSkip()
                  }
                }}
              >
                Skip
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <input
        ref={refAccessFiles}
        type="file"
        accept="image/*"
        hidden
        onChange={handleUploadFiles}
      />
    </StyledARCameraComponent>
  );
};

export default ARCameraComponent;
