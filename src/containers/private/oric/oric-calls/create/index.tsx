import { FC } from "react";
import {
  CreateConferenceForm,
  CreateConferenceMain,
  CreateConferenceTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";
import { AddOptionSvg, DeleteOptionSvg } from "assets/images/common/svgs";

const CreateOricAddCall: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Calls /", path: siteRoutes.oricCallListing },
    { title: "Add Call", path: siteRoutes.createOricCalls },
  ];

  return (
    <CreateConferenceMain>
      <CreateConferenceTop>
        <div className="heading">
          <span className="page-heading">Add Call</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateConferenceTop>

      <CreateConferenceForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Scope</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Scope" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Call Category</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Category</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Organization</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Organization" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Opening Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Closing Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Weblink</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Organization" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>Remarks</label>
            <div className="field-wrap">
              <textarea name="" id=""></textarea>
            </div>
          </div>
        </div>
        <div className="upload-file-field">
          <div className="input-field">
            <label htmlFor="">File Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label>File</label>
            <div className="upload-container">
              <div className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                  Choose a file
                </label>
                <input type="file" id="file-upload" className="file-input" />
              </div>
              <div className="file-details-section" id="file-details">
                <p className="file-placeholder">No file chosen</p>
              </div>
              <div className="action-buttons">
                <div className="particular-btn cp">
                  <AddOptionSvg />
                </div>

                <div className="particular-btn cp">
                  <DeleteOptionSvg />
                </div>
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
      </CreateConferenceForm>
    </CreateConferenceMain>
  );
};

export default CreateOricAddCall;
