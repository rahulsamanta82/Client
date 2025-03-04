import Breadcrumb, { BreadcrumbLink } from "components/particles/breadcrumb";
import { FC, useEffect, useState } from "react";
import {
  CreateFeeTypeSection,
  CreateFeeTypeMain,
  CreateFeeTypeTop,
} from "./style";
import {
  CreateAdmissionQuotaDTO,
  DynamicField,
} from "utils/helpers/models/admissions/create-quota.dto";
import { useForm } from "react-hook-form";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useAdmissions from "containers/private/admissions/useHooks";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { BreadCrumbLink } from "components/particles/breadcrumb/style";

export const CreateFeeType: FC = () => {
  const breadcrumbLinks: BreadcrumbLink[] = [
    { title: "Academics / ", path: siteRoutes.academicSessionListing },
    { title: "Fee Types /", path: siteRoutes.academicFeeTypeListing },
    { title: "Add Fee Types", path: siteRoutes.createAcademicFeeType },
  ];

  return (
    <CreateFeeTypeMain>
      <CreateFeeTypeTop>
        <div className="left">
          <span className="page-heading"> Add Fee Type</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateFeeTypeTop>

      <CreateFeeTypeSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Fee Type Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" id="" />
              </div>
            </div>
          </div>
        </div>
        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>

            <button className="lg-rounded-btn black">Save & Add more</button>

            <button className="lg-rounded-btn">& Exit</button>
          </div>
        </div>
      </CreateFeeTypeSection>
    </CreateFeeTypeMain>
  );
};

export default CreateFeeType;
