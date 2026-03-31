/** Public site / contact constants — safe to import in client bundle */
export const COMPANY_LEGAL_NAME = 'KDM Automotive, LLC'

/** Short line under logo (company legal name is primary) */
export const SITE_TAGLINE = 'Vehicle service contracts'

export const PHONE_DISPLAY = '443-784-2071'
export const PHONE_TEL_HREF = 'tel:+14437842071'

/** General inquiries — Contact page */
export const CONTACT_EMAIL_DISPLAY = 'kdmwarranty@gmail.com'
export const CONTACT_EMAIL_MAILTO = 'mailto:kdmwarranty@gmail.com'

/** Quote form delivery (FormSubmit). Testing: danny@… — switch to business inbox when live. */
export const CONTACT_FORM_SUBMIT_EMAIL = 'danny@empoweredcreative.co'

/** FormSubmit — free, no server. First submission emails that address a one-time activation link. */
export const CONTACT_FORM_ACTION =
  `https://formsubmit.co/${CONTACT_FORM_SUBMIT_EMAIL}` as const
