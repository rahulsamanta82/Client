import { FC, useState, useEffect } from "react";
import { CreateUserSection, CreateUserMain, CreateUserTop } from "./style";

import FormErrorMessage from "components/particles/forms/form-error-message";
import Breadcrumb from "components/particles/breadcrumb";

import { AddMeritListAutomationDTO } from "utils/helpers/models/admissions/add-merit-list-automation.dto";
import { SmallUploadSvg } from "assets/images/common/svgs";
import squareAvatar from "assets/images/common/others/avatar-square-image.png";

const CreateSystemMenus: FC = () => {
  const handleFileUpload = (event: any) => {
    const { name, files } = event.target;
    const file = files[0];
  };

  return (
    <CreateUserMain>
      <CreateUserTop>
        <div className="left">
          <span className="page-heading">Add Menu</span>
          <Breadcrumb />
        </div>
        <div className="right"></div>
      </CreateUserTop>

      <CreateUserSection className="p-custom-scrollbar-8">
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
              <label>Sub Menu</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Sub Menu</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Module</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Module</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="input-field">
              <label>Class</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Class</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Method</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Method</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>URL </label>
              <div className="field-wrap">
                <div className="field">
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="radio-field">
              <label htmlFor="no">Need department wise access</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" />
                  <label htmlFor="yes">Yes</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" />
                  <label htmlFor="no">No</label>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Menu Title Pre Fix</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Menu Title Pre Fix</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="input-field">
              <label>Menu Title Post Fix</label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Menu Title Post Fix</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="input-field">
              <label>Display Order </label>
              <div className="field-wrap">
                <div className="field">
                  <select name="" id="">
                    <option value="">Select Display Order</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="radio-field">
              <label htmlFor="no">Open in new window</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" />
                  <label htmlFor="no">De-active</label>
                </div>
              </div>
            </div>

            <div className="radio-field">
              <label htmlFor="no">Public</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" />
                  <label htmlFor="no">De-active</label>
                </div>
              </div>
            </div>
          </div>
          <div className="common-fields">
            <div className="radio-field">
              <label htmlFor="no">Status</label>
              <div className="field-wrap">
                <div className="field">
                  <input type="radio" id="yes" />
                  <label htmlFor="yes">Active</label>
                </div>
                <div className="field">
                  <input type="radio" id="no" />
                  <label htmlFor="no">De-active</label>
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
      </CreateUserSection>
    </CreateUserMain>
  );
};

export default CreateSystemMenus;
