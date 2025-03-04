import { FC, useState } from "react";
import {
  CreateMatterTypesTop,
  CreateMatterTypesSection,
  CreateMatterTypesMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateMatterTypes: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Matter Types /", path: siteRoutes.legalMatterTypeListing },
    { title: "Add Matter Types", path: siteRoutes.createLegalMatterType },
  ];
  return (
    <CreateMatterTypesMain>
      <CreateMatterTypesTop>
        <div className="heading">
          <span className="page-heading">Add Matter Types</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateMatterTypesTop>

      <CreateMatterTypesSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Title </label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label>Parent Category</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">Select Parent Category</option>
                </select>
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
      </CreateMatterTypesSection>
    </CreateMatterTypesMain>
  );
};

export default CreateMatterTypes;
