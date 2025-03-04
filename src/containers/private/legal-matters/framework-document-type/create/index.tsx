import { FC } from "react";
import {
  CreateFrameworkDocumentTypeForm,
  CreateFrameworkDocumentTypeMain,
  CreateFrameworkDocumentTypeTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateFrameworkDocumentType: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    {
      title: "Legal Framework Documents Types /",
      path: siteRoutes.frameworkDocumentTypeList,
    },
    {
      title: "Add Legal Framework Documents Types",
      path: siteRoutes.createFrameworkDocumentType,
    },
  ];

  return (
    <CreateFrameworkDocumentTypeMain>
      <CreateFrameworkDocumentTypeTop>
        <div className="heading">
          <span className="page-heading">
            Add Legal Framework Documents Types
          </span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateFrameworkDocumentTypeTop>

      <CreateFrameworkDocumentTypeForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Name</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="Enter Legal Framework Documents Types"
                />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Organization</label>
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
      </CreateFrameworkDocumentTypeForm>
    </CreateFrameworkDocumentTypeMain>
  );
};

export default CreateFrameworkDocumentType;
