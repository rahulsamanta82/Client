import { FC } from "react";
import {
  CreateMOUForm,
  CreateMOUMain,
  CreateMOUTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateOricMOU: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "MOU's /", path: siteRoutes.oricMouListing },
    { title: "Add MoU", path: siteRoutes.createOricMou },
  ];

  return (
    <CreateMOUMain>
      <CreateMOUTop>
        <div className="heading">
          <span className="page-heading">Add MoU</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateMOUTop>

      <CreateMOUForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Party-I Focal Person</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Focal Person</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Community</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Community</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">PArty II</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">PArty II Focal Person</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Nature Of Collaboration</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Signed Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Duration</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Duration Type</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Duration</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Custodian</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Status</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>New</option>
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
      </CreateMOUForm>
    </CreateMOUMain>
  );
};

export default CreateOricMOU;
