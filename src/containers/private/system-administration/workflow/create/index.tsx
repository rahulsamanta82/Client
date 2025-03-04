import { FC, useState, useEffect } from "react";
import {
  CreateWorkflowSection,
  CreateWorkflowMain,
  CreateWorkflowTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

const CreateWorkflow: FC = () => {
  return (
    <CreateWorkflowMain>
      <CreateWorkflowTop>
        <div className="left">
          <span className="page-heading">Add Workflow</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateWorkflowTop>

      <CreateWorkflowSection className="p-custom-scrollbar-8">
        <form>
          <div className="common-fields">
            <div className="input-field ">
              <label>Title</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" />
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Module Name</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Module Name</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Module Class</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Module Class</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="common-fields">
            <div className="radio-field">
              <label htmlFor="no">Status </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" />
                  <label htmlFor="no">De-Active</label>
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <div className="buttons">
              <button className="lg-rounded-btn gray" type="button">
                Reset
              </button>
              <button className="lg-rounded-btn black">Save & Add more</button>
              <button className="lg-rounded-btn">Save & Exit</button>
            </div>
          </div>
        </form>
      </CreateWorkflowSection>
    </CreateWorkflowMain>
  );
};

export default CreateWorkflow;
