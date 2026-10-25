// DEMO DATA — fictional. Not the result of analyzing any real website.
export type Severity = "High" | "Medium" | "Low";

export interface Finding {
  id: string;
  title: string;
  severity: Severity;
  category: string;
  summary: string;
  clauseRef: string;
  clause: string;
  why: string;
}

export const demoSite = {
  name: "Nimbusly",
  domain: "nimbusly.example",
  documents: ["Terms of Service", "Privacy Policy"],
  updated: "Demo · Oct 2026",
  riskScore: 72,
};

export const findings: [Finding, Finding, Finding, Finding, Finding] = [
  {
    id: "data-sharing",
    title: "Your data can be shared with partners",
    severity: "High",
    category: "Privacy",
    summary: "Browsing activity and contact details may be shared with “trusted partners” for advertising without a separate opt-in.",
    clauseRef: "Privacy Policy §4.2",
    clause: "We may disclose Personal Information, including device identifiers, usage data and contact information, to our affiliates and trusted third-party partners for purposes including marketing, analytics and personalised advertising. By using the Service you consent to such disclosure.",
    why: "Consent is bundled into general use, and “trusted partners” is undefined, so you can't tell who receives your data.",
  },
  {
    id: "arbitration",
    title: "You give up the right to sue in court",
    severity: "High",
    category: "Legal rights",
    summary: "Disputes go to private binding arbitration and class actions are waived.",
    clauseRef: "Terms §17.1",
    clause: "Any dispute arising out of or relating to these Terms shall be resolved exclusively through final and binding arbitration. You and Nimbusly each waive the right to a trial by jury or to participate in a class action.",
    why: "Arbitration limits appeal options and the class-action waiver makes small claims hard to pursue collectively.",
  },
  {
    id: "auto-renew",
    title: "Subscription renews automatically",
    severity: "Medium",
    category: "Billing",
    summary: "Plans renew at the then-current price unless cancelled 7 days before renewal.",
    clauseRef: "Terms §8.3",
    clause: "Subscriptions automatically renew for successive periods at Nimbusly's then-current rates unless cancelled at least seven (7) days prior to the end of the current term. Fees are non-refundable.",
    why: "Price can change at renewal and the cancellation window is earlier than the renewal date.",
  },
  {
    id: "content-license",
    title: "Broad license to your uploads",
    severity: "Medium",
    category: "Content",
    summary: "They may use, modify and display what you upload, worldwide and royalty-free.",
    clauseRef: "Terms §11.2",
    clause: "You grant Nimbusly a worldwide, non-exclusive, royalty-free, sublicensable license to use, reproduce, modify, adapt, publish and display any content you submit through the Service.",
    why: "“Sublicensable” means others can be given rights to your content too.",
  },
  {
    id: "deletion",
    title: "You can request data deletion",
    severity: "Low",
    category: "Your rights",
    summary: "Account data can be deleted on request within 30 days; backups kept up to 90 days.",
    clauseRef: "Privacy Policy §9.1",
    clause: "You may request deletion of your account and associated Personal Information at any time. We will process requests within thirty (30) days. Residual copies may persist in backups for up to ninety (90) days.",
    why: "A positive right — though backup retention means deletion isn't instant.",
  },
];

export const stickyNotes: [Note, Note, Note] = [
  { id: "n1", kind: "Warning", text: "Opt-out of ad sharing lives in Settings → Privacy, not at signup." },
  { id: "n2", kind: "Reminder", text: "Cancel 7 days before renewal to avoid the next charge." },
  { id: "n3", kind: "Tip", text: "Arbitration opt-out: email within 30 days of signing up." },
];
export interface Note { id: string; kind: string; text: string }
