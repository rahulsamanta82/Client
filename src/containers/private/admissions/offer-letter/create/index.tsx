import { FC, useState } from "react";
import {
  CreateAdmissionOfferLetterFormSection,
  CreateAdmissionOfferLetterMain,
  CreateAdmissionOfferLetterTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";
import Editor from "components/particles/forms/editor";

interface CreateOfferLetterProps {}

const CreateAdmissionOfferLetter: FC<CreateOfferLetterProps> = () => {
  const [value, setValue] = useState();
  return (
    <CreateAdmissionOfferLetterMain>
      <CreateAdmissionOfferLetterTop>
        <div className="left">
          <span className="page-heading">Manage Offer Letter Templates</span>
          <Breadcrumb />
        </div>
      </CreateAdmissionOfferLetterTop>
      <CreateAdmissionOfferLetterFormSection>
        <div className="common-fields">
          <div className="input-field">
            <label>Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Offer Letter" />
              </div>
              {/* <FormErrorMessage error={errors.minor_category} /> */}
            </div>
          </div>
          <div className="input-field">
            <label>Key Words</label>
            <div className="field-wrap">
              <div className="field">
                <input
                  type="text"
                  placeholder="{program} , {semester} , {admission_session} , {exp_date} , {years}"
                />
              </div>
              {/* <FormErrorMessage error={errors.minor_category} /> */}
            </div>
          </div>
        </div>

        <div className="editor-field">
          <label>Mission</label>
          <div className="field-wrap">
            <div className="field">
              <Editor
                value={""}
                onChange={(name, value) => console.log(name, value)}
                name="mission"
              />
              <input type="text" className="d-none" />
            </div>
            {/* <FormErrorMessage error={errors.mission} /> */}
          </div>
        </div>

        <div className="submit-buttons">
          <div className="buttons">
            <button className="lg-rounded-btn gray">Reset</button>
            <button className="lg-rounded-btn black" type="submit">
              Save & Add more
            </button>
            <button className="lg-rounded-btn" type="submit">
              Save & Exit
            </button>
          </div>
        </div>
      </CreateAdmissionOfferLetterFormSection>
    </CreateAdmissionOfferLetterMain>
  );
};

export default CreateAdmissionOfferLetter;
