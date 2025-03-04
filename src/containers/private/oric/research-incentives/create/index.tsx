import { FC } from "react";
import {
  CreateResearchForm,
  CreateResearchMain,
  CreateResearchTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateResearchIncentives: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "ORIC /", path: "" },
    {
      title: "Research Incentives /",
      path: siteRoutes.researchIncentivesListing,
    },
    { title: "Add Publication", path: siteRoutes.createResearchIncentives },
  ];

  return (
    <CreateResearchMain>
      <CreateResearchTop>
        <div className="heading">
          <span className="page-heading">Add Publication</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateResearchTop>

      <CreateResearchForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Name of Claimant</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select One</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Sustainalbe Development Goal(SDG)</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select One</option>
                </select>
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">HBL Account #</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="number"
                  placeholder="Enter Account Number Carefully"
                />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Publication Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Co-Author's</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="All Author's According to Article"
                />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Publication Year</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Year</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Journal Name</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select One</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Impact Factor</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Impact Factor" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Category</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Category" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Publication Date</label>
            <div className="field-wrap">
              <div className="field">
                <input type="date" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Print ISSN</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Print ISSN Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Electronic ISSN</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Enter Electronic ISSN Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Research Increments(Only for TTS)</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Education Level</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Level</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Volume</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Volume Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Page No</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Page Number" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">No of Total Authors</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="No of Total Authors" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Position of the Claimant</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Position of the Claimant" />
              </div>
            </div>
          </div>

          <div className="radio-field">
            <label>Supervisor</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label>First Author</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
              </div>
            </div>
          </div>

          <div className="radio-field">
            <label>Corresponding Author</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
              </div>
            </div>
          </div>
          <div className="radio-field">
            <label>Both Corresponding / First Author</label>
            <div className="field-wrap">
              <div className="field">
                <label htmlFor="is-active-yes">Yes</label>
                <input type="radio" id="is-active-yes" />
              </div>
              <div className="field">
                <label htmlFor="is-active-no">No</label>
                <input type="radio" id="is-active-no" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Research Incentive of Paper</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Research Incentive of Paper" />
              </div>
            </div>
          </div>

          <div className="input-field">
            <label htmlFor="">Claimant share in pak Rupees</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Research Incentive of Paper" />
              </div>
            </div>
          </div>

          <div className="input-field">
                <label>Upload Only 1st Page of Paper Containing Author's Name</label>
                <div className="upload-container">
                  <div className="upload-section">
                    <label htmlFor="file-upload" className="upload-label">
                      Choose a file
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      className="file-input"
                    />
                  </div>
                  <div className="file-details-section" id="file-details">
                    <p className="file-placeholder">No file chosen</p>
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
      </CreateResearchForm>
    </CreateResearchMain>
  );
};

export default CreateResearchIncentives;
