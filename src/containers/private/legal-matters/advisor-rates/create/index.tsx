import { FC } from "react";
import {
  CreateAdvisorRatesForm,
  CreateAdvisorRatesMain,
  CreateAdvisorRatesTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateAdvisorRates: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Advisors Rates /",
      path: siteRoutes.advisorRatesListing,
    },
    {
      title: "Add Advisors Rates",
      path: siteRoutes.createAdvisorRates,
    },
  ];

  return (
    <CreateAdvisorRatesMain>
      <CreateAdvisorRatesTop>
        <div className="heading">
          <span className="page-heading">Add Advisors Rates</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateAdvisorRatesTop>

      <CreateAdvisorRatesForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Rate</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Year</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Category</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Category</option>
                </select>
              </div>
            </div>
          </div>

          <div className="radio-field">
            <label>Is Active</label>
            <div className="field-wrap">
              <div className="field">
                <input type="radio" id="active" />
                <label htmlFor="active">Active</label>
              </div>
              <div className="field">
                <input type="radio" id="deactivate" />
                <label htmlFor="deactivate">Deactivate</label>
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
      </CreateAdvisorRatesForm>
    </CreateAdvisorRatesMain>
  );
};

export default CreateAdvisorRates;
