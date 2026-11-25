import { test } from "node:test";
import assert from "node:assert/strict";

const base = process.env.API_URL || "http://127.0.0.1:3000/api/adoptions";

test("All adoptions are sorted by date", async () => {
    const response = await fetch(base);
    assert.equal(response.status, 200);
    const records = await response.json();
    assert.equal(records.length, 10);
    assert.deepEqual(records.map(r => r.AdoptionID), [15, 19, 21, 16, 14, 17, 23, 18, 20, 22]);
});

test("Adoption 14 returns one object", async () => {
    const response = await fetch(`${base}/14`);
    assert.equal(response.status, 200);
    const record = await response.json();
    assert.equal(record.AdoptionID, 14);
    assert.equal(record.UniversityID, 100724);
});

test("University 100724 returns three matching records", async () => {
    const response = await fetch(`${base}/university/100724`);
    assert.equal(response.status, 200);
    const records = await response.json();
    assert.equal(records.length, 3);
    assert.ok(records.every(record => record.UniversityID === 100724));
});

test("Invalid IDs return 400", async () => {
    for (const path of ["/abc", "/0", "/university/abc"]) {
        assert.equal((await fetch(base + path)).status, 400);
    }
});

test("Unknown adoption returns 404", async () => {
    assert.equal((await fetch(`${base}/999`)).status, 404);
});

test("Unknown university returns an empty array", async () => {
    const response = await fetch(`${base}/university/999`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), []);
});
