import { FC } from "react";
import {
  CreateLegalOrganizationForm,
  CreateLegalOrganizationMain,
  CreateLegalOrganizationTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLegalOrganization: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Document Organizations /",
      path: siteRoutes.legalFrameworkList,
    },
    {
      title: "Add Legal Document Organizations",
      path: siteRoutes.createLegalOrganization,
    },
  ];

  return (
    <CreateLegalOrganizationMain>
      <CreateLegalOrganizationTop>
        <div className="heading">
          <span className="page-heading">Add Legal Document Organizations</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLegalOrganizationTop>

      <CreateLegalOrganizationForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Name</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Organization Name" />
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
      </CreateLegalOrganizationForm>
    </CreateLegalOrganizationMain>
  );
};

export default CreateLegalOrganization;
