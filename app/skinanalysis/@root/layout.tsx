"use client";
import React, { Fragment } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import _ from "lodash";
import { analysisSlots } from "@/utils/constants";
import HomeLayout from "@/components/layouts/HomeLayout";

const AnalysisRootlayout = ({ children }: { children: React.ReactNode }) => {
  const currentSegment = useSelectedLayoutSegment();
  const isMatched = _.find(
    analysisSlots,
    (slot: string) => currentSegment === slot
  );
  if (isMatched) {
    return <HomeLayout>{children}</HomeLayout>;
  } else {
    return <Fragment>{children}</Fragment>;
  }
};

export default AnalysisRootlayout;
