import { Hanbok_Customer } from "./customer"; 

export interface Hanbok_Rental {
  id: number;
  
  eventDate: string | null | undefined;
  
  contractDate: string | null | undefined;
  
  rtRdate: string | null | undefined;
  
  rtBdate: string | null | undefined;
  
  rtBTime: string | null | undefined;
  
  // rtCtCode: number | null | undefined;
  // new
  customer: Hanbok_Customer

  customer_relate: string | null | undefined;

  hanbok_type1: string | null | undefined;

  hanbok_type2: string | null | undefined;

  hanbok_type3: string | null | undefined;

  hanbok_type4: string | null | undefined;

  hanbok_type5: string | null | undefined;

  hanbok_type6: string | null | undefined;

  hanbok_name1: string | null | undefined;

  hanbok_name2: string | null | undefined;

  hanbok_name3: string | null | undefined;

  hanbok_name4: string | null | undefined;

  hanbok_name5: string | null | undefined;

  hanbok_name6: string | null | undefined;

  hanbok_barcode1: string | null | undefined;

  hanbok_barcode2: string | null | undefined;

  hanbok_barcode3: string | null | undefined;

  hanbok_barcode4: string | null | undefined;

  hanbok_barcode5: string | null | undefined;

  price: number | null | undefined;

  payment: number | null | undefined;

  payment_type1: number | null | undefined;

  payment_type2: number | null | undefined;

  payment_type3: number | null | undefined;

  rtPayGubun: string | null | undefined;

  rtRemain: number | null | undefined;

  rtRemainPay: number | null | undefined;

  rtRemainGubun: string | null | undefined;

  infomation1: string | null | undefined;

  infomation2: string | null | undefined;

  infomation3: string | null | undefined;

  rtInTime: string | null | undefined;

  rtUpdateTime: string | null | undefined;

  rtGubun: string | null | undefined;

  rtNo1: number | null | undefined;

  rtNo2: number | null | undefined;

  rtPCheck: string | null | undefined;

  rtDelivery: string | null | undefined;

  rtShoesGubun: string | null | undefined;

  rtShoes: string | null | undefined;

  rtAss1: string | null | undefined;

  rtAss2: string | null | undefined;

  rtAss3: string | null | undefined;

  rtAss4: string | null | undefined;

  rtAss: string | null | undefined;

  rtUwRing: string | null | undefined;

  rtUwKind: string | null | undefined;

  rtUwSize: string | null | undefined;

  rtUwGubun: string | null | undefined;

  rtPrtcheck: string | null | undefined;

  rtReturncheck: string | null | undefined;

  rtSpmall: number | null | undefined;

  rtMemo1: string | null | undefined;

  rtMemo2: string | null | undefined;

  rtMemo3: string | null | undefined;

  rtSpcheck: number | null | undefined;

  rtSpcheckTime: string | null | undefined;

  rtSpcode: string | null | undefined;
}
