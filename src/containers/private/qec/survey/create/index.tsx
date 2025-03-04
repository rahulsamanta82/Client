import { ChangeEvent, FC, useEffect, useState } from "react";
import { CreateSurveyMain, Form, TopSection } from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import profileLogo from "assets/images/organization/others/profile-logo.png";
import Editor from "components/particles/forms/editor";
import { useForm } from "react-hook-form";
import { AddOrganizationDTO } from "utils/helpers/models/organization/add-organization.dto";
import FormErrorMessage from "components/particles/forms/form-error-message";
import useUtils from "hooks/useUtils";
import useOrganization from "../../../organization/useHooks";
import { warningToaster } from "utils/helpers/common/alert-service";
import { warningMessages } from "utils/helpers/enums/messages.enum";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateSurvey: FC = () => {
  const { getQueryParams } = useUtils();
  let [formData, setFormData] = useState<AddOrganizationDTO>(
    new AddOrganizationDTO()
  );

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Survey Listing /", path: siteRoutes.surveyListing },
    { title: "Generate New Survey", path: siteRoutes.createSurvey },
  ];
  return (
    <CreateSurveyMain>
      <TopSection>
        <span className="page-heading">Generate New Survey</span>
        <Breadcrumb links={breadcrumbLinks} />
      </TopSection>
      <Form className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Select Survey Type</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Survey Type</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Select Academic Session</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Academic Session</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Select Course</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Course</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Start Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Expiry Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </Form>
    </CreateSurveyMain>
  );
};

export default CreateSurvey;
