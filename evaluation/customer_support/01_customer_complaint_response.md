# Prompt Evaluation

## Prompt File

../prompts/customer_support/01_customer_complaint_response.md

---

## Test Configuration

| Parameter | Value |
|-----------|-------|
| **Prompt** | Customer Complaint Response |
| **Category** | Customer Support |
| **Customer Complaint** | I received my order three days late, the package was damaged, and I haven't received any response from customer support despite contacting them twice. This has been a very frustrating experience. |
| **Model** | Gemini 3.5 Flash |
| **Temperatures Tested** | 0.0, 0.5, 1.0 |
| **Evaluation Focus** | Empathy, Professionalism, Issue Acknowledgement, Resolution Guidance, Constraint Adherence, Hallucination Resistance |

---


# 🌡️ Temperature 0

> [!IMPORTANT]
> **Raw LLM Output (Unmodified)**

### 1. Complaint Summary

The customer is reporting a highly frustrating experience due to three combined issues:
1. Their order arrived three days later than expected.
2. The delivery package arrived damaged.
3. They have not received a response to their two previous attempts to contact customer support.

---

### 2. Customer Response

**Additional information required:** To fully resolve this issue, we require the customer's order number, the email address associated with the purchase, and photos of the damaged package and its contents to determine if the items inside were affected.

***

Dear Customer,

Thank you for reaching out to us again, and please accept our sincere apologies for the delay in getting back to you. I completely understand how frustrating it is to receive an order late, find the package damaged, and experience a delay in communication from our support team. This is certainly not the standard of service we strive to provide.

We want to make this right for you as quickly as possible. To help me assist you immediately, could you please reply with:
* Your **order number**
* A brief description of whether the items inside the package were damaged
* A few **photos of the damaged packaging and products** (if applicable)

Once we receive these details, we will prioritize your request to arrange for a replacement or a refund for any damaged items. 

Thank you for your patience and cooperation as we work to resolve this for you.

Best regards,

[Your Name/Customer Support Team]

---

### 3. Recommended Internal Action

* **Search and Merge Tickets:** Search the ticketing system using the customer's email address or name to locate the two previous unanswered inquiries. Merge them with this current ticket to ensure all communications are centralized and to prevent duplicate responses.
* **Investigate Communication Delay:** Flag the unanswered tickets to the team lead to identify why they were missed (e.g., system routing error, high volume backlog) to prevent future occurrences.
* **Review Shipping Details:** Once the customer provides the order number, track the shipment to verify the delivery timeline and identify the carrier responsible for the damaged package.
* **Assess Damage for Claim:** Once photos are received, document the damage and file a claim with the shipping partner if necessary, while simultaneously initiating the customer's preferred resolution (replacement or refund).

---

### 4. Confidence Rating

**Medium** 

*Explanation:* While we can easily draft an empathetic response acknowledging the customer's frustration, we lack critical details—such as the order number, customer account details, and the extent of the damage to the actual product—to provide an immediate, finalized resolution.

---



# 🌡️ Temperature 0.5

> [!IMPORTANT]
> **Raw LLM Output (Unmodified)**

### 1. Complaint Summary

The customer is highly frustrated due to a combination of three issues:
1. Their order was delivered three days later than expected.
2. The package arrived damaged.
3. They have not received a response to their two previous attempts to contact customer support.

---

### 2. Customer Response

Dear Customer,

Thank you for reaching out to us again, and please accept our sincere apologies for the delay in responding to your previous messages. I completely understand how frustrating it is to receive a late delivery and a damaged package, especially when you have already tried contacting us multiple times. This is certainly not the standard of service we strive to provide. 

We want to make this right for you as quickly as possible. To help me locate your account and investigate this issue immediately, we need a few details that were not included in your message.

**Additional information required:** _Please provide your order number, the email address associated with your purchase, and details (or photos, if possible) of the damage to the package and its contents._

Once we receive this information, we will immediately look into your previous inquiries, review the shipment details with our delivery partner, and assist you with a resolution for the damaged items (such as a replacement or refund, depending on your preference). 

We appreciate your patience and look forward to your reply so we can resolve this for you without further delay.

Best regards,

[Your Name/Customer Support Team]

---

### 3. Recommended Internal Action

*   **Search Ticketing System:** Search the support database using the customer's name or email address to locate the two previous unanswered inquiries. Merge them to prevent duplicate responses and investigate why they were missed (e.g., routing error, spam folder).
*   **Verify Order & Shipping Details:** Once the order number is provided, track the shipment to identify where the delay and damage occurred, and flag the issue with the shipping carrier if necessary.
*   **Prioritize Resolution:** Ensure that once the customer replies with the requested information, their ticket is prioritized for immediate resolution (replacement or refund processing).

---

### 4. Confidence Rating

**Medium**

*Explanation:* While the customer's issues are very clear, we currently lack any identifying information (such as an order number, email address, or customer name) to look up their account and immediately resolve the issue. Once the additional information is provided, the confidence rating will be High.

---



# 🌡️ Temperature 1

