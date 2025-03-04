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

const CreateOricConference: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    { title: "Conferences /", path: siteRoutes.oricConferenceListing },
    { title: "Add Conference", path: siteRoutes.createOricConference },
  ];

  return (
    <CreateConferenceMain>
      <CreateConferenceTop>
        <div className="heading">
          <span className="page-heading">Add Conference</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateConferenceTop>

      <CreateConferenceForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Focal Person</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Focal Person</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Event Type</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Event Type</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Event Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Event Level</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>National</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Speakers/Resource Person</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="" />
              </div>
            </div>
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
        <div className="common-fields">
        <div className="input-field">
            <label htmlFor="">Date Of Event</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Status</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Status</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field class">
            <label>Field Class</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" />
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

export default CreateOricConference;
