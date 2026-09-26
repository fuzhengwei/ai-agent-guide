import { AbstractClient } from "../../../common/abstract_client";
export class Client extends AbstractClient {
    constructor(clientConfig) {
        super("cpdp.tencentcloudapi.com", "2019-08-20", clientConfig);
    }
    async QueryAssignment(req, cb) {
        return this.request("QueryAssignment", req, cb);
    }
    async DistributeAccreditQuery(req, cb) {
        return this.request("DistributeAccreditQuery", req, cb);
    }
    async AddFlexPhoneNo(req, cb) {
        return this.request("AddFlexPhoneNo", req, cb);
    }
    async QueryFlexFreezeOrderList(req, cb) {
        return this.request("QueryFlexFreezeOrderList", req, cb);
    }
    async QueryMemberTransactionDetails(req, cb) {
        return this.request("QueryMemberTransactionDetails", req, cb);
    }
    async ModifyAgentTaxPaymentInfo(req, cb) {
        return this.request("ModifyAgentTaxPaymentInfo", req, cb);
    }
    async ModifyMntMbrBindRelateAcctBankCode(req, cb) {
        return this.request("ModifyMntMbrBindRelateAcctBankCode", req, cb);
    }
    async CreateBatchPayment(req, cb) {
        return this.request("CreateBatchPayment", req, cb);
    }
    async DeduceQuota(req, cb) {
        return this.request("DeduceQuota", req, cb);
    }
    async CreateExternalAnchor(req, cb) {
        return this.request("CreateExternalAnchor", req, cb);
    }
    async QueryOrder(req, cb) {
        return this.request("QueryOrder", req, cb);
    }
    async QueryOpenBankRefundOrder(req, cb) {
        return this.request("QueryOpenBankRefundOrder", req, cb);
    }
    async QueryOpenBankVerificationOrder(req, cb) {
        return this.request("QueryOpenBankVerificationOrder", req, cb);
    }
    async QueryCloudOrder(req, cb) {
        return this.request("QueryCloudOrder", req, cb);
    }
    async WithdrawCashMembership(req, cb) {
        return this.request("WithdrawCashMembership", req, cb);
    }
    async GetPayRollAuthResult(req, cb) {
        return this.request("GetPayRollAuthResult", req, cb);
    }
    async QueryBankTransactionDetails(req, cb) {
        return this.request("QueryBankTransactionDetails", req, cb);
    }
    async QueryFlexServiceProviderAccountBalance(req, cb) {
        return this.request("QueryFlexServiceProviderAccountBalance", req, cb);
    }
    async CreateOpenBankExternalSubMerchantRegistration(req, cb) {
        return this.request("CreateOpenBankExternalSubMerchantRegistration", req, cb);
    }
    async QueryCommonTransferRecharge(req, cb) {
        return this.request("QueryCommonTransferRecharge", req, cb);
    }
    async DownloadBill(req, cb) {
        return this.request("DownloadBill", req, cb);
    }
    async ApplyFlexPayment(req, cb) {
        return this.request("ApplyFlexPayment", req, cb);
    }
    async ViewContract(req, cb) {
        return this.request("ViewContract", req, cb);
    }
    async CreateOpenBankUnifiedOrder(req, cb) {
        return this.request("CreateOpenBankUnifiedOrder", req, cb);
    }
    async QueryCustAcctIdBalance(req, cb) {
        return this.request("QueryCustAcctIdBalance", req, cb);
    }
    async QueryAnchorContractInfo(req, cb) {
        return this.request("QueryAnchorContractInfo", req, cb);
    }
    async TransferSinglePay(req, cb) {
        return this.request("TransferSinglePay", req, cb);
    }
    async QueryMerchantPayWayList(req, cb) {
        return this.request("QueryMerchantPayWayList", req, cb);
    }
    async ModifyMerchant(req, cb) {
        return this.request("ModifyMerchant", req, cb);
    }
    async QueryOpenBankSubMerchantRateConfigure(req, cb) {
        return this.request("QueryOpenBankSubMerchantRateConfigure", req, cb);
    }
    async RegisterBillSupportWithdraw(req, cb) {
        return this.request("RegisterBillSupportWithdraw", req, cb);
    }
    async AddFlexIdInfo(req, cb) {
        return this.request("AddFlexIdInfo", req, cb);
    }
    async CreateOpenBankRechargeOrder(req, cb) {
        return this.request("CreateOpenBankRechargeOrder", req, cb);
    }
    async QueryTrade(req, cb) {
        return this.request("QueryTrade", req, cb);
    }
    async QueryFlexPayeeAccountList(req, cb) {
        return this.request("QueryFlexPayeeAccountList", req, cb);
    }
    async FreezeFlexBalance(req, cb) {
        return this.request("FreezeFlexBalance", req, cb);
    }
    async AddShop(req, cb) {
        return this.request("AddShop", req, cb);
    }
    async QueryOpenBankExternalSubAccountBookBalance(req, cb) {
        return this.request("QueryOpenBankExternalSubAccountBookBalance", req, cb);
    }
    async QueryMerchantClassification(req, cb) {
        return this.request("QueryMerchantClassification", req, cb);
    }
    async QueryFlexSettlementOrderList(req, cb) {
        return this.request("QueryFlexSettlementOrderList", req, cb);
    }
    async ApplyApplicationMaterial(req, cb) {
        return this.request("ApplyApplicationMaterial", req, cb);
    }
    async CreateTransferBatch(req, cb) {
        return this.request("CreateTransferBatch", req, cb);
    }
    async CreateInvoiceV2(req, cb) {
        return this.request("CreateInvoiceV2", req, cb);
    }
    async QueryInvoice(req, cb) {
        return this.request("QueryInvoice", req, cb);
    }
    async BindOpenBankProfitSharePayee(req, cb) {
        return this.request("BindOpenBankProfitSharePayee", req, cb);
    }
    async QueryFlexPayeeInfo(req, cb) {
        return this.request("QueryFlexPayeeInfo", req, cb);
    }
    async QueryTransferDetail(req, cb) {
        return this.request("QueryTransferDetail", req, cb);
    }
    async QueryOpenBankBankBranchList(req, cb) {
        return this.request("QueryOpenBankBankBranchList", req, cb);
    }
    async QueryExchangeRate(req, cb) {
        return this.request("QueryExchangeRate", req, cb);
    }
    async UnbindRelateAcct(req, cb) {
        return this.request("UnbindRelateAcct", req, cb);
    }
    async ContractOrder(req, cb) {
        return this.request("ContractOrder", req, cb);
    }
    async QuerySinglePaymentResult(req, cb) {
        return this.request("QuerySinglePaymentResult", req, cb);
    }
    async ApplyOpenBankOrderDetailReceipt(req, cb) {
        return this.request("ApplyOpenBankOrderDetailReceipt", req, cb);
    }
    async QueryFlexPaymentOrderList(req, cb) {
        return this.request("QueryFlexPaymentOrderList", req, cb);
    }
    async RegisterBehavior(req, cb) {
        return this.request("RegisterBehavior", req, cb);
    }
    async QueryOpenBankSupportBankList(req, cb) {
        return this.request("QueryOpenBankSupportBankList", req, cb);
    }
    async ViewMerchant(req, cb) {
        return this.request("ViewMerchant", req, cb);
    }
    async UploadTaxPayment(req, cb) {
        return this.request("UploadTaxPayment", req, cb);
    }
    async CreatePayRollPreOrderWithAuth(req, cb) {
        return this.request("CreatePayRollPreOrderWithAuth", req, cb);
    }
    async QueryFlexOrderSummaryList(req, cb) {
        return this.request("QueryFlexOrderSummaryList", req, cb);
    }
    async CreateOpenBankPaymentOrder(req, cb) {
        return this.request("CreateOpenBankPaymentOrder", req, cb);
    }
    async RefundTlinxOrder(req, cb) {
        return this.request("RefundTlinxOrder", req, cb);
    }
    async UnBindAcct(req, cb) {
        return this.request("UnBindAcct", req, cb);
    }
    async DistributeApply(req, cb) {
        return this.request("DistributeApply", req, cb);
    }
    async QueryMerchantBalance(req, cb) {
        return this.request("QueryMerchantBalance", req, cb);
    }
    async QueryContractPayWayList(req, cb) {
        return this.request("QueryContractPayWayList", req, cb);
    }
    async CreatePayRollPreOrder(req, cb) {
        return this.request("CreatePayRollPreOrder", req, cb);
    }
    async CreateOpenBankGlobalPaymentOrder(req, cb) {
        return this.request("CreateOpenBankGlobalPaymentOrder", req, cb);
    }
    async AddContract(req, cb) {
        return this.request("AddContract", req, cb);
    }
    async CreateCloudSubMerchant(req, cb) {
        return this.request("CreateCloudSubMerchant", req, cb);
    }
    async DeleteAgentTaxPaymentInfo(req, cb) {
        return this.request("DeleteAgentTaxPaymentInfo", req, cb);
    }
    async CreateAgentTaxPaymentInfos(req, cb) {
        return this.request("CreateAgentTaxPaymentInfos", req, cb);
    }
    async DeleteAgentTaxPaymentInfos(req, cb) {
        return this.request("DeleteAgentTaxPaymentInfos", req, cb);
    }
    async CreatePayMerchant(req, cb) {
        return this.request("CreatePayMerchant", req, cb);
    }
    async QueryOpenBankSettleOrder(req, cb) {
        return this.request("QueryOpenBankSettleOrder", req, cb);
    }
    async QueryBatchPaymentResult(req, cb) {
        return this.request("QueryBatchPaymentResult", req, cb);
    }
    async GetPayRollAuthList(req, cb) {
        return this.request("GetPayRollAuthList", req, cb);
    }
    async QueryFlexPayeeAccountInfo(req, cb) {
        return this.request("QueryFlexPayeeAccountInfo", req, cb);
    }
    async RefundOpenBankOrder(req, cb) {
        return this.request("RefundOpenBankOrder", req, cb);
    }
    async CreatePayRollToken(req, cb) {
        return this.request("CreatePayRollToken", req, cb);
    }
    async UploadExternalAnchorInfo(req, cb) {
        return this.request("UploadExternalAnchorInfo", req, cb);
    }
    async QueryMemberBind(req, cb) {
        return this.request("QueryMemberBind", req, cb);
    }
    async ApplyOpenBankSubMerchantSignOnline(req, cb) {
        return this.request("ApplyOpenBankSubMerchantSignOnline", req, cb);
    }
    async UnifiedOrder(req, cb) {
        return this.request("UnifiedOrder", req, cb);
    }
    async QueryOpenBankUnbindExternalSubMerchantBankAccount(req, cb) {
        return this.request("QueryOpenBankUnbindExternalSubMerchantBankAccount", req, cb);
    }
    async ConfirmOrder(req, cb) {
        return this.request("ConfirmOrder", req, cb);
    }
    async QueryContractRelateShop(req, cb) {
        return this.request("QueryContractRelateShop", req, cb);
    }
    async ViewShop(req, cb) {
        return this.request("ViewShop", req, cb);
    }
    async CheckAmount(req, cb) {
        return this.request("CheckAmount", req, cb);
    }
    async QueryTransferResult(req, cb) {
        return this.request("QueryTransferResult", req, cb);
    }
    async CreateAnchor(req, cb) {
        return this.request("CreateAnchor", req, cb);
    }
    async QueryOutwardOrder(req, cb) {
        return this.request("QueryOutwardOrder", req, cb);
    }
    async QueryShopOpenId(req, cb) {
        return this.request("QueryShopOpenId", req, cb);
    }
    async QueryFinancialDataUrl(req, cb) {
        return this.request("QueryFinancialDataUrl", req, cb);
    }
    async QueryMaliciousRegistration(req, cb) {
        return this.request("QueryMaliciousRegistration", req, cb);
    }
    async MigrateOrderRefund(req, cb) {
        return this.request("MigrateOrderRefund", req, cb);
    }
    async QueryOpenBankSubMerchantCredential(req, cb) {
        return this.request("QueryOpenBankSubMerchantCredential", req, cb);
    }
    async QueryFlexPaymentOrderStatus(req, cb) {
        return this.request("QueryFlexPaymentOrderStatus", req, cb);
    }
    async QueryFlexPlatformAccountBalance(req, cb) {
        return this.request("QueryFlexPlatformAccountBalance", req, cb);
    }
    async QueryFlexAmountBeforeTax(req, cb) {
        return this.request("QueryFlexAmountBeforeTax", req, cb);
    }
    async QueryAcctInfo(req, cb) {
        return this.request("QueryAcctInfo", req, cb);
    }
    async ApplyReconciliationFile(req, cb) {
        return this.request("ApplyReconciliationFile", req, cb);
    }
    async QueryReconciliationFileApplyInfo(req, cb) {
        return this.request("QueryReconciliationFileApplyInfo", req, cb);
    }
    async QueryBankWithdrawCashDetails(req, cb) {
        return this.request("QueryBankWithdrawCashDetails", req, cb);
    }
    async QueryOpenBankBillDataPage(req, cb) {
        return this.request("QueryOpenBankBillDataPage", req, cb);
    }
    async QueryDownloadBillURL(req, cb) {
        return this.request("QueryDownloadBillURL", req, cb);
    }
    async CheckAcct(req, cb) {
        return this.request("CheckAcct", req, cb);
    }
    async BindAccount(req, cb) {
        return this.request("BindAccount", req, cb);
    }
    async QueryMerchantOrder(req, cb) {
        return this.request("QueryMerchantOrder", req, cb);
    }
    async VerifyOpenBankAccount(req, cb) {
        return this.request("VerifyOpenBankAccount", req, cb);
    }
    async CreateFlexPayee(req, cb) {
        return this.request("CreateFlexPayee", req, cb);
    }
    async QueryFlexWechatAuthResult(req, cb) {
        return this.request("QueryFlexWechatAuthResult", req, cb);
    }
    async CreateRedInvoiceV2(req, cb) {
        return this.request("CreateRedInvoiceV2", req, cb);
    }
    async SyncContractData(req, cb) {
        return this.request("SyncContractData", req, cb);
    }
    async UploadTaxList(req, cb) {
        return this.request("UploadTaxList", req, cb);
    }
    async ModifyBindedAccount(req, cb) {
        return this.request("ModifyBindedAccount", req, cb);
    }
    async QueryInvoiceV2(req, cb) {
        return this.request("QueryInvoiceV2", req, cb);
    }
    async BindAcct(req, cb) {
        return this.request("BindAcct", req, cb);
    }
    async BindRelateAcctSmallAmount(req, cb) {
        return this.request("BindRelateAcctSmallAmount", req, cb);
    }
    async CreateOrder(req, cb) {
        return this.request("CreateOrder", req, cb);
    }
    async UnifiedTlinxOrder(req, cb) {
        return this.request("UnifiedTlinxOrder", req, cb);
    }
    async UploadOrgFile(req, cb) {
        return this.request("UploadOrgFile", req, cb);
    }
    async BindRelateAccReUnionPay(req, cb) {
        return this.request("BindRelateAccReUnionPay", req, cb);
    }
    async QueryMerchant(req, cb) {
        return this.request("QueryMerchant", req, cb);
    }
    async ApplyFlexWechatPreAuth(req, cb) {
        return this.request("ApplyFlexWechatPreAuth", req, cb);
    }
    async ReviseMbrProperty(req, cb) {
        return this.request("ReviseMbrProperty", req, cb);
    }
    async BindOpenBankExternalSubMerchantBankAccount(req, cb) {
        return this.request("BindOpenBankExternalSubMerchantBankAccount", req, cb);
    }
    async QueryBalance(req, cb) {
        return this.request("QueryBalance", req, cb);
    }
    async RevokeRechargeByThirdPay(req, cb) {
        return this.request("RevokeRechargeByThirdPay", req, cb);
    }
    async QueryCloudRefundOrder(req, cb) {
        return this.request("QueryCloudRefundOrder", req, cb);
    }
    async DownloadOrgFile(req, cb) {
        return this.request("DownloadOrgFile", req, cb);
    }
    async GetBillDownloadUrl(req, cb) {
        return this.request("GetBillDownloadUrl", req, cb);
    }
    async QueryAgentTaxPaymentBatch(req, cb) {
        return this.request("QueryAgentTaxPaymentBatch", req, cb);
    }
    async DescribeOrderStatus(req, cb) {
        return this.request("DescribeOrderStatus", req, cb);
    }
    async QueryAcctBinding(req, cb) {
        return this.request("QueryAcctBinding", req, cb);
    }
    async QueryFundsTransactionDetails(req, cb) {
        return this.request("QueryFundsTransactionDetails", req, cb);
    }
    async CreateOpenBankVerificationOrder(req, cb) {
        return this.request("CreateOpenBankVerificationOrder", req, cb);
    }
    async ApplyReWithdrawal(req, cb) {
        return this.request("ApplyReWithdrawal", req, cb);
    }
    async DistributeRemoveReceiver(req, cb) {
        return this.request("DistributeRemoveReceiver", req, cb);
    }
    async ApplyPayerInfo(req, cb) {
        return this.request("ApplyPayerInfo", req, cb);
    }
    async QueryOpenBankPaymentOrder(req, cb) {
        return this.request("QueryOpenBankPaymentOrder", req, cb);
    }
    async ApplyTrade(req, cb) {
        return this.request("ApplyTrade", req, cb);
    }
    async UnbindOpenBankExternalSubMerchantBankAccount(req, cb) {
        return this.request("UnbindOpenBankExternalSubMerchantBankAccount", req, cb);
    }
    async QueryBankClear(req, cb) {
        return this.request("QueryBankClear", req, cb);
    }
    async CreateOpenBankMerchant(req, cb) {
        return this.request("CreateOpenBankMerchant", req, cb);
    }
    async CreateRedInvoice(req, cb) {
        return this.request("CreateRedInvoice", req, cb);
    }
    async QueryCloudChannelData(req, cb) {
        return this.request("QueryCloudChannelData", req, cb);
    }
    async QueryCityCode(req, cb) {
        return this.request("QueryCityCode", req, cb);
    }
    async QueryApplicationMaterial(req, cb) {
        return this.request("QueryApplicationMaterial", req, cb);
    }
    async ModifyFlexPayeeAccountRightStatus(req, cb) {
        return this.request("ModifyFlexPayeeAccountRightStatus", req, cb);
    }
    async Refund(req, cb) {
        return this.request("Refund", req, cb);
    }
    async CloseOpenBankPaymentOrder(req, cb) {
        return this.request("CloseOpenBankPaymentOrder", req, cb);
    }
    async RefundCloudOrder(req, cb) {
        return this.request("RefundCloudOrder", req, cb);
    }
    async QueryFlexPayeeAccountBalance(req, cb) {
        return this.request("QueryFlexPayeeAccountBalance", req, cb);
    }
    async DistributeAccreditTlinx(req, cb) {
        return this.request("DistributeAccreditTlinx", req, cb);
    }
    async RechargeByThirdPay(req, cb) {
        return this.request("RechargeByThirdPay", req, cb);
    }
    async RechargeMemberThirdPay(req, cb) {
        return this.request("RechargeMemberThirdPay", req, cb);
    }
    async CreateMerchant(req, cb) {
        return this.request("CreateMerchant", req, cb);
    }
    async CreateAcct(req, cb) {
        return this.request("CreateAcct", req, cb);
    }
    async ExecuteMemberTransaction(req, cb) {
        return this.request("ExecuteMemberTransaction", req, cb);
    }
    async DistributeQuery(req, cb) {
        return this.request("DistributeQuery", req, cb);
    }
    async CreateOpenBankSubMerchantRateConfigure(req, cb) {
        return this.request("CreateOpenBankSubMerchantRateConfigure", req, cb);
    }
    async CreateSinglePayment(req, cb) {
        return this.request("CreateSinglePayment", req, cb);
    }
    async RegisterBill(req, cb) {
        return this.request("RegisterBill", req, cb);
    }
    async QueryFlexBillDownloadUrl(req, cb) {
        return this.request("QueryFlexBillDownloadUrl", req, cb);
    }
    async QueryOpenBankDownLoadUrl(req, cb) {
        return this.request("QueryOpenBankDownLoadUrl", req, cb);
    }
    async QueryOrderStatus(req, cb) {
        return this.request("QueryOrderStatus", req, cb);
    }
    async QueryPayerInfo(req, cb) {
        return this.request("QueryPayerInfo", req, cb);
    }
    async QueryCompanyTitle(req, cb) {
        return this.request("QueryCompanyTitle", req, cb);
    }
    async ApplyWithdrawal(req, cb) {
        return this.request("ApplyWithdrawal", req, cb);
    }
    async DescribeChargeDetail(req, cb) {
        return this.request("DescribeChargeDetail", req, cb);
    }
    async GetPayRollAuth(req, cb) {
        return this.request("GetPayRollAuth", req, cb);
    }
    async GetDistributeBillDownloadUrl(req, cb) {
        return this.request("GetDistributeBillDownloadUrl", req, cb);
    }
    async CreateCustAcctId(req, cb) {
        return this.request("CreateCustAcctId", req, cb);
    }
    async UploadFile(req, cb) {
        return this.request("UploadFile", req, cb);
    }
    async CloseOrder(req, cb) {
        return this.request("CloseOrder", req, cb);
    }
    async QueryMerchantInfoForManagement(req, cb) {
        return this.request("QueryMerchantInfoForManagement", req, cb);
    }
    async ModifyFlexFundingAccount(req, cb) {
        return this.request("ModifyFlexFundingAccount", req, cb);
    }
    async RevokeMemberRechargeThirdPay(req, cb) {
        return this.request("RevokeMemberRechargeThirdPay", req, cb);
    }
    async QueryOpenBankDailyReceiptDownloadUrl(req, cb) {
        return this.request("QueryOpenBankDailyReceiptDownloadUrl", req, cb);
    }
    async DistributeCancel(req, cb) {
        return this.request("DistributeCancel", req, cb);
    }
    async DownloadReconciliationUrl(req, cb) {
        return this.request("DownloadReconciliationUrl", req, cb);
    }
    async BindRelateAcctUnionPay(req, cb) {
        return this.request("BindRelateAcctUnionPay", req, cb);
    }
    async QueryMemberTransaction(req, cb) {
        return this.request("QueryMemberTransaction", req, cb);
    }
    async UploadOpenBankSubMerchantCredential(req, cb) {
        return this.request("UploadOpenBankSubMerchantCredential", req, cb);
    }
    async QueryOpenBankProfitSharePayee(req, cb) {
        return this.request("QueryOpenBankProfitSharePayee", req, cb);
    }
    async DistributeQueryReceiver(req, cb) {
        return this.request("DistributeQueryReceiver", req, cb);
    }
    async ApplyOpenBankSettleOrder(req, cb) {
        return this.request("ApplyOpenBankSettleOrder", req, cb);
    }
    async QueryBillDownloadURL(req, cb) {
        return this.request("QueryBillDownloadURL", req, cb);
    }
    async CreateInvoice(req, cb) {
        return this.request("CreateInvoice", req, cb);
    }
    async QueryOpenBankOrderDetailReceiptInfo(req, cb) {
        return this.request("QueryOpenBankOrderDetailReceiptInfo", req, cb);
    }
    async QueryRefund(req, cb) {
        return this.request("QueryRefund", req, cb);
    }
    async DistributeAddReceiver(req, cb) {
        return this.request("DistributeAddReceiver", req, cb);
    }
    async QueryOpenBankSubMerchantSignOnline(req, cb) {
        return this.request("QueryOpenBankSubMerchantSignOnline", req, cb);
    }
    async RefundMemberTransaction(req, cb) {
        return this.request("RefundMemberTransaction", req, cb);
    }
    async AddMerchant(req, cb) {
        return this.request("AddMerchant", req, cb);
    }
    async QueryOpenBankExternalSubMerchantBankAccount(req, cb) {
        return this.request("QueryOpenBankExternalSubMerchantBankAccount", req, cb);
    }
    async MigrateOrderRefundQuery(req, cb) {
        return this.request("MigrateOrderRefundQuery", req, cb);
    }
    async QueryAgentStatements(req, cb) {
        return this.request("QueryAgentStatements", req, cb);
    }
    async QueryContract(req, cb) {
        return this.request("QueryContract", req, cb);
    }
    async ApplyOutwardOrder(req, cb) {
        return this.request("ApplyOutwardOrder", req, cb);
    }
    async QueryOpenBankExternalSubMerchantRegistration(req, cb) {
        return this.request("QueryOpenBankExternalSubMerchantRegistration", req, cb);
    }
    async AddFlexFundingAccount(req, cb) {
        return this.request("AddFlexFundingAccount", req, cb);
    }
    async UnifiedCloudOrder(req, cb) {
        return this.request("UnifiedCloudOrder", req, cb);
    }
    async QueryContractPayFee(req, cb) {
        return this.request("QueryContractPayFee", req, cb);
    }
    async QuerySmallAmountTransfer(req, cb) {
        return this.request("QuerySmallAmountTransfer", req, cb);
    }
    async QueryOpenBankBindExternalSubMerchantBankAccount(req, cb) {
        return this.request("QueryOpenBankBindExternalSubMerchantBankAccount", req, cb);
    }
    async CreateOpenBankExternalSubMerchantAccountBook(req, cb) {
        return this.request("CreateOpenBankExternalSubMerchantAccountBook", req, cb);
    }
    async QuerySingleTransactionStatus(req, cb) {
        return this.request("QuerySingleTransactionStatus", req, cb);
    }
    async QueryTransferBatch(req, cb) {
        return this.request("QueryTransferBatch", req, cb);
    }
    async TerminateContract(req, cb) {
        return this.request("TerminateContract", req, cb);
    }
    async ApplyFlexSettlement(req, cb) {
        return this.request("ApplyFlexSettlement", req, cb);
    }
    async QueryOpenBankBankAccountBalance(req, cb) {
        return this.request("QueryOpenBankBankAccountBalance", req, cb);
    }
    async QueryAcctInfoList(req, cb) {
        return this.request("QueryAcctInfoList", req, cb);
    }
    async CreateOpenBankAggregatedSubMerchantRegistration(req, cb) {
        return this.request("CreateOpenBankAggregatedSubMerchantRegistration", req, cb);
    }
    async QueryReconciliationDocument(req, cb) {
        return this.request("QueryReconciliationDocument", req, cb);
    }
    async CloseCloudOrder(req, cb) {
        return this.request("CloseCloudOrder", req, cb);
    }
    async QueryExceedingInfo(req, cb) {
        return this.request("QueryExceedingInfo", req, cb);
    }
    async RefundOrder(req, cb) {
        return this.request("RefundOrder", req, cb);
    }
}
