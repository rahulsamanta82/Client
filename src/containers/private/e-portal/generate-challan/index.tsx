import React, { FC } from 'react'
import { HeadingDiv, ChallanForm, ChallanTable, MainChallan } from './style'
import Breadcrumb from 'components/particles/breadcrumb'
import { DownArrowSvg, UpArrowSvg } from 'assets/images/e-portal/svgs'

const GenerateChallan: FC = () => {
  const challanList = [
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
  ]
  return (
    <>
<MainChallan>
      <HeadingDiv>
        <p className='heading'>Generate Challan</p>
        <Breadcrumb />
      </HeadingDiv>

      <ChallanForm>
        <div>
          <p className='form-heading'>Generate Online Challan</p>
        </div>
        {/* <div className='challan-input-main'>

          <div>
            <div>
              <label className='challan-label' htmlFor="">Select Voucher</label>
            </div>
            <select className='challan-input'>
              <option value="">Alumini Fee</option>
            </select>
          </div>
          <div>
            <div>
              <label className='challan-label' htmlFor="">Remarks</label>
            </div>
            <input className='challan-input' placeholder='Remarks' />
          </div>

          <div>
            <div>
              <label className='challan-label' htmlFor="">Amount</label>
            </div>
            <p className='challan-price'>Rs. 500</p>
          </div>

        </div> */}

<div className="common-fields">
                    <div className="input-field">
                        <label>Select Voucher</label>
                        <div className="field-wrap">
                            <div className="field">
                                <select name="" id="">
                                  <option value="">Alumini Fee</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Remarks</label>
                        <div className="field-wrap">
                            <div className="field">
                              <input type="text" placeholder='Remarks' />
                            </div>
                        </div>
                    </div>
                    <div className="input-field">
                        <label>Amount</label>
                        <div className="">
                        <p className='challan-price'>Rs. 500</p>
                        </div>
                    </div>
                </div>

        <div className='challan-button-div'>
          <button className='challan-button'>Generate Challan</button>
        </div>

      </ChallanForm>

      <ChallanTable>
        <p className='table-heading'>Generated Challan List</p>
        <div className='data-table'>
          <table className='bottom-bordered-cells'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Application#</th>
                <th>Challan#</th>
                <th>Dua Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>File Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {challanList.map((items) => (
                <tr >
                  <td> <div className='mw-150'>{items.title}</div></td>
                  <td>{items.Application}</td>
                  <td >{items.Challan}</td>
                  <td >{items.DuaDate}</td>
                  <td >{items.Amount}</td>
                  <td >
                    <p className='status'>{items.Status}</p>
                  </td>
                  <td></td>
                  <td >
                    <div className='table-action-icons'>
                    <div className='action-icon'>
                      <DownArrowSvg />
                      </div>
                      <div className='action-icon'>
                      <UpArrowSvg />
                      </div>
                    
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChallanTable>

      </MainChallan>


    </>
  )
}

export default GenerateChallan