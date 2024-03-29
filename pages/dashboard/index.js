import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "./defaultLayout";
import TableOne from "@/components/Tables/TableOne";

const SignIn=() => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Day trading" />
        <TableOne/>  
      
    </DefaultLayout>
  );
};

export default SignIn;
