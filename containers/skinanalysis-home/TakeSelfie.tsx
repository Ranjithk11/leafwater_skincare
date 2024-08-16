"use client";
import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { Icon } from "@iconify/react";
import { Button, Card, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {
  useGetRecommnedSkinAttributesMutation,
  useGetSignedUploadUrlMutation,
  useGetUploadImageInfoMutation,
} from "@/redux/api/analysisApi";
import CameraUpload from "@/components/camera/CameraUpload";
import axios from "axios";
import { useSession } from "next-auth/react";
import LoadingComponent from "@/components/loaders/Loading";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/utils/routes";
import SelectInputFieldComponent from "@/components/form-felds/SelectInput";
import { skinTypes } from "@/utils/constants";
import { useForm } from "react-hook-form";
import ARCameraComponent from "../../components/camera/ARCamera";

const StyledTakeSelfie = styled(Container)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  paddingTop: 84,
  paddingLeft: 20,
  paddingRight: 20,
  paddingBottom: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.only("xs")]: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingTop: 55,
  },
  "& .MuiCardContent-root": {
    "& .MuiTypography-h4": {
      fontWeight: 700,
    },
    "& .MuiTypography-subtitle1": {
      fontWeight: 700,
      fontSize: 24,
    },
    "& .MuiTypography-subtitle2": {
      fontWeight: 500,
      fontSize: 20,
    },
    "& .MuiTypography-body1": {
      fontWeight: 400,
      fontSize: 14,
      color: theme.palette.text.secondary,
    },
  },
  "& .photo_wrapper": {
    width: "100%",
    position: "relative",
    height: "100%",
    border: `5px dotted ${theme.palette.grey[200]}`,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    "& .selfy_image": {
      overflow: "hidden",
      width: 280,
      height: 330,
      borderRadius: "10px",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      "& .camera_icon": {
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.common.white,
        borderRadius: "100%",
      },
      "& .errorInfo": {
        padding: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 0, 0, 0.6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTypography-body1": {
          color: theme.palette.common.white,
          marginTop: 10,
          fontSize: "12px",
          lineHeight: 1.5,
        },
        "& .MuiButton-outlined": {
          minWidth: 50,
          marginTop: 20,
        },
      },
      "& .successInfo": {
        padding: 10,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(70, 138, 11, 0.6)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "& .MuiTypography-body1": {
          color: theme.palette.common.white,
          marginTop: 10,
          fontSize: "12px",
          lineHeight: 1.5,
        },
        "& .MuiButton-outlined": {
          minWidth: 50,
          marginTop: 20,
        },
      },
    },
  },
  "& .MuiButton-root": {
    minWidth: 280,
  },
  "& .MuiDialogContent-root": {
    position: "relative",
    padding: 40,
  },
  svg: {
    color: theme.palette.grey[400],
  },
}));

