import { FC, Fragment, useEffect, useState } from "react";
import {
  AddTrainingTeacherMain,
  Container,
  ContentWrapper,
  AddTrainingTeacherSection,
} from "./style";
import {
  CloseMediumSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface AddTrainingTeacherProps {
  setOpen: Function;
}

const AddTrainingTeacher: FC<AddTrainingTeacherProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };
  const columns: string[] = [
    "Name",
    "CNIC",
    "Designation",
    "Subject",
    "Course Name",
    "Job Status",
    "Status",
  ];
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 10,
    totalRecords: 1,
  });
  const onPageChange = (pageInfo: { selected: number }) => {
    const { selected: page } = pageInfo;
    setPagination({ ...pagination, page: page + 1 });
  };
  return (
    <AddTrainingTeacherMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>
                Add Teachers From Short Courses & Pedagogical Training
              </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <AddTrainingTeacherSection
            isTableOverflowing={false}
            className="content-radius-shadow"
          >
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
                  {[1, 1, 1, 1, 1].map((room, index) => {
                    return (
                      <tr>
                        <td>Associate Lecture</td>
                        <td>31102-1234567-9</td>
                        <td>Visiting Teacher/Part time Teacher</td>
                        <td>Visiting Lecturer</td>
                        <td>Pedagogical Training</td>
                        <td>
                          <div className="table-radio-field">
                            <div className="radio">
                              <label htmlFor={`is-specialization-no-${index}`}>
                                Active
                              </label>
                              <input
                                type="radio"
                                name={`is-specialization-${index}`}
                                id={`is-specialization-no-${index}`}
                              />
                            </div>
                            <div className="radio">
                              <label htmlFor={`is-specialization-yes-${index}`}>
                                Non-Active
                              </label>
                              <input
                                type="radio"
                                name={`is-specialization-${index}`}
                                id={`is-specialization-yes-${index}`}
                              />
                            </div>
                          </div>
                        </td>
                        <td>Teaching</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Fragment>
              {/* <DataNotFound show={!isLoading && !data.length} /> */}
              <Pagination onPageChange={onPageChange} {...pagination} />
            </Fragment>
            <div className="action-buttons">
              <div className="buttons">
                <button className="lg-rounded-btn gray" type="button">
                  Reset
                </button>
                <button className="lg-rounded-btn">Add Selected</button>
              </div>
            </div>
          </AddTrainingTeacherSection>
        </ContentWrapper>
      </Container>
    </AddTrainingTeacherMain>
  );
};

export default AddTrainingTeacher;
