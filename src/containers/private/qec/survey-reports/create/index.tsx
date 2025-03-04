import { FC } from "react";
import {
  CreateSurveyReportForm,
  CreateSurveyReportMain,
  CreateSurveyReportTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateSurveyReport: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: " All Survey Reports / ", path: siteRoutes.qecSurveyReportlist },
    { title: "Generate Report", path: siteRoutes.createQecSurveyReport },
  ];

  return (
    <CreateSurveyReportMain>
      <CreateSurveyReportTop>
        <div className="heading">
          <span className="page-heading">Generate Report</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateSurveyReportTop>

      <CreateSurveyReportForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Select Database</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Database</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Survey Type</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Survey Type</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Year</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Year</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Term</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Semester Term</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Semester</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option value="">Select Semester</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Created Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Expire Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
        </div>

        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </CreateSurveyReportForm>
    </CreateSurveyReportMain>
  );
};

export default CreateSurveyReport;
