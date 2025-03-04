import { FC, useState } from "react";
import {
  CreateLegalCasesTop,
  CreateLegalCasesSection,
  CreateLegalCasesMain,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLegalCases: FC = () => {
  const breadcrumbLinks = [
    { title: "Manage Legal Matters /", path: "" },
    { title: "Legal Cases /", path: siteRoutes.legalCasesList },
    { title: "Add Legal Cases", path: siteRoutes.createLegalCases },
  ];
  return (
    <CreateLegalCasesMain>
      <CreateLegalCasesTop>
        <div className="heading">
          <span className="page-heading">Add Legal Casses</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLegalCasesTop>

      <CreateLegalCasesSection className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label>Court </label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Case No</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Plaintiff/Petitioner</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Matter Categories</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Defendent Department</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Institution Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" name="" id="" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>legal Advisor</label>
            <div className="field-wrap">
              <div className="field">
                <select name="" id="">
                  <option value=""></option>
                </select>
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
          <div className="input-field">
            <label>Case Nature</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Title" />
              </div>
            </div>
          </div>
        </div>
        <div className="common-fields">
          <div className="input-field">
            <label>Prayer</label>
            <div className="field-wrap">
              <textarea name="" id=""></textarea>
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
      </CreateLegalCasesSection>
    </CreateLegalCasesMain>
  );
};

export default CreateLegalCases;
