import { FC } from "react";
import {
  VoucherDetailsMain,
  Container,
  ContentWrapper,
  BasicInfo,
  InfoField,
} from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";

import { useNavigate } from "react-router-dom";

interface VoucherDetailsProps {
  setOpen: Function;
  id?: number;
}

const VoucherDetails: FC<VoucherDetailsProps> = ({ setOpen }) => {
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <VoucherDetailsMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Voucher Details</span>
            </div>
            <div className="close-icon cp" onClick={handleCloseModal}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <BasicInfo className="info-container">
            <InfoField gray={false}>
              <span className="title">App No</span>
              <span className="info">123421343</span>
            </InfoField>
            <InfoField gray={true}>
              <span className="title">Batch No</span>
              <span className="info">233214453</span>
            </InfoField>
            <InfoField gray={false}>
              <span className="title">Post Parameters</span>
            </InfoField>
            <div className="fields-section">
              <InfoField gray={false}>
                <span className="title">Department Development Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Field Work</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">
                  Fund Of Cholistan Heritage Research
                </span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Infrastructure Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Endowment Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Generator Fuel Charges</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Course Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Univ. Development Fund</span>

                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Needy Student Support Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">
                  Computer/Internet Facility Charges
                </span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Disaster Management Cell Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Directory Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Student Benovelent Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Departmental Maintanence Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Library Service Charges</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Magzine Journal Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Utility Charges</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Transport Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Industrial/Student Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">I.U.F.S.A/Sports Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Examination Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Society Fund</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Admission Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Student Welfare Fund </span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Disable-0%</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Medical Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">Idendity Card Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={true}>
                <span className="title">IUSTC Fee</span>
                <span className="info"></span>
              </InfoField>
              <InfoField gray={false}>
                <span className="title">Total Fee</span>
                <span className="info"></span>
              </InfoField>
            </div>
          </BasicInfo>
        </ContentWrapper>
      </Container>
    </VoucherDetailsMain>
  );
};

export default VoucherDetails;
