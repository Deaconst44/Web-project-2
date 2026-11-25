# University Adoptions — Validation Report

**Course:** Web Development II  
**Assignment:** Chapter 14 Project 2 / Signature Assignment  
**Student:** [Name]  
**Date:** [Date of validation]

> Draft: replace the bracketed fields with actual validation results and evidence before submission. The written explanations describe the implemented design, not a verified W3C pass.

## 1. Project overview

This project is a web application that allows users to search university adoption records. The backend uses Node.js, Express and MongoDB through Mongoose. The frontend uses React and the Fetch API. Users can view all adoptions in date order, search by adoption ID or filter records by university ID. The original dataset was not provided, so ten sample records were created using the fields and example IDs described in the assignment. The database name follows the import command in the project instructions.

The application uses a small number of files, with a separate data model, server, import script, React interface and stylesheet. The seed script makes the project easier to run on another computer without relying on personal file paths. The application uses relative API URLs and the server serves the compiled React interface.

## 2. Validation process documentation — 20 points

HTML validation is performed on the markup rendered by React in the browser, rather than only on the initial HTML file. The rendered page is copied from the browser and submitted to the W3C Markup Validation Service using direct input. CSS validation is performed on the project's own stylesheet, `App.css`, with the W3C CSS Validation Service.

| Check | Initial result | Final result | Evidence |
|---|---|---|---|
| Rendered HTML | [Errors/warnings] | [Errors/warnings] | Figures 1 and 3 |
| CSS (profile: [name]) | [Errors/warnings] | [Errors/warnings] | Figures 2 and 4 |

[Insert initial HTML and CSS screenshots with figure captions.]

## 3. Error identification and analysis — 20 points

A validation error indicates that a part of the markup or stylesheet does not follow the rules checked by the validator. Warnings should also be reviewed because they can identify possible compatibility or accessibility concerns. The exact messages are important because they help identify the correct source file and the cause of the problem.

| Validator message and line | Source file | Cause and impact |
|---|---|---|
| [Actual finding or no findings] | [File] | [Explanation] |

If the first check returns no errors, state that result and identify the preventative markup and CSS practices that were reviewed. Do not present a possible error as an actual finding.

## 4. Corrections and fix implementation — 20 points

Corrections must be made in the original React or CSS source. After each correction, the application is rebuilt and the relevant validator is used again. This makes it possible to confirm whether the correction solved the reported problem.

**Finding:** [Actual message]

**Before:** [Original code]

**After:** [Corrected code]

**Result:** [Actual revalidation result]

[Repeat for each real finding, or explain why no correction was necessary. Insert final HTML and CSS validation screenshots as Figures 3 and 4.]

The implementation already uses explicit labels for form controls, table headers with scope, a caption, a declared page language and a clear heading structure. CSS rules are shared between controls where practical, reducing repeated styling. These are design choices, not evidence of errors found by W3C.

## 5. Importance of validation — 20 points

Validation is important because it helps developers identify problems that may not be obvious when looking at a website in one browser. Correct HTML provides a clear structure for browsers and assistive technologies. Valid CSS helps avoid ignored declarations and unexpected design behavior. Following web standards also makes the project easier to maintain because other developers can understand the markup and styles more easily.

For this project, valid table markup helps users understand the relationship between adoption IDs, university IDs and dates. Form labels help users identify the correct search field. Responsive CSS supports different screen sizes, while visible focus helps keyboard users navigate the interface. Validation alone does not guarantee accessibility or a working API, so functional and accessibility tests are also necessary.

## 6. Final review and conclusion — 20 points (professionalism and clarity apply throughout)

| Functional or accessibility check | Observed result |
|---|---|
| All adoptions sorted by date | [Result] |
| Adoption ID 14 | [Result] |
| University ID 100724 | [Result] |
| Invalid and missing IDs | [Result] |
| Keyboard navigation and visible focus | [Result] |
| Mobile layout | [Result] |
| Clean installation from README | [Result] |

The project demonstrates how a React interface can communicate with a Node.js API and a MongoDB database. The application was designed to keep the code simple, portable and easy to maintain. [Summarize actual test and validation results, remaining limitations and what you learned.]

## References

- Course-provided Chapter 14 Project 2 instructions.
- W3C Markup Validation Service: https://validator.w3.org/
- W3C CSS Validation Service: https://jigsaw.w3.org/css-validator/

## Appendix — Evidence

[Insert database, API tests, desktop and mobile screenshots with descriptive captions.]
