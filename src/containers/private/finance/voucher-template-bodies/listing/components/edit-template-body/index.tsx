import { FC, useState } from "react";
import { AddParticularToChallanMain, Container, ContentWrapper } from "./style";
import { CloseMediumSvg } from "assets/images/common/svgs";
import { VoucherTemplateBodyDTO } from "utils/helpers/models/finance/voucher-template-body.dto";
import useFinance from "containers/private/finance/useHooks";

interface EditTemplateBodyProps {
  setOpen: Function;
  templateBody: VoucherTemplateBodyDTO;
  voucherTemplateBodies: VoucherTemplateBodyDTO[];
  setVoucherTemplateBodies: Function
}

const EditTemplateBody: FC<EditTemplateBodyProps> = ({ setOpen, templateBody, voucherTemplateBodies, setVoucherTemplateBodies }) => {
  const [formData, setFormData] = useState<VoucherTemplateBodyDTO>(templateBody);
  const { updateVoucherTemplateBody } = useFinance();

  const onSubmit = () => {
    if(formData.amount){
      updateVoucherTemplateBody(templateBody.id, formData, setOpen, voucherTemplateBodies, setVoucherTemplateBodies);
    }
  }

  const handleChange = (event: any) => {
    const { value, name} = event.target;
    setFormData({...formData, [name]: value});
  }
  return (
    <AddParticularToChallanMain>
      <Container>
        <ContentWrapper className="p-custom-scrollbar-8">
          <div className="header">
            <div className="empty"></div>
            <div className="heading">
              <span>Edit Template Body</span>
            </div>
            <div className="close-icon cp" onClick={() => setOpen(false)}>
              <CloseMediumSvg className="icon" />
            </div>
          </div>
          <form>
            <div className="common-fields">
              <div className="input-field">
                <label>Amount</label>
                <div className="field-wrap">
                  <div className="field">
                    <input type="number" name="amount" value={formData.amount} onChange={handleChange}/>
                  </div>
                </div>
              </div>
            </div>
              <div className="action-buttons">
                <div className="buttons">
                  <button
                    className="lg-rounded-btn gray"
                    type="reset"
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>

                  <button
                    className="lg-rounded-btn"
                    type="button"
                    onClick={onSubmit}
                  >
                    Save & Close
                  </button>
                </div>
              </div>
          </form>
        </ContentWrapper>
      </Container>
    </AddParticularToChallanMain>
  );
};

export default EditTemplateBody;
