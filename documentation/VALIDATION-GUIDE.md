# Validation and evidence guide

Complete this guide after running the application. The official W3C results must be obtained on the student's computer; no results or screenshots have been fabricated.

## 1. Baseline evidence

1. Run the import and MongoDB queries described in the README. Capture the actual results as `01-database-queries.png` (and the import command if used).
2. Run `npm test` in the backend while the server is running. Save a screenshot as `02-api-tests.png`.
3. Open http://127.0.0.1:3000 and confirm all records, Adoption ID 14 and University ID 100724. Save screenshots as `03-all-records.png`, `04-adoption-search.png`, and `05-university-search.png`.

## 2. HTML validation (20 points: documentation, plus analysis and corrections)

React generates the page markup after JavaScript loads. Validating only `frontend/index.html` does not check the actual table and form.

1. Open the built application in Chrome or Edge. Wait until the table appears.
2. Press F12, open the Console and type the following expression. Only execute code you have reviewed. If the browser restricts pasting, type the expression manually.

```javascript
copy('<!doctype html>\n' + document.documentElement.outerHTML)
```

3. Open https://validator.w3.org/ and choose **Validate by Direct Input**. Paste the copied HTML and click **Check**. The checker examines the markup, not the local script or stylesheet resources.
4. Capture the initial results as `06-html-initial.png`. Record the exact messages and line numbers in the report. Save the copied HTML in `documentation/screenshots/rendered-html.html.txt` if desired.
5. Repeat for an empty university result and a missing adoption result, if time permits.

## 3. CSS validation

1. Open https://jigsaw.w3.org/css-validator/.
2. Select **By file upload** and upload `frontend/src/App.css`. Alternatively, paste the complete stylesheet under **By direct input**.
3. Record the CSS profile used and capture `07-css-initial.png`.
4. Review actual errors and warnings. Some modern CSS properties may be flagged depending on the selected profile; distinguish genuine syntax errors from profile limitations, and do not claim a pass if errors remain.

## 4. Analysis and corrections (40 points)

For each actual issue, record the validator message, relevant file and original code, why it happened, corrected code, and revalidation result. Correct JSX in `App.jsx`, not the generated HTML snapshot. Correct CSS in `App.css`. Rebuild with `npm run build` in `frontend` and reload the page. Re-export the rendered HTML before checking it again. Capture `08-html-final.png` and `09-css-final.png`.

If an initial validator reports no errors, report that accurately and document the preventative choices you reviewed. Do not insert artificial errors or describe hypothetical corrections as actual results.

## 5. Accessibility and presentation

- Use Tab from the top of the page: the skip link and all controls should be reachable with visible focus. Enter should submit the form; View all should reset the results.
- Verify both controls have visible labels. Test the search results, loading, missing records and invalid ID errors.
- Use the browser responsive view at 375px width. The controls should stack and the table should scroll within its region, not the whole page. Save `10-mobile.png`.
- In DevTools, run Lighthouse Accessibility (if available) or inspect the Accessibility tree. Record actual findings; do not equate markup validity with full accessibility compliance. Save `11-accessibility.png` if performed.
- Open Console and Network while using all three endpoints; investigate unexpected errors. A deliberate 404 test is an expected error response.

## 6. Final submission

Complete the report, insert evidence with captions and export to PDF if required. Include the source, generated package-lock files and README. Keep the screenshots in this directory. Test the quick-start instructions from a fresh extraction with your local MongoDB server. Use `npm ci` instead of `npm install` once lock files are present.
