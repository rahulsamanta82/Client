import { FC, Fragment, useState } from "react";
import {
  ConfirmationMain,
  Container,
  ContentWrapper,
  InfoField,
  BasicInfo,
} from "./style";
import {
  CloseMediumSvg,
  EmployeeInfoSvg,
  ExcelSvg,
  PdfSvg,
  SearchFieldSvg,
  SmallUploadSvg,
} from "assets/images/common/svgs";
import Pagination from "components/particles/table/pagination";

interface ConfirmationProps {
  setOpen: Function;
  id?: number;
}

const Confirmation: FC<ConfirmationProps> = ({ setOpen }) => {
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
    "Letter Grade",
    "Grade Point",
    "Percentage Boundary",
  ];

  return (
    <ConfirmationMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Confirm & Submit Leave Requisition </span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <BasicInfo className="info-container">
            <InfoField gray={false}>
              <span className="title">Employe Name:</span>
              <span className="info">Asif Nadeem</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Leave Type:</span>
              <span className="info">Casual</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Date Range</span>
              <span className="info"> 10-12-2020 to 10-12-2024</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Total Days</span>
              <span className="info">565</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Leave Reason</span>
              <span className="info">Work at other Office</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Attachments</span>
              <span className="info"> No Attachments</span>
            </InfoField>
          </BasicInfo>
        </ContentWrapper>
      </Container>
    </ConfirmationMain>
  );
};

export default Confirmation;
