import { FC } from "react";
import {
    CreateLanguagesForm,
    CreateLanguagesMain,
    CreateLanguagesTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";



import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";



const CreateLanguages: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Languages / ", path: siteRoutes.libraryLanguagelist },
    { title: "Add Language", path: siteRoutes.createLibraryLanguage },
  ];

  return (
    <CreateLanguagesMain>
      <CreateLanguagesTop>
        <div className="heading">
          <span className="page-heading">Add Language</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreateLanguagesTop>

      <CreateLanguagesForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Title" />
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
      </CreateLanguagesForm>
    </CreateLanguagesMain>
  );
};

export default CreateLanguages;
