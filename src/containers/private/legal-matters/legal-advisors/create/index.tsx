import { FC, useState } from "react";
import {
  CreateLegalAdvisorsTop,
  CreateLegalAdvisorsSection,
  CreateLegalAdvisorsMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLegalAdvisors: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Legal Advisors /", path: siteRoutes.legalAdvisorListing },
    { title: "Add Legal Advisor", path: siteRoutes.createLegalAdvisor },
  ];
  return (
    <CreateLegalAdvisorsMain>
      <CreateLegalAdvisorsTop>
        <div className="heading">
          <span className="page-heading">Add Legal Advisors</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLegalAdvisorsTop>

      <CreateLegalAdvisorsSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Name </label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Designation</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Type</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">select Type</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Category</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value="">select Category</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>CNIC</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>LIcense No.</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Mobile</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Email</label>
            <div className="field-wrap">
              <div className="field">
                <input type="email" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Adress</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Date of Comencement of contract</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label>Ending Date Of Contract</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label>Status</label>
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
      </CreateLegalAdvisorsSection>
    </CreateLegalAdvisorsMain>
  );
};

export default CreateLegalAdvisors;
