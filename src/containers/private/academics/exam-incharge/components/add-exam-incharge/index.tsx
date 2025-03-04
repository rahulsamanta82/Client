import { FC, Fragment, useState } from "react";
import {
  AddExamInchargeMain,
  Container,
  ContentWrapper,
  AddExamInchargeSection,
} from "./style";
import {
  CloseMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  SmallUploadSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface AddExamInchargeProps {
  setOpen: Function;
  id?: number;
}

const AddExamIncharge: FC<AddExamInchargeProps> = ({ setOpen }) => {
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
  const columns: string[] = [
    "Username",
    "Name",
    "CNIC",
    "Designation",
    "Department",
    "Campus",
  ];

  return (
    <AddExamInchargeMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Add Exam In charge</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <AddExamInchargeSection className="content-radius-shadow">
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
                  {[1, 1, 1, 1].map(() => {
                    return (
                      <tr>
                        <td>dr.hameedgull</td>
                        <td>Hameed Gull</td>
                        <td>31102-1234567-9</td>
                        <td>Assistant Professor</td>
                        <td>Plant Pathology</td>
                        <td>Baghdad ul jadeed</td>
                      </tr>
                    );
                  })}
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
          </AddExamInchargeSection>
        </ContentWrapper>
      </Container>
    </AddExamInchargeMain>
  );
};

export default AddExamIncharge;