const TakeSelfie = () => {
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [openCamera, setOpenCamera] = useState<boolean>(true);
  const [skinAttributeStatus, setSkinAttributeStatus] = useState<any>(null);
  const { control, getValues } = useForm({
    mode: "all",
  });
  const router = useRouter();

  const [getRecommnedSkinAttributes, { isLoading: isLoadingSkinAttributes }] =
    useGetRecommnedSkinAttributesMutation();

  const [
    getUploadImageInfo,
    { data: dataImageInfo, isLoading: isLoadingImageInfo },
  ] = useGetUploadImageInfoMutation();
  const [getSignedUploadUrl] = useGetSignedUploadUrlMutation();
  const { data: session, update } = useSession();
  useEffect(() => {}, []);

  const handleConvertBase64toJpeg = (
    base64String: string,
    filename: string
  ) => {
    if (base64String.startsWith("data:")) {
      var arr: any = base64String.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      var file = new File([u8arr], filename, { type: mime });
      return Promise.resolve(file);
    }
    return fetch(base64String)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mime }));
  };

  const handleCaptured = async (base64String: string) => {
    setOpenCamera(false);
    try {
      const getSignedUrl: any = await getSignedUploadUrl({
        fileName: `${Date.now()}.jpeg`,
        contentType: "image/jpeg",
        userId: session?.user?.id as string,
      });
      if (getSignedUrl?.data?.data) {
        const file = await handleConvertBase64toJpeg(
          base64String,
          getSignedUrl?.data?.data?.fileName
        );
        const axiosResponse = axios.put(getSignedUrl?.data?.data?.url, file, {
          headers: {
            "Content-Type": "image/jpeg",
          },
          onUploadProgress(progressEvent: any) {
            setIsImageUploading(true);
            const { loaded, total } = progressEvent;
            if (total) {
              let percent = Math.floor((loaded * 100) / total);
              if (percent <= 100) {
                console.log(percent);
              }
            }
          },
        });
        const _res = await axiosResponse;
        if (_res) {
          setIsImageUploading(false);
          update({
            ...session,
            user: {
              ...session?.user,
              selfyImage: _res?.config?.data?.name,
              selfyImagePath: _res?.config?.url,
            },
          });
        }
      }
    } catch (error) {}
  };

  const handleSkinAnalysis = () => {
    const formValues = getValues();
    getRecommnedSkinAttributes({
      userId: session?.user?.id as string,
      fileName: session?.user?.selfyImage as string,
      skinType: formValues?.skinType as string,
    })
      .then((response: any) => {
        if (response?.error?.data?.error) {
          setSkinAttributeStatus({
            type: "ERROR",
            message: response?.error?.data?.error,
          });
        } else {
          update({
            ...session,
            user: {
              ...session?.user,
              skinTypes: formValues?.skinType?.replace("_", " "),
            },
          });
          setSkinAttributeStatus({
            type: "SUCCESS",
            message: response?.data?.message,
          });
        }
      })
      .catch((error) => {});
  };

  const handleGetSkinRecommendations = () => {
    router.push(APP_ROUTES.RECOMMENDATIONS);
  };

  useEffect(() => {
    if (session?.user?.selfyImage) {
      getUploadImageInfo({
        fileName: session?.user?.selfyImage as string,
        userId: session?.user?.id as string,
      });
    }
  }, [session?.user?.selfyImage]);

  return (
    <StyledTakeSelfie disableGutters maxWidth="xl">
      {!openCamera && (
        <Box component="div" className="photo_wrapper">
          {(isImageUploading ||
            (isLoadingImageInfo && !dataImageInfo?.data?.url)) && (
            <LoadingComponent />
          )}
          {!isImageUploading &&
            !isLoadingImageInfo &&
            dataImageInfo?.data?.url && (
              <Fragment>
                <Box
                  sx={{ backgroundImage: `url(${dataImageInfo?.data?.url})` }}
                  component="div"
                  className="selfy_image"
                >
                  <Card component="div" className="camera_icon">
                    <IconButton
                      onClick={() => {
                        setSkinAttributeStatus(null);
                        setOpenCamera(true);
                      }}
                      color="primary"
                    >
                      <Icon width={20} icon="bxs:camera" />
                    </IconButton>
                  </Card>
                  {skinAttributeStatus?.type === "ERROR" && (
                    <Box component="div" className="errorInfo">
                      <Icon width={55} color="white" icon="bx:error" />
                      <Typography variant="body1" textAlign="center">
                        {skinAttributeStatus?.message}
                      </Typography>
                      <Button
                        size="small"
                        color="milkWhite"
                        variant="outlined"
                        sx={{ minWidth: 50 }}
                        fullWidth={false}
                        onClick={() => setSkinAttributeStatus(null)}
                      >
                        Ok
                      </Button>
                    </Box>
                  )}
                  {skinAttributeStatus?.type === "SUCCESS" && (
                    <Box component="div" className="successInfo">
                      <Icon
                        width={55}
                        color="white"
                        icon="clarity:success-standard-line"
                      />
                      <Typography variant="body1" textAlign="center">
                        {skinAttributeStatus?.message}
                      </Typography>
                      <Button
                        size="small"
                        color="milkWhite"
                        variant="outlined"
                        sx={{ minWidth: 50 }}
                        fullWidth={false}
                        onClick={() => setSkinAttributeStatus(null)}
                      >
                        Ok
                      </Button>
                    </Box>
                  )}
                </Box>
                {!isLoadingSkinAttributes && (
                  <Box mt={3}>
                    <Box mb={2}>
                      <SelectInputFieldComponent
                        id="skintype"
                        name="skinType"
                        displayLabelName="name"
                        targetValue="_id"
                        control={control}
                        defaultValue="NORMAL_SKIN"
                        label=""
                        options={skinTypes}
                      />
                    </Box>
                    <Button
                      color={
                        skinAttributeStatus?.type === "SUCCESS"
                          ? "primary"
                          : "secondary"
                      }
                      onClick={() => {
                        if (skinAttributeStatus?.type === "SUCCESS") {
                          handleGetSkinRecommendations();
                        } else {
                          handleSkinAnalysis();
                        }
                      }}
                    >
                      {skinAttributeStatus?.type === "SUCCESS"
                        ? "Get Our Recommendations"
                        : "Start Skin Analysis"}
                    </Button>
                  </Box>
                )}
              </Fragment>
            )}
          {!isImageUploading &&
            !isLoadingImageInfo &&
            !dataImageInfo?.data?.url && (
              <Fragment>
                <IconButton
                  onClick={() => {
                    setOpenCamera(true);
                  }}
                >
                  <Icon width={100} icon="bxs:camera" />
                </IconButton>
                <Typography textAlign="center">
                  Click camera icon and take selfie
                </Typography>
              </Fragment>
            )}

          {isLoadingSkinAttributes && (
            <div className="ocrloader">
              <p>Analysing...</p>
              <em></em>
              <span></span>
            </div>
          )}
        </Box>
      )}
      {openCamera && (
        <ARCameraComponent
          disabledSkipBtn={!dataImageInfo}
          onSkip={() => {
            setOpenCamera(!openCamera);
          }}
          onCaptured={handleCaptured}
        />
      )}
    </StyledTakeSelfie>
  );
};

export default TakeSelfie;
