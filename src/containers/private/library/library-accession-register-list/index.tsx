import { FC, useState } from "react";
import { PdfSvg } from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";
import Breadcrumb from "components/particles/breadcrumb";
import {
    AccessRegisterListingMain,
    AccessRegisterListingTop,
    AccessRegisterListingSection,
} from "./style";

import { siteRoutes } from "utils/helpers/enums/routes.enum";

const LibraryAccessRegisterListing: FC = ({}) => {
  const [search, setSearch] = useState("");

  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const breadcrumbLinks = [
    { title: "Library /", path: "" },
    {
      title: "Accession Register Listing",
      path: siteRoutes.libraryAccessRegisterlist,
    },
  ];

  return (
    <>
      <AccessRegisterListingMain>
        <AccessRegisterListingTop>
          <div className="left">
            <span className="page-heading">Accession Register Listing</span>
            <Breadcrumb links={breadcrumbLinks} />
          </div>
          <div className="right">
            <div className="create-org-btn">
              <button className="lg-rounded-btn">Download PDF</button>
            </div>
            <div className="create-org-btn">
              <button className="lg-rounded-btn">Download Excel</button>
            </div>
          </div>
        </AccessRegisterListingTop>
        <AccessRegisterListingSection className="p-custom-scrollbar-8">
          <form>
            <div className="page-heading">Download Accession Register</div>

            <div className="common-fields">
              <div className="input-field">
                <label>Select Library</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Department</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>Select Language</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="common-fields">
              <div className="input-field">
                <label>Select Type</label>
                <div className="field-wrap">
                  <div className="field">
                    <select name="" id="">
                      <option value="">Select One</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>From Accession Number</label>
                <div className="field-wrap">
                  <div className="field">
                   <input type="number" placeholder="From Accession Number"/>
                  </div>
                </div>
              </div>
              <div className="input-field">
                <label>To Accession Number</label>
                <div className="field-wrap">
                <div className="field">
                   <input type="number" placeholder="To Accession Number"/>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </AccessRegisterListingSection>
      </AccessRegisterListingMain>
    </>
  );
};

export default LibraryAccessRegisterListing;
