import React, { FC } from 'react'
import { HeadingDiv, ChallanTable } from './style'
import Breadcrumb from 'components/particles/breadcrumb'
import { DownArrowSvg, UpArrowSvg } from 'assets/images/e-portal/svgs'

const MyVouchers: FC = () => {

  const voucherList = [
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
    { title: "Fall 2020 Admission Semester Fee", Application: "BWP-MAIN-FA2020-628-67861-1-2-89", Challan: "1000564543", DuaDate: "26-09-2020", Amount: "29650", Status: "Paid", FileRemarks: "", },
  ]

  return (
    <>
      <HeadingDiv>
        <p className='heading'>My Vouchers</p>
        <Breadcrumb />
      </HeadingDiv>

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
              {voucherList.map((items) => (
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
                  <td>
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
    </>
  )
}

export default MyVouchers