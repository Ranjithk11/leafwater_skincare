"use client";
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useForm } from "react-hook-form";
import RadioGroupSelectionComponent from "@/components/form-felds/RadioGropSelection";
import { useRouter } from "next/navigation";
import { useLazyGetQuestionsQuery } from "@/redux/api/analysisApi";
import { saveOnboardingQuestions } from "@/redux/reducers/analysisSlice";
import { useDispatch } from "react-redux";
import { APP_ROUTES } from "@/utils/routes";
import LoadingComponent from "@/components/loaders/Loading";
import TextInputFieldComponent from "@/components/form-felds/textInputField";
import FormMobileInput from "@/components/form-felds/phoneInput";
import { matchIsValidTel } from "mui-tel-input";
import CheckBoxControlGroup from "@/components/form-felds/checkBoxGroup";
import { isValidateEmail } from "@/utils/func";
import { signIn } from "next-auth/react";
import { isArray } from "lodash";

const StyledAnalysisFormWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.only("xs")]: {
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  "& .__question_view": {
    width: 450,
    "& .MuiTypography-h4": {
      fontSize: 25,
      fontWeight: 800,
      marginBottom: 20,
    },
    [theme.breakpoints.only("xs")]: {
      width: 320,
      paddingLeft: 20,
      paddingRight: 20,
      "& .MuiTypography-h4": {
        fontSize: 22,
        fontWeight: 800,
        marginBottom: 10,
      },
    },
  },
}));

const AnalysisForm = () => {
  const dispatch = useDispatch();
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [getQuestions, { isLoading, data, isError, isSuccess }] =
    useLazyGetQuestionsQuery();
  const { control, handleSubmit, getValues } = useForm({
    mode: "onSubmit",
  });
  const [qusIndex, setQusIndex] = useState<number>(0);
  const router = useRouter();

  const onSumit = async (formDatadata: any) => {
    dispatch(saveOnboardingQuestions(formDatadata));
    if (data?.data) {
      if (qusIndex === data?.data?.length - 1) {
        let answeredQuestions: any[] = [];
        const { email, name, phoneNumber, ...rest } = formDatadata;
        if (rest) {
          for (const [key, value] of Object.entries(rest)) {
            answeredQuestions.push({
              questionId: key,
              responseId: isArray(value) ? [...value] : [value],
            });
          }
        }

        const authResponse = await signIn("credentials", {
          phoneNumber: phoneNumber,
          name: name,
          email: email,
          onBoardingQuestions: JSON.stringify(answeredQuestions),
          redirect: false,
        });
        if (authResponse?.error) {
          alert("Something went wrong please try again");
          setIsSubmit(false);
        } else {
          setIsSubmit(false);
          router.replace(APP_ROUTES.SELFIE);
        }
      } else {
        setQusIndex(qusIndex + 1);
      }
    }
  };
  const handleBack = () => {
    if (qusIndex === 0) {
      router.push("/");
    } else {
      if (!isSubmit) {
        setQusIndex(qusIndex - 1);
      }
    }
  };

  useEffect(() => {
    getQuestions({});
  }, []);

  const handleMultiSelection = (checkedId: any, fieldName: string) => {
    const { [`${fieldName}`]: ids } = getValues();
    const newIds = ids?.includes(checkedId)
      ? ids?.filter((id: any) => id !== checkedId)
      : [...(ids ?? []), checkedId];
    return newIds;
  };

  return (
    <StyledAnalysisFormWrapper>
      <Box component="div" className="__question_view">
        {isLoading && !isError && !data && <LoadingComponent />}
        {!isLoading && !isError && data && (
          <Grid container spacing={2}>
            {data?.data.map((question: any, index: number) => (
              <Fragment key={index}>
                {index === qusIndex && (
                  <Fragment>
                    <Grid item xs={12}>
                      <Typography
                        fontWeight={600}
                        variant="h4"
                        textAlign="center"
                      >
                        {question?.value}
                      </Typography>
                    </Grid>
                    {question?.responseType === "SINGLE_SELECTION" && (
                      <Grid item xs={12}>
                        <RadioGroupSelectionComponent
                          control={control}
                          key={question._id}
                          rules={{
                            required: "This is a required field",
                          }}
                          defaultValues={""}
                          name={question._id}
                          id={question._id}
                          targetValue="_id"
                          labelName="value"
                          gridProps={{
                            direction: "row",
                            spacing: 1,
                          }}
                          gridItemProps={{
                            xs: 12,
                          }}
                          varient="CHECK_BOX_BUTTON"
                          options={question?.options}
                        />
                      </Grid>
                    )}
                    {question?.responseType === "MULTI_SELECTION" && (
                      <Grid item xs={12}>
                        <CheckBoxControlGroup
                          gridProps={{
                            direction: "row",
                            spacing: 1,
                          }}
                          gridItemProps={{
                            xs: 12,
                          }}
                          control={control}
                          options={question?.options}
                          key={question._id}
                          rules={{
                            required: "This is a required field",
                          }}
                          defaultValues={[]}
                          name={question._id}
                          id={question._id}
                          onChange={(checkedValue, fieldName) => {
                            return handleMultiSelection(
                              checkedValue,
                              fieldName
                            );
                          }}
                          labelName="value"
                        />
                      </Grid>
                    )}
                    {question?.responseType === "LOGIN" && (
                      <Fragment>
                        <Grid item xs={12}>
                          <TextInputFieldComponent
                            name="name"
                            control={control}
                            id="name"
                            label=""
                            textFieldProps={{
                              fullWidth: true,
                              placeholder: "Enter name",
                            }}
                            defaultValue=""
                            rules={{
                              required: "This is a required field",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextInputFieldComponent
                            name="email"
                            control={control}
                            id="email"
                            label=""
                            textFieldProps={{
                              fullWidth: true,
                              placeholder: "Enter email address",
                            }}
                            defaultValue=""
                            rules={{
                              required: "This is a required field",
                              validate: isValidateEmail,
                            }}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <FormMobileInput
                            name="phoneNumber"
                            size="medium"
                            rules={{
                              required: "This is a required field",
                              validate: matchIsValidTel,
                            }}
                            control={control}
                            defaultValue=""
                            id="form-phone-input"
                          />
                        </Grid>
                      </Fragment>
                    )}
                  </Fragment>
                )}
              </Fragment>
            ))}
            <Grid item xs={12}></Grid>
            <Grid container spacing={3} item xs={12}>
              <Grid item xs={6}>
                <Button
                  onClick={handleBack}
                  startIcon={<KeyboardDoubleArrowLeftIcon />}
                  variant="contained"
                  color="secondary"
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={isSubmit}
                  onClick={handleSubmit(onSumit)}
                  endIcon={<KeyboardDoubleArrowRightIcon />}
                  variant="contained"
                  color="primary"
                >
                  {qusIndex === data?.data?.length - 1 ? "Submit" : "Next"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Box>
    </StyledAnalysisFormWrapper>
  );
};

export default AnalysisForm;
