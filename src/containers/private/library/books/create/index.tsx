import { FC } from "react";
import {
  CreatePublishersForm,
  CreatePublishersMain,
  CreatePublishersTop,
} from "./style";
import Breadcrumb from "components/particles/breadcrumb";

import useUtils from "hooks/useUtils";
import { siteRoutes } from "utils/helpers/enums/routes.enum";

const CreateLibraryBooks: FC = () => {
  const { getQueryParams } = useUtils();
  const params = getQueryParams();

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    { title: "Books /", path: siteRoutes.libraryBookslist },
    { title: "Add Book", path: siteRoutes.createLibraryBooks },
  ];

  return (
    <CreatePublishersMain>
      <CreatePublishersTop>
        <div className="heading">
          <span className="page-heading">Add Book</span>
          <Breadcrumb links={breadcrumbLinks} />
        </div>
      </CreatePublishersTop>

      <CreatePublishersForm className="content-radius-shadow">
        <div className="common-fields">
          <div className="input-field">
            <label htmlFor="">Book Title</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Book Title" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Author</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Author" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Year of Publication</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Year of Publication" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Publisher</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Publisher</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Language</label>
            <div className="field-wrap">
              <div className="field">
                <select>
                  <option>Select Language</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Publiction Place</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Publiction Place" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Volume</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Volume" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Pages(Arabic)</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Pages(Arabic)" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Pages(Roman)</label>
            <div className="field-wrap">
              <div className="field">
                <input type="number" placeholder="Pages(Roman)" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Binding</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Binding" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Edition</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Edition" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">Book Size</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="Book Size" />
              </div>
            </div>
          </div>
          <div className="input-field">
            <label htmlFor="">ISBN</label>
            <div className="field-wrap">
              <div className="field">
                <input type="text" placeholder="ISBN" />
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
      </CreatePublishersForm>
    </CreatePublishersMain>
  );
};

export default CreateLibraryBooks;
