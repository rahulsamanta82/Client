import { FC } from "react";
import {
  CreateProjectTimeForm,
  CreateProjectTimeMain,
  CreateProjectTimeTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateProjectTime: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Project Dates /", path: siteRoutes.oricProjectDateListing },
    { title: "Add Project Date", path: siteRoutes.createOricProjectDate },
  ];

  return (
    <CreateProjectTimeMain>
      <CreateProjectTimeTop>
        <div className="heading">
          <span className="page-heading">Add Project Date</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateProjectTimeTop>

      <CreateProjectTimeForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Title" />
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
      </CreateProjectTimeForm>
    </CreateProjectTimeMain>
  );
};

export default CreateProjectTime;
