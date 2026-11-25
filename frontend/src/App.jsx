import React, { useEffect, useState } from "react";

const api = "/api/adoptions";

function App() {
    const [mode, setMode] = useState("adoption");
    const [id, setId] = useState("");
    const [query, setQuery] = useState({ path: api, label: "All adoptions" });
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function loadRecords() {
            setLoading(true);
            setError("");
            setRecords([]);
            try {
                const response = await fetch(query.path, { signal: controller.signal });
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Unable to load records.");
                if (!controller.signal.aborted) setRecords(Array.isArray(data) ? data : [data]);
            } catch (err) {
                if (!controller.signal.aborted) setError(err.message || "Unable to load records.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        }

        loadRecords();
        return () => controller.abort();
    }, [query]);

    function search(event) {
        event.preventDefault();
        const prefix = mode === "university" ? "/university/" : "/";
        const label = mode === "university" ? "University" : "Adoption";
        setQuery({ path: api + prefix + encodeURIComponent(id), label: `${label} ${id}` });
    }

    function showAll() {
        setId("");
        setQuery({ path: api, label: "All adoptions" });
    }

    return (
        <>
            <a className="skip-link" href="#main-content">Skip to main content</a>
            <header className="site-header">
                <div className="container header-content">
                    <a className="brand" href="/">University Adoptions</a>
                    <span className="header-label">Record explorer</span>
                </div>
            </header>

            <main id="main-content" className="container" tabIndex={-1}>
                <section className="intro" aria-labelledby="page-title">
                    <p className="eyebrow">Academic records / Search</p>
                    <h1 id="page-title">Adoption records</h1>
                    <p>Browse the adoption database, find a specific record, or filter by university.</p>
                </section>

                <section className="panel" aria-labelledby="search-title">
                    <h2 id="search-title">Find a record</h2>
                    <p className="muted">Choose a search type and enter the corresponding ID.</p>
                    <form className="search-form" onSubmit={search}>
                        <div className="field">
                            <label htmlFor="search-type">Search by</label>
                            <select id="search-type" value={mode} onChange={event => { setMode(event.target.value); setId(""); }}>
                                <option value="adoption">Adoption ID</option>
                                <option value="university">University ID</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="record-id">{mode === "adoption" ? "Adoption ID" : "University ID"}</label>
                            <input id="record-id" type="text" inputMode="numeric" pattern="[0-9]+" maxLength={16}
                                required value={id} onChange={event => setId(event.target.value)} aria-describedby="search-hint" />
                            <small id="search-hint">Example: {mode === "adoption" ? "14" : "100724"}</small>
                        </div>
                        <div className="actions">
                            <button type="submit">Search</button>
                            <button type="button" className="secondary" onClick={showAll}>View all</button>
                        </div>
                    </form>
                </section>

                <section className="panel results" aria-labelledby="results-title">
                    <div className="results-heading">
                        <div>
                            <p className="eyebrow">Results</p>
                            <h2 id="results-title">{query.label}</h2>
                        </div>
                        <p className="count" role="status">{loading ? "Loading records..." : error ? "Search unsuccessful" : `${records.length} ${records.length === 1 ? "record" : "records"}`}</p>
                    </div>
                    {error && <p className="error" role="alert">{error}</p>}
                    {!loading && !error && records.length === 0 && <p className="empty">No matching records. Try another ID or view all adoptions.</p>}
                    {!loading && !error && records.length > 0 && (
                        <div className="table-wrap" role="region" aria-label="Adoption records table" tabIndex={0}>
                            <table>
                                <caption>Adoptions sorted by date (oldest first).</caption>
                                <thead>
                                    <tr><th scope="col">Adoption ID</th><th scope="col">University ID</th><th scope="col">Adoption date</th></tr>
                                </thead>
                                <tbody>
                                    {records.map(record => (
                                        <tr key={record.AdoptionID}>
                                            <th scope="row">{record.AdoptionID}</th>
                                            <td>{record.UniversityID}</td>
                                            <td><time dateTime={record.AdoptionDate.slice(0, 10)}>{record.AdoptionDate.slice(0, 10)}</time></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </main>

            <footer className="site-footer">
                <div className="container">Web Development II <span aria-hidden="true">/</span> Chapter 14 Project 2</div>
            </footer>
        </>
    );
}

export default App;
