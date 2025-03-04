import { FC, Fragment, useState } from "react";
import {
  LinkGradeTemplateMain,
  Container,
  ContentWrapper,
  AdvertisementListingSection,
} from "./style";
import {
  CloseMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  SmallUploadSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface LinkGradeTemplateProps {
  setOpen: Function;
  id?: number;
}

const LinkGradeTemplate: FC<LinkGradeTemplateProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });

  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };
  const columns: string[] = ["Latter Grades", "Grade Point"];

  return (
    <LinkGradeTemplateMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Link Grades to Obsolete Agri 100-5cr*</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <AdvertisementListingSection className="content-radius-shadow">
            <div className="list-header">
              <div className="table-data-export-buttons">
                <div className="export-btn">
                  <span>
                    <PdfSvg className="icon" />
                  </span>
                  <span className="text">PDF</span>
                </div>

                <div className="export-btn">
                  <span>
                    <ExcelSvg className="icon" />
                  </span>
                  <span className="text">Excel</span>
                </div>
              </div>
              <div className="table-search-field">
                <span className="search-icon">
                  <SearchFieldSvg className="icon" />
                </span>
                <input type="search" placeholder="Search" />
              </div>
            </div>
            <div className="data-table">
              <table className="bottom-bordered-cells">
                <thead>
                  <tr>
                    {columns.map((column: string, index: number) => {
                      return <th key={index}>{column}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>A+</td>

                    <td>95.00</td>
                  </tr>
                </tbody>
              </table>
              <div className="action-buttons">
                <div className="buttons">
                  <button
                    className="lg-rounded-btn black"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>

                  <button className="lg-rounded-btn" type="submit">
                    Save & Close
                  </button>
                </div>
              </div>
            </div>
            <Fragment>
              {/* <Pagination onPageChange={onPageChange} /> */}
            </Fragment>
          </AdvertisementListingSection>
        </ContentWrapper>
      </Container>
    </LinkGradeTemplateMain>
  );
};

export default LinkGradeTemplate;
