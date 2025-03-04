import { FC } from "react";
import {
  CreatekeyPerformanceForm,
  CreatekeyPerformanceMain,
  CreatekeyPerformanceTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreatekeyPerformance: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    {
      title: "Key Performance Indicator Year /",
      path: siteRoutes.keyPerformanceIndicatorYearListing,
    },
    {
      title: "Add Key Performance Indicator Year",
      path: siteRoutes.createKeyPerformanceIndicatorYear,
    },
  ];

  return (
    <CreatekeyPerformanceMain>
      <CreatekeyPerformanceTop>
        <div className="heading">
          <span className="page-heading">
            Add Key Performance Indicator Year
          </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreatekeyPerformanceTop>

      <CreatekeyPerformanceForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Year</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Year</option>
                </select>
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
      </CreatekeyPerformanceForm>
    </CreatekeyPerformanceMain>
  );
};

export default CreatekeyPerformance;
