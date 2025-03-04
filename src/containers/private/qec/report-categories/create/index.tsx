import { FC, useEffect, useState } from "react";
import {
    CreateReportCategoriesForm,
  CreateReportCategoriesMain,
  CreateReportCategoriesTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useAdmissions from "../../../admissions/useHooks";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

interface EditAdmissionDocumentProps {}

const CreateReportCategories: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "QEC /", path: "" },
    { title: "Add Report Category ", path: siteRoutes.createreportCategories },
  ];

  return (
    <CreateReportCategoriesMain>
      <CreateReportCategoriesTop>
        <div className="heading">
          <span className="page-heading">Add Report Category</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateReportCategoriesTop>

      <CreateReportCategoriesForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
              <input type="text" placeholder="Type Title Here" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Description</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Type Description Here" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Show Preview</label>
            <div className="field-wrap">
            <div className="field">
                  <select>
                    <option value="">Select Preview</option>
                  </select>
                </div>
            </div>
          </div>
          <div className="input-field">
              <label>Order By</label>
              <div className="field-wrap">
                <div className="field">
                  <select>
                    <option value="">Select Order</option>
                  </select>
                </div>
              </div>
            </div>

          <div className="radio-field">
            <label>Is Active</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
              </div>
            </div>
          </div>
        </div>

        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray" type="button">
              Reset
            </button>
            <button className="lg-rounded-btn" type="submit">Submit</button>
          </div>
        </div>
      </CreateReportCategoriesForm>
    </CreateReportCategoriesMain>
  );
};

export default CreateReportCategories;
