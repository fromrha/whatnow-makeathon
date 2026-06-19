import type { WhatNowDocument } from "../types";

// A fake-but-realistic medical insurance "missing document" notice.
// Intentionally dense and bureaucratic so the calm translation lands.
// Contains no real personal data.

export const SAMPLE_DOCUMENT: WhatNowDocument = {
  id: "sample-insurance-notice",
  title: "Notice of Incomplete Claim — Action Required",
  documentType: "Medical Insurance Notice",
  sourceType: "sample",
  rawText: `MERIDIAN HEALTH ASSURANCE
Claims Processing Center
P.O. Box 49213, Dover, DE 19903

NOTICE OF INCOMPLETE CLAIM — ADDITIONAL DOCUMENTATION REQUIRED
Date of Notice: June 5, 2026
Claim Reference No.: MHA-2026-77410-C

RE: Pending adjudication of submitted claim

Dear Member,

This correspondence is to advise you that the above-referenced claim cannot
be adjudicated in its current form. Pursuant to Policy Provision 14.3(b),
supporting documentation is required prior to the continuation of benefit
determination.

OUTSTANDING ITEM(S):
  - Verified proof of current residential address (dated within 90 days)

Acceptable forms of verification include a utility statement, lease
agreement, or government-issued correspondence reflecting the member's
name and service address.

RESPONSE DEADLINE: Documentation must be received no later than
June 30, 2026. Submissions received after this date may result in the
administrative closure of the claim, requiring resubmission and a new
review period of up to forty-five (45) business days.

Failure to remit the requested documentation within the stated period may
delay or forfeit eligible reimbursement associated with this claim.

For questions regarding this notice, contact the Claims Support line at
1-800-555-0182, Monday through Friday, 8:00 AM – 6:00 PM ET.

This notice is generated automatically. Please do not reply to this letter.

Sincerely,
Claims Adjudication Department
Meridian Health Assurance`,
};
