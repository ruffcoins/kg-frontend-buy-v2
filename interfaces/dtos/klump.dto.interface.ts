export interface KlumpTransactionDTO {
  amount?: number;
  checkoutUrl?: string;
  commission?: number;
  createdAt?: string;
  createdDate?: string;
  currency?: string;
  debtInterestAmount?: number;
  debtInterestRate?: number;
  deliveryEta?: string;
  deliveryStatus?: string;
  id?: string;
  integratorMerchantId?: string;
  interest?: number;
  isLive?: boolean;
  isSuccessful?: boolean;
  klumpId?: string;
  loanIsPaidOff?: boolean;
  loanPartnerCommission?: number;
  managementFeeCommission?: number;
  merchantId?: string;
  merchantPayoutAmount?: number;
  merchantReference?: string;
  metaData?: MetaData;
  originalAmount?: number;
  partner?: string;
  pickedForSettlement?: boolean;
  processorWebhookData?: ProcessorWebhookData;
  redirectUrl?: string;
  reference?: string;
  repaymentCycle?: number;
  reqId?: string;
  shippingAddressId?: string;
  shippingFee?: number;
  shippingTrackingLink?: string;
  shippingType?: string;
  source?: string;
  status?: string;
  type?: string;
  updateDate?: string;
  updatedAt?: string;
  userId?: string;
}

export interface MetaData {}

export interface ProcessorWebhookData {
  amount?: number;
  downPaymentAmount?: number;
  installment?: number;
  interest?: number;
  loanAmount?: number;
  message?: string;
  minimumBalanceRequired?: number;
  monthlyRepayment?: number;
  otherCharges?: OtherCharges;
  processor?: string;
  reference?: string;
  repaymentCycle?: number;
  repaymentDay?: number;
  repaymentSchedules?: RepaymentSchedule[];
  tenor?: number;
  totalRepayment?: number;
}

export interface OtherCharges {
  insurance?: number;
  managementFee?: number;
  stampDuty?: number;
  vat?: number;
}

export interface RepaymentSchedule {
  interest?: number;
  monthlyRepayment?: number;
  principal?: number;
  principalBalance?: number;
  repaymentDate?: string;
}
