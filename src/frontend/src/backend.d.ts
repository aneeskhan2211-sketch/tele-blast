import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserAdminView {
    principal: Principal;
    subscribedAt?: bigint;
    featureAccess: boolean;
    subscriptionTier: string;
    isAdmin: boolean;
    agreementAcceptedAt?: bigint;
    profile?: UserProfile;
    ipAddress?: string;
}
export type Timestamp = bigint;
export interface ColdCallScriptConfig {
    preQualifyingNeeds: string;
    goalType: string;
    packagesOrServices: string;
    whatYouAreSelling: string;
}
export interface ColdCallScriptConfigInput {
    preQualifyingNeeds: string;
    goalType: string;
    packagesOrServices: string;
    whatYouAreSelling: string;
}
export interface SampleBusiness {
    id: bigint;
    city: string;
    name: string;
    revenueRange: string;
    email: string;
    state: string;
    address: string;
    phone: string;
    yearsInBusiness: bigint;
    industry: string;
}
export interface AffiliateProfile {
    id: Principal;
    referralCode: string;
    name: string;
    createdAt: bigint;
    email: string;
    approved: boolean;
    paypalEmail: string;
}
export interface LeadInput {
    pipelineId?: bigint;
    city: string;
    qualificationTags: Array<string>;
    name: string;
    revenueRange: string;
    email: string;
    state: string;
    pipelineStage: PipelineStage;
    birthday?: string;
    address: string;
    notes: string;
    isDnc?: boolean;
    phone: string;
    yearsInBusiness: bigint;
    lastName?: string;
    followUpDate?: string;
    industry: string;
    firstName?: string;
}
export interface EnrichedCommissionEntry {
    referredEmail: string;
    status: string;
    referredName: string;
    hasPurchased: boolean;
    referredPhone: string;
    referredBizName: string;
    affiliateId: string;
    commissionAmount: bigint;
    newUserPrincipal: string;
}
export interface Lead {
    id: bigint;
    pipelineId?: bigint;
    callHistory: Array<CallRecord>;
    textHistory: Array<TextRecord>;
    city: string;
    qualificationTags: Array<string>;
    name: string;
    createdAt: bigint;
    revenueRange: string;
    email: string;
    aiResearch?: string;
    emailHistory: Array<EmailRecord>;
    state: string;
    pipelineStage: PipelineStage;
    birthday?: string;
    address: string;
    notes: string;
    isImported: boolean;
    isDnc: boolean;
    phone: string;
    yearsInBusiness: bigint;
    lastName?: string;
    isNewLeadQueued: boolean;
    followUpDate?: string;
    industry: string;
    firstName?: string;
}
export interface EmailRecord {
    id: string;
    timestamp: Timestamp;
}
export interface CsvLeadInput {
    contactName: string;
    city?: string;
    name: string;
    email: string;
    state?: string;
    birthday?: string;
    address: string;
    notes: string;
    phone: string;
    industry?: string;
}
export interface BirthdayDripConfigView {
    id: string;
    createdAt: bigint;
    templateBody: string;
    isActive: boolean;
}
export interface AffiliateStats {
    readyAmount: bigint;
    paidAmount: bigint;
    pendingAmount: bigint;
    totalClicks: bigint;
    totalConversions: bigint;
    commissions: Array<CommissionEntry>;
}
export interface SmsTemplate {
    id: string;
    body: string;
    name: string;
    createdAt: Timestamp;
}
export interface LeadUpdate {
    pipelineId?: bigint;
    city?: string;
    qualificationTags?: Array<string>;
    name?: string;
    revenueRange?: string;
    email?: string;
    state?: string;
    pipelineStage?: PipelineStage;
    birthday?: string;
    address?: string;
    notes?: string;
    isDnc?: boolean;
    phone?: string;
    yearsInBusiness?: bigint;
    lastName?: string;
    followUpDate?: string;
    industry?: string;
    firstName?: string;
}
export interface UserExportRecord {
    totalCommissions: bigint;
    principal: string;
    referralCode: string;
    subscribedAt?: bigint;
    affiliateApproved: boolean;
    name: string;
    createdAt: bigint;
    subscriptionTier: string;
    isPaid: boolean;
    email: string;
    website: string;
    referredBy: string;
    pendingPayouts: bigint;
    hearAboutUs: string;
    isAffiliate: boolean;
    totalPayouts: bigint;
    companyName: string;
    phone: string;
    agreementAcceptedAt?: bigint;
    ipAddress: string;
}
export interface CallRecord {
    timestamp: bigint;
    disposition?: string;
    outcome: CallOutcome;
}
export interface DashboardStats {
    closedWon: bigint;
    prospects: bigint;
    recentLeads: Array<Lead>;
    contacted: bigint;
    qualified: bigint;
    closedLost: bigint;
}
export interface PreRegisteredUser {
    name: string;
    createdAt: bigint;
    email: string;
    phone: string;
}
export interface CommissionEntry {
    id: string;
    status: CommissionStatus;
    affiliateId: Principal;
    commissionAmount: bigint;
    planAmount: bigint;
    payoutEligibleDate: bigint;
    newUserPrincipal: Principal;
    paidAt?: bigint;
    paypalEmail: string;
    saleDate: bigint;
}
export interface Pipeline {
    id: bigint;
    name: string;
    createdAt: bigint;
}
export interface EmailTemplate {
    id: string;
    subject: string;
    body: string;
    name: string;
    createdAt: Timestamp;
}
export interface TextRecord {
    messageBody: string;
    timestamp: bigint;
    disposition?: string;
}
export interface DripCampaignView {
    id: bigint;
    status: DripCampaignStatus;
    completedAt?: bigint;
    leadIds: Array<bigint>;
    pausedAt?: bigint;
    startedAt?: bigint;
    failedLeadIds: Array<bigint>;
    sentLeadIds: Array<bigint>;
    templateId: string;
    name: string;
    createdAt: bigint;
    templateBody: string;
}
export type DripCampaignStatus = string;
export interface ProfileInput {
    name: string;
    email: string;
    website?: string;
    referredBy?: string;
    hearAboutUs?: string;
    companyName: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    createdAt: bigint;
    email: string;
    website?: string;
    referredBy?: string;
    hearAboutUs?: string;
    companyName: string;
    phone: string;
}
export enum CallOutcome {
    reached = "reached",
    noAnswer = "noAnswer",
    leftVoicemail = "leftVoicemail"
}
export enum CommissionStatus {
    pending = "pending",
    paid = "paid",
    ready = "ready"
}
export enum PayoutFilter {
    all = "all",
    pending = "pending",
    paid = "paid",
    ready = "ready"
}
export enum PipelineStage {
    Prospect = "Prospect",
    Contacted = "Contacted",
    Qualified = "Qualified",
    ClosedWon = "ClosedWon",
    ClosedLost = "ClosedLost"
}
export interface backendInterface {
    acceptLiability(ipAddress: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    activatePreRegisteredUser(): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addCallRecord(leadId: bigint, outcome: CallOutcome): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addEmailRecord(leadId: bigint, timestamp: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    addEmailTemplate(name: string, subject: string, body: string): Promise<string>;
    addLead(lead: LeadInput): Promise<bigint>;
    addSmsTemplate(name: string, body: string): Promise<string>;
    addTextRecord(leadId: bigint, messageBody: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminCreatePreRegisteredUser(name: string, email: string, phone: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteAllLeads(): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeletePreRegisteredUser(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteUserLeads(target: Principal): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminEnsureAffiliateRecord(target: Principal, name: string, email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminGetEnrichedPayouts(): Promise<Array<EnrichedCommissionEntry>>;
    adminGetPreRegisteredUsers(): Promise<Array<PreRegisteredUser>>;
    bulkDeleteLeads(ids: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    bulkImportLeads(csvLeads: Array<CsvLeadInput>, stage: PipelineStage, pipelineId: bigint | null): Promise<Array<bigint>>;
    checkFeatureAccess(): Promise<boolean>;
    checkPreRegisteredByEmail(email: string): Promise<boolean>;
    checkSubscription(): Promise<boolean>;
    checkSubscriptionStatus(): Promise<{
        tier: string;
        isSubscribed: boolean;
    }>;
    clearNewLeadQueued(leadId: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createDripCampaign(name: string, templateId: string, templateBody: string, leadIds: Array<bigint>): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createPipeline(name: string): Promise<{
        __kind__: "ok";
        ok: Pipeline;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteDripCampaign(id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteEmailTemplate(id: string): Promise<boolean>;
    deleteLead(id: bigint): Promise<boolean>;
    deletePipeline(id: bigint): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteSmsTemplate(id: string): Promise<boolean>;
    generateUserExport(): Promise<{
        __kind__: "ok";
        ok: Array<UserExportRecord>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getAdminUserList(): Promise<Array<UserAdminView>>;
    getAffiliate(): Promise<AffiliateProfile | null>;
    getAffiliateStats(): Promise<AffiliateStats>;
    getAllAffiliates(): Promise<Array<AffiliateProfile>>;
    getAllUsers(): Promise<{
        __kind__: "ok";
        ok: Array<UserAdminView>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBirthdayDripConfig(): Promise<{
        __kind__: "ok";
        ok: BirthdayDripConfigView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBirthdayLeads(): Promise<Array<Lead>>;
    getCallDispositions(): Promise<Array<string>>;
    getColdCallConfig(): Promise<{
        __kind__: "ok";
        ok: ColdCallScriptConfig;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDashboardStats(pipelineId: bigint | null): Promise<DashboardStats>;
    getDripCampaign(id: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDripCampaigns(): Promise<Array<DripCampaignView>>;
    getEmailTemplates(): Promise<Array<EmailTemplate>>;
    getEnrichedAffiliateStats(): Promise<Array<EnrichedCommissionEntry>>;
    getLead(id: bigint): Promise<Lead | null>;
    getLeads(): Promise<Array<Lead>>;
    getLiabilityStatus(): Promise<boolean>;
    getNewLeadQueue(): Promise<Array<Lead>>;
    getPackageConfig(): Promise<Array<{
        tier: string;
        enabled: boolean;
    }>>;
    getPayouts(filter: PayoutFilter): Promise<Array<CommissionEntry>>;
    getPipelines(): Promise<Array<Pipeline>>;
    getSampleBusinesses(): Promise<Array<SampleBusiness>>;
    getShowComingSoonTeaser(): Promise<boolean>;
    getSmsTemplates(): Promise<Array<SmsTemplate>>;
    getSubscriptionTier(): Promise<string>;
    getUserCount(): Promise<{
        __kind__: "ok";
        ok: bigint;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getUserProfile(): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    grantAdmin(target: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    importSampleBusiness(id: bigint): Promise<bigint | null>;
    isAdmin(): Promise<boolean>;
    markLeadFailed(campaignId: bigint, leadId: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markLeadSent(campaignId: bigint, leadId: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markPayoutPaid(commissionId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    markSubscribed(): Promise<void>;
    pauseDripCampaign(id: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recordConversion(code: string): Promise<void>;
    registerAffiliate(name: string, email: string, paypalEmail: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    restoreUserAccess(target: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    resumeDripCampaign(id: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    revokeUserAccess(target: Principal): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveColdCallConfig(input: ColdCallScriptConfigInput): Promise<{
        __kind__: "ok";
        ok: ColdCallScriptConfig;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveUserProfile(input: ProfileInput): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    sendSupportContactEmail(name: string, email: string, issue: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setBirthdayDripConfig(templateBody: string, isActive: boolean): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setPackageEnabled(tier: string, enabled: boolean): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setShowComingSoonTeaser(show: boolean): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setSubscriptionTier(tier: string): Promise<void>;
    setUserTier(target: Principal, tier: string): Promise<{
        __kind__: "ok";
        ok: {
            tier: string;
        };
    } | {
        __kind__: "err";
        err: string;
    }>;
    spinSms(_originalMessage: string, _numVersions: bigint): Promise<{
        __kind__: "ok";
        ok: Array<string>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    stopDripCampaign(id: bigint): Promise<{
        __kind__: "ok";
        ok: DripCampaignView;
    } | {
        __kind__: "err";
        err: string;
    }>;
    trackReferralClick(code: string): Promise<void>;
    updateAffiliatePaypalEmail(paypalEmail: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateEmailTemplate(id: string, name: string | null, subject: string | null, body: string | null): Promise<boolean>;
    updateLead(id: bigint, updates: LeadUpdate): Promise<boolean>;
    updateLeadDnc(leadId: bigint, isDnc: boolean): Promise<{
        __kind__: "ok";
        ok: Lead;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePipeline(id: bigint, name: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateSmsTemplate(id: string, name: string | null, body: string | null): Promise<boolean>;
}