> [!IMPORTANT]
> **Raw LLM Output (Unmodified)**

### 1. Complaint Summary

The customer is highly frustrated due to a combination of service failures:
*   Their order arrived three days later than expected.
*   The package delivered was damaged.
*   They attempted to contact customer support twice previously but received no response.

---

### 2. Customer Response

**Additional information required:** Customer's order number, full name associated with the account, and photos of the damaged package/items.

***

**Subject:** Sincere apologies regarding your recent order [Insert Order Number, if known]

Dear [Customer Name],

Thank you for reaching out to us. First and foremost, I want to sincerely apologize for the delay in responding to your previous inquiries. It is never our intention to leave our customers waiting, and I completely understand how frustrating it must be to experience communication delays on top of receiving a late and damaged delivery. 

We want to make this right for you as quickly as possible. To help me resolve this immediately, could you please reply to this message with:

1. Your **Order Number** (if not already linked to this email).
2. A few **photos of the damaged package and items** so we can document this with our delivery partner.

Once I have these details, I will personally prioritize your case to arrange for a replacement or a suitable resolution. 

Thank you for your patience and for bringing this to our attention. I look forward to your reply so we can get this sorted out for you.

Warm regards,

[Your Name/Title]  
Customer Support Team  

---

### 3. Recommended Internal Action

*   **Locate Previous Communications:** Search the ticketing system using the customer’s email address or phone number to find the two unanswered inquiries, merge them with this ticket, and investigate why they were missed to prevent future communication gaps.
*   **Investigate Delivery Issues:** Once the order number is retrieved, check the tracking details and contact the shipping carrier to investigate why the shipment was delayed and damaged.
*   **Flag as High Priority:** Mark this ticket with a "High Priority" status due to the previous lack of response and multiple service failures.

---

### 4. Confidence Rating

**Confidence Rating:** Medium

*Explanation:* While the response professionally addresses the customer's frustration and outlines clear next steps, we currently lack the customer's order details, name, and proof of damage to fully resolve the issue (e.g., initiating a refund or replacement) immediately.

---



# 📈 Output Observation


| Temperature | Observation |
|-------------|-------------|
| **0.0** | Produced a highly structured and detailed response that clearly acknowledged all three customer concerns: delayed delivery, damaged packaging, and unanswered support requests. It appropriately requested additional information and provided comprehensive internal actions. However, it introduced an unsupported promise to arrange a replacement or refund before any company policy or eligibility criteria were provided. |
| **0.5** | Produced the most balanced response, combining empathy, clarity, and actionable next steps while maintaining a professional tone. The request for additional information was naturally integrated into the customer response. However, mentioning replacement or refund options and stating that the request would be prioritized introduced assumptions about company policy and internal procedures. |
| **1.0** | Generated a polished and empathetic response with strong acknowledgement of the customer's frustration. The language became more personalized and assertive, including statements such as personally prioritizing the case and marking the ticket as "High Priority." These actions were not supported by the provided information, making this output slightly more assumptive than the lower-temperature responses. |
---

# ⚠️ Hallucination Analysis


| Category | Observation |
|----------|-------------|
| **Major Hallucinations** | No major factual hallucinations were observed. All three outputs accurately preserved the customer's reported issues and did not invent order numbers, delivery dates, customer identities, or confirmed causes for the damaged package and delayed delivery. |
| **Minor Issues** | All outputs introduced some unsupported assumptions about available resolutions and internal procedures. Temperatures **0.0** and **0.5** suggested that a replacement or refund could be arranged despite no return or refund policy being provided. Temperature **1.0** stated that the agent would personally prioritize the case and recommended assigning a "High Priority" status, despite no escalation or priority policy being supplied. References to contacting or filing claims with a shipping carrier were also reasonable recommendations but were not explicitly supported by provided company procedures. |
---

# 🏁 Final Verdict

The prompt successfully generated professional, empathetic, and well-structured responses across all three temperature settings. Each output correctly identified the customer's concerns, acknowledged their frustration, requested missing information, and proposed logical internal follow-up actions.

**Temperature 0.5** produced the strongest overall response. It offered the best balance between empathy, clarity, conciseness, and actionable guidance while integrating the request for additional information naturally into the customer-facing response.

Temperature **0.0** was highly structured and thorough but slightly more procedural, while Temperature **1.0** produced polished and personalized language but introduced more unsupported assumptions regarding case prioritization and resolution authority.

A minor weakness across all outputs was the tendency to mention **refunds, replacements, prioritization, or internal procedures without being given the relevant company policies**. Although these suggestions were reasonable, they exceeded the prompt's constraint against making unsupported promises or assumptions.

Overall, the prompt demonstrates **strong instruction adherence, effective tone control, and good hallucination resistance**, but could be improved by explicitly instructing the model to avoid presenting specific remedies such as refunds or replacements unless those remedies are included in the provided company policy.

**Best Performing Temperature:** 0.5  
**Hallucination Risk:** Low  
**Overall Assessment:** Strong / Minor Refinement Recommended
