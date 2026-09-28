(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$domain$2d$directory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/domain-directory.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function Page() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [accessType, setAccessType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [checkingAccess, setCheckingAccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [accessUnavailable, setAccessUnavailable] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            let active = true;
            async function checkAccess() {
                const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDirectoryAccess"])();
                if (!active) return;
                if (access.status === 'unavailable') {
                    setAccessType(null);
                    setAccessUnavailable(true);
                    setCheckingAccess(false);
                    return;
                }
                if (access.status === 'denied') {
                    setAccessType(null);
                    setCheckingAccess(false);
                    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                    router.replace(session ? '/unauthorized' : '/login');
                    return;
                }
                setAccessUnavailable(false);
                setAccessType(access.accessType);
                setCheckingAccess(false);
            }
            void checkAccess();
            const { data: { subscription } } = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "Page.useEffect": (event)=>{
                    if (event === 'SIGNED_OUT') {
                        setAccessType(null);
                        router.replace('/login');
                    } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
                        void checkAccess();
                    }
                }
            }["Page.useEffect"]);
            function revalidateWhenVisible() {
                if (document.visibilityState === 'visible') void checkAccess();
            }
            document.addEventListener('visibilitychange', revalidateWhenVisible);
            const accessCheckInterval = window.setInterval({
                "Page.useEffect.accessCheckInterval": ()=>void checkAccess()
            }["Page.useEffect.accessCheckInterval"], 60_000);
            return ({
                "Page.useEffect": ()=>{
                    active = false;
                    subscription.unsubscribe();
                    document.removeEventListener('visibilitychange', revalidateWhenVisible);
                    window.clearInterval(accessCheckInterval);
                }
            })["Page.useEffect"];
        }
    }["Page.useEffect"], [
        router
    ]);
    if (checkingAccess || !accessType) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "flex min-h-screen items-center justify-center bg-[#07111f] text-[#dce6f5]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center text-sm text-[#9aaec7]",
                children: checkingAccess ? 'Verifying access…' : accessUnavailable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Access verification is temporarily unavailable."
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 66,
                            columnNumber: 123
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>{
                                setCheckingAccess(true);
                                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDirectoryAccess"])().then((access)=>{
                                    if (access.status === 'authorized') {
                                        setAccessType(access.accessType);
                                        setAccessUnavailable(false);
                                    } else if (access.status === 'denied') router.replace('/login');
                                    else {
                                        setAccessUnavailable(true);
                                        setCheckingAccess(false);
                                    }
                                });
                            },
                            className: "mt-3 text-[#9bb0ff] hover:text-white",
                            children: "Retry"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 66,
                            columnNumber: 177
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/page.tsx",
                    lineNumber: 66,
                    columnNumber: 121
                }, this) : 'Redirecting…'
            }, void 0, false, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/page.tsx",
            lineNumber: 65,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$domain$2d$directory$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        accessType: accessType
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 71,
        columnNumber: 10
    }, this);
}
_s(Page, "4i2eZNi3POev99/i8B3s91XLAHM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/csv-import-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CsvImportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.mjs [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.mjs [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.mjs [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2d$import$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/csv-import.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CsvImportDialog({ existing, onClose, onImported }) {
    _s();
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [summary, setSummary] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filter, setFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [dragging, setDragging] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    async function handleFile(file) {
        if (!file) return;
        setError(null);
        setResult(null);
        if (!file.name.toLowerCase().endsWith('.csv') && file.type !== 'text/csv') {
            setError('Please choose a CSV file.');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError('This file is larger than 10 MB. Please split it into smaller CSV files.');
            return;
        }
        try {
            setBusy(true);
            setSummary(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$csv$2d$import$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseAndClassifyCsv"])(file, existing));
            setFileName(file.name);
        } catch (parseError) {
            setSummary(null);
            setFileName('');
            setError(parseError instanceof Error ? parseError.message : 'Could not validate this CSV file.');
        } finally{
            setBusy(false);
        }
    }
    function visibleItems() {
        if (!summary) return [];
        if (filter === 'issues') return [
            ...summary.duplicateItems,
            ...summary.invalidItems
        ];
        if (filter === 'new') return summary.newItems;
        if (filter === 'changed') return summary.changedItems;
        if (filter === 'unchanged') return summary.unchangedItems;
        return summary.items;
    }
    async function importChanges() {
        if (!summary) return;
        setError(null);
        setBusy(true);
        try {
            const rows = summary.items.flatMap((item)=>item.record && [
                    'new',
                    'changed',
                    'unchanged'
                ].includes(item.status) ? [
                    {
                        domain: item.record.domain,
                        brand: item.record.brand,
                        manager: item.record.manager,
                        source: item.record.source
                    }
                ] : []);
            const headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryRequestHeaders"])();
            const response = await fetch('/api/domains/import', {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rows
                }),
                cache: 'no-store'
            });
            const body = await response.json();
            if (!response.ok || !body.result) throw new Error(body.error ?? 'The import was not completed. No rows were committed.');
            await onImported();
            setResult(body.result);
        } catch (importError) {
            setError(importError instanceof Error ? importError.message : 'The import was not completed. No rows were committed; review the directory before retrying.');
        } finally{
            setBusy(false);
        }
    }
    const tabs = summary ? [
        [
            'all',
            'All',
            summary.items.length
        ],
        [
            'new',
            'New',
            summary.newItems.length
        ],
        [
            'changed',
            'Changed',
            summary.changedItems.length
        ],
        [
            'unchanged',
            'Unchanged',
            summary.unchangedItems.length
        ],
        [
            'issues',
            'Issues',
            summary.duplicateItems.length + summary.invalidItems.length
        ]
    ] : [];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 overflow-y-auto bg-[#020914]/80 p-4 backdrop-blur-sm",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "import-dialog-title",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto my-8 w-full max-w-4xl rounded-xl border border-[#294563] bg-[#0d1d31] p-5 shadow-2xl sm:p-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "import-dialog-title",
                                    className: "text-xl font-semibold text-white",
                                    children: result ? 'Import complete' : 'Import domains'
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 88,
                                    columnNumber: 347
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm text-[#8197b4]",
                                    children: result ? 'Your directory has been refreshed with the accepted changes.' : 'Upload a CSV to add new domains or update existing records.'
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 88,
                                    columnNumber: 473
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 88,
                            columnNumber: 342
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Close import dialog",
                            onClick: onClose,
                            disabled: busy,
                            className: "rounded-md p-1 text-[#7890ad] hover:bg-[#1a3553] hover:text-white disabled:opacity-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "size-5"
                            }, void 0, false, {
                                fileName: "[project]/components/csv-import-dialog.tsx",
                                lineNumber: 88,
                                columnNumber: 836
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 88,
                            columnNumber: 663
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/csv-import-dialog.tsx",
                    lineNumber: 88,
                    columnNumber: 286
                }, this),
                result ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-3 sm:grid-cols-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultStat, {
                                    label: "Added",
                                    value: result.added
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 80
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultStat, {
                                    label: "Updated",
                                    value: result.updated
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 129
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResultStat, {
                                    label: "Unchanged",
                                    value: result.unchanged
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 90,
                                    columnNumber: 182
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 90,
                            columnNumber: 37
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 text-center text-xs text-[#9aacc1]",
                            children: [
                                summary?.duplicateItems.length ?? 0,
                                " duplicates and ",
                                summary?.invalidItems.length ?? 0,
                                " invalid rows skipped."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 90,
                            columnNumber: 245
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-7 flex justify-end",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClose,
                                className: "rounded-lg bg-[#3964f4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4b73ff]",
                                children: "Done"
                            }, void 0, false, {
                                fileName: "[project]/components/csv-import-dialog.tsx",
                                lineNumber: 90,
                                columnNumber: 453
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 90,
                            columnNumber: 414
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/csv-import-dialog.tsx",
                    lineNumber: 90,
                    columnNumber: 15
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        !summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            onDragOver: (event)=>{
                                event.preventDefault();
                                setDragging(true);
                            },
                            onDragLeave: ()=>setDragging(false),
                            onDrop: (event)=>{
                                event.preventDefault();
                                setDragging(false);
                                void handleFile(event.dataTransfer.files[0]);
                            },
                            className: `mt-6 flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 text-center transition ${dragging ? 'border-[#83a0ff] bg-[#172e5b]' : 'border-[#355374] bg-[#0a1727] hover:border-[#6689ff] hover:bg-[#0e2138]'}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    ref: inputRef,
                                    type: "file",
                                    accept: ".csv,text/csv",
                                    className: "sr-only",
                                    onChange: (event)=>void handleFile(event.target.files?.[0])
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 516
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                    className: "size-8 text-[#6f91e9]"
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 658
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-3 text-sm font-semibold text-white",
                                    children: "Drop your CSV here"
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 702
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-1 text-xs text-[#8197b4]",
                                    children: "or choose a file from your computer"
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 783
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "mt-4 inline-flex items-center gap-2 rounded-lg border border-[#294563] bg-[#12263d] px-3 py-2 text-xs font-semibold text-[#dce6f5]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            className: "size-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 91,
                                            columnNumber: 1020
                                        }, this),
                                        " Choose CSV"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 91,
                                    columnNumber: 871
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 91,
                            columnNumber: 20
                        }, this),
                        fileName && !summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-xs text-[#8197b4]",
                            children: [
                                "Selected: ",
                                fileName
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 92,
                            columnNumber: 32
                        }, this),
                        summary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 grid gap-3 sm:grid-cols-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStat, {
                                            label: "Rows found",
                                            value: summary.items.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 69
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStat, {
                                            label: "New",
                                            value: summary.newItems.length,
                                            tone: "green"
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 132
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStat, {
                                            label: "Changed",
                                            value: summary.changedItems.length,
                                            tone: "blue"
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 204
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStat, {
                                            label: "Unchanged",
                                            value: summary.unchangedItems.length
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 283
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryStat, {
                                            label: "Issues",
                                            value: summary.duplicateItems.length + summary.invalidItems.length,
                                            tone: "red"
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 354
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 93,
                                    columnNumber: 21
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex flex-wrap gap-2 border-b border-[#1b2c43] pb-4",
                                    children: tabs.map(([value, label, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setFilter(value),
                                            className: `rounded-md px-3 py-1.5 text-xs font-semibold ${filter === value ? 'bg-[#dce8ff] text-[#162b5f]' : 'bg-[#102239] text-[#91a6c0] hover:text-white'}`,
                                            children: [
                                                label,
                                                " ",
                                                count
                                            ]
                                        }, value, true, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 580
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 93,
                                    columnNumber: 469
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 max-h-80 overflow-y-auto rounded-lg border border-[#1d3550]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "divide-y divide-[#1b2c43]",
                                            children: visibleItems().slice(0, 250).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreviewItem, {
                                                    item: item
                                                }, `${item.rowNumber}-${item.status}`, false, {
                                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 1008
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 921
                                        }, this),
                                        visibleItems().length > 250 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "p-3 text-center text-xs text-[#8197b4]",
                                            children: "Showing the first 250 rows in this preview."
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 1116
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 93,
                                    columnNumber: 839
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-sm text-[#b8c9dc]",
                                    children: [
                                        summary.newItems.length + summary.changedItems.length,
                                        " domains will be written. ",
                                        summary.unchangedItems.length,
                                        " unchanged records will be skipped."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 93,
                                    columnNumber: 1224
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex items-center justify-between gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setSummary(null);
                                                setFileName('');
                                                setError(null);
                                            },
                                            className: "text-sm font-medium text-[#9fb4d0] hover:text-white",
                                            children: "Choose another file"
                                        }, void 0, false, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 1480
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: onClose,
                                                    className: "rounded-lg border border-[#294563] px-4 py-2.5 text-sm font-medium text-[#a9bad0] hover:bg-[#152b47]",
                                                    children: "Cancel"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 1692
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>void importChanges(),
                                                    disabled: busy || summary.newItems.length + summary.changedItems.length === 0,
                                                    className: "rounded-lg bg-[#3964f4] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4b73ff] disabled:cursor-not-allowed disabled:opacity-50",
                                                    children: busy ? 'Importing...' : 'Import changes'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                                    lineNumber: 93,
                                                    columnNumber: 1860
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/csv-import-dialog.tsx",
                                            lineNumber: 93,
                                            columnNumber: 1664
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/csv-import-dialog.tsx",
                                    lineNumber: 93,
                                    columnNumber: 1418
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 93,
                            columnNumber: 19
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 rounded-lg border border-[#5c2b39] bg-[#2a1a22] px-3 py-2 text-sm text-[#ffb4c1]",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/components/csv-import-dialog.tsx",
                            lineNumber: 94,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/csv-import-dialog.tsx",
                    lineNumber: 90,
                    columnNumber: 621
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/csv-import-dialog.tsx",
            lineNumber: 88,
            columnNumber: 169
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/csv-import-dialog.tsx",
        lineNumber: 88,
        columnNumber: 10
    }, this);
}
_s(CsvImportDialog, "/+E9ZjFuKjuDv/TgUW7nj8fiib4=");
_c = CsvImportDialog;
function SummaryStat({ label, value, tone = 'default' }) {
    const colors = {
        default: 'border-[#294563] bg-[#102239]',
        green: 'border-[#23604f] bg-[#12382f]',
        blue: 'border-[#294d8a] bg-[#142c59]',
        red: 'border-[#633744] bg-[#321d27]'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-lg border p-3 ${colors[tone]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-mono text-xl font-semibold text-white",
                children: value.toLocaleString('en-US')
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 101,
                columnNumber: 67
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-[#9aacc1]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 101,
                columnNumber: 164
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/csv-import-dialog.tsx",
        lineNumber: 101,
        columnNumber: 10
    }, this);
}
_c1 = SummaryStat;
function ResultStat({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-lg border border-[#294563] bg-[#102239] p-4 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                className: "mx-auto size-5 text-[#55c7a6]"
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 105,
                columnNumber: 91
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 font-mono text-2xl font-semibold text-white",
                children: value.toLocaleString('en-US')
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 105,
                columnNumber: 149
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-[#9aacc1]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 105,
                columnNumber: 252
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/csv-import-dialog.tsx",
        lineNumber: 105,
        columnNumber: 10
    }, this);
}
_c2 = ResultStat;
function PreviewItem({ item }) {
    const statusStyles = {
        new: 'text-[#65d3ac]',
        changed: 'text-[#83a9ff]',
        unchanged: 'text-[#9aacc1]',
        duplicate: 'text-[#f1b76a]',
        invalid: 'text-[#ff9da5]'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-3 text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[#dce6f5]",
                        children: item.record?.domain || `Row ${item.rowNumber}`
                    }, void 0, false, {
                        fileName: "[project]/components/csv-import-dialog.tsx",
                        lineNumber: 110,
                        columnNumber: 106
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `font-semibold uppercase ${statusStyles[item.status]}`,
                        children: item.status
                    }, void 0, false, {
                        fileName: "[project]/components/csv-import-dialog.tsx",
                        lineNumber: 110,
                        columnNumber: 204
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 110,
                columnNumber: 39
            }, this),
            item.message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-[#ffb4c1]",
                children: item.message
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 110,
                columnNumber: 320
            }, this),
            item.changes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 grid gap-1 text-[#9aacc1] sm:grid-cols-2",
                children: item.changes.map((change)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "text-[#c6d5e7]",
                                children: [
                                    change.label,
                                    ":"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/csv-import-dialog.tsx",
                                lineNumber: 110,
                                columnNumber: 520
                            }, this),
                            " ",
                            change.from,
                            " → ",
                            change.to
                        ]
                    }, change.field, true, {
                        fileName: "[project]/components/csv-import-dialog.tsx",
                        lineNumber: 110,
                        columnNumber: 495
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/csv-import-dialog.tsx",
                lineNumber: 110,
                columnNumber: 402
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/csv-import-dialog.tsx",
        lineNumber: 110,
        columnNumber: 10
    }, this);
}
_c3 = PreviewItem;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "CsvImportDialog");
__turbopack_context__.k.register(_c1, "SummaryStat");
__turbopack_context__.k.register(_c2, "ResultStat");
__turbopack_context__.k.register(_c3, "PreviewItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/domain-directory.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DomainDirectory",
    ()=>DomainDirectory,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.mjs [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.mjs [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/database.mjs [app-client] (ecmascript) <export default as Database>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$earth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/earth.mjs [app-client] (ecmascript) <export default as Globe2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.mjs [app-client] (ecmascript) <export default as Layers3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-dashboard.mjs [app-client] (ecmascript) <export default as LayoutDashboard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.mjs [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.mjs [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.mjs [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.mjs [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.mjs [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash.mjs [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.mjs [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$import$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/csv-import-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
const domainBatchSize = 1000;
const pageSizeOptions = [
    10,
    25,
    50
];
function formatCount(value) {
    return value.toLocaleString('en-US');
}
function DomainDirectory({ accessType }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [domains, setDomains] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [scope, setScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [segment, setSegment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('All');
    const [page, setPage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [pageSize, setPageSize] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [openMenu, setOpenMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingDomain, setEditingDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [removingDomain, setRemovingDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [adding, setAdding] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newDomain, setNewDomain] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newOwner, setNewOwner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Our team');
    const [newSegment, setNewSegment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Unassigned');
    const [newSource, setNewSource] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('internal');
    const [importing, setImporting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function loadDomains() {
        setLoading(true);
        setError(null);
        const records = [];
        let offset = 0;
        while(true){
            const headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryRequestHeaders"])();
            const response = await fetch(`/api/domains?offset=${offset}&limit=${domainBatchSize}`, {
                headers,
                cache: 'no-store'
            });
            if (!response.ok) {
                setError(response.status === 401 || response.status === 403 ? 'Your directory access has expired.' : 'Domain data could not be loaded.');
                setLoading(false);
                return;
            }
            const { domains: data } = await response.json();
            const batch = data ?? [];
            records.push(...batch);
            if (batch.length < domainBatchSize) break;
            offset += batch.length;
        }
        setDomains(records.map((record)=>({
                id: record.id,
                name: record.domain,
                owner: record.manager ?? 'Unassigned',
                segment: record.brand ?? 'Unassigned',
                tld: record.source ?? 'Unassigned'
            })));
        setLoading(false);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomainDirectory.useEffect": ()=>{
            void loadDomains();
        }
    }["DomainDirectory.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomainDirectory.useEffect": ()=>{
            setPage(1);
        }
    }["DomainDirectory.useEffect"], [
        query,
        scope,
        segment,
        pageSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DomainDirectory.useEffect": ()=>{
            function closeMenu(event) {
                if (!event.target.closest('[data-domain-menu]')) setOpenMenu(null);
            }
            document.addEventListener('click', closeMenu);
            return ({
                "DomainDirectory.useEffect": ()=>document.removeEventListener('click', closeMenu)
            })["DomainDirectory.useEffect"];
        }
    }["DomainDirectory.useEffect"], []);
    const segmentFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DomainDirectory.useMemo[segmentFilters]": ()=>{
            const segmentNames = Array.from(new Set(domains.map({
                "DomainDirectory.useMemo[segmentFilters].segmentNames": (domain)=>domain.segment
            }["DomainDirectory.useMemo[segmentFilters].segmentNames"]))).sort();
            return [
                [
                    'All',
                    domains.length
                ],
                ...segmentNames.map({
                    "DomainDirectory.useMemo[segmentFilters]": (name)=>[
                            name,
                            domains.filter({
                                "DomainDirectory.useMemo[segmentFilters]": (domain)=>domain.segment === name
                            }["DomainDirectory.useMemo[segmentFilters]"]).length
                        ]
                }["DomainDirectory.useMemo[segmentFilters]"])
            ];
        }
    }["DomainDirectory.useMemo[segmentFilters]"], [
        domains
    ]);
    const filteredDomains = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DomainDirectory.useMemo[filteredDomains]": ()=>domains.filter({
                "DomainDirectory.useMemo[filteredDomains]": (domain)=>{
                    const matchesQuery = domain.name.toLowerCase().includes(query.toLowerCase());
                    return matchesQuery && (scope === 'All' || domain.owner === scope) && (segment === 'All' || domain.segment === segment);
                }
            }["DomainDirectory.useMemo[filteredDomains]"])
    }["DomainDirectory.useMemo[filteredDomains]"], [
        domains,
        query,
        scope,
        segment
    ]);
    const totalPages = Math.max(1, Math.ceil(filteredDomains.length / pageSize));
    const currentPage = Math.min(page, totalPages);
    const pageDomains = filteredDomains.slice((currentPage - 1) * pageSize, currentPage * pageSize);
    const firstResult = filteredDomains.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const lastResult = Math.min(currentPage * pageSize, filteredDomains.length);
    const pageNumbers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DomainDirectory.useMemo[pageNumbers]": ()=>{
            const pages = new Set([
                1,
                totalPages,
                currentPage,
                currentPage - 1,
                currentPage + 1,
                2,
                3
            ]);
            return Array.from(pages).filter({
                "DomainDirectory.useMemo[pageNumbers]": (number)=>number > 0 && number <= totalPages
            }["DomainDirectory.useMemo[pageNumbers]"]).sort({
                "DomainDirectory.useMemo[pageNumbers]": (a, b)=>a - b
            }["DomainDirectory.useMemo[pageNumbers]"]);
        }
    }["DomainDirectory.useMemo[pageNumbers]"], [
        currentPage,
        totalPages
    ]);
    const totalDomains = domains.length;
    const teamDomains = domains.filter((domain)=>domain.owner === 'Our team').length;
    const aphexDomains = domains.filter((domain)=>domain.owner === 'Aphex Media').length;
    const segments = new Set(domains.map((domain)=>domain.segment)).size;
    async function saveEdit() {
        const value = draft.trim();
        if (!value || !editingDomain) return;
        const headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryRequestHeaders"])();
        const response = await fetch('/api/domains', {
            method: 'PATCH',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: editingDomain.id,
                domain: value
            })
        });
        if (!response.ok) {
            setError('The domain could not be updated. Check your access and try again.');
            return;
        }
        setEditingDomain(null);
        await loadDomains();
    }
    async function addDomain() {
        const value = newDomain.trim();
        if (!value) return;
        const headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryRequestHeaders"])();
        const response = await fetch('/api/domains', {
            method: 'POST',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                domain: value,
                manager: newOwner,
                brand: newSegment,
                source: newSource.trim() || 'internal'
            })
        });
        if (!response.ok) {
            setError(response.status === 403 ? 'Only internal users can add domains.' : 'The domain could not be added. It may already exist.');
            return;
        }
        setNewDomain('');
        setNewOwner('Our team');
        setNewSegment('Unassigned');
        setNewSource('internal');
        setAdding(false);
        await loadDomains();
    }
    async function removeDomain() {
        if (!removingDomain) return;
        const headers = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDirectoryRequestHeaders"])();
        const response = await fetch('/api/domains', {
            method: 'DELETE',
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: removingDomain.id
            })
        });
        if (!response.ok) {
            setError('The domain could not be removed. Check your access and try again.');
            return;
        }
        setRemovingDomain(null);
        await loadDomains();
    }
    async function handleSignOut() {
        if (accessType === 'internal') await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        await fetch('/api/auth/logout', {
            method: 'POST'
        });
        router.replace('/login');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#07111f] text-[#dce6f5]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "fixed inset-y-0 left-0 z-20 hidden w-[224px] border-r border-[#1c2d43] bg-[#091727] px-4 py-6 lg:flex lg:flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 px-3 text-lg font-bold tracking-tight text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "grid size-7 place-items-center rounded-lg bg-[#3868f4] text-xs italic",
                                children: "S"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 204,
                                columnNumber: 99
                            }, this),
                            " SEO-TEAM"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mt-10 space-y-1",
                        "aria-label": "Primary navigation",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$dashboard$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutDashboard$3e$__["LayoutDashboard"],
                                label: "Dashboard"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$earth$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe2$3e$__["Globe2"],
                                label: "Domains",
                                active: true
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                                label: "Analytics"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 208,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                label: "Team"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
                                label: "Settings"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 203,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen lg:pl-[224px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10 lg:py-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-7 flex items-center gap-3 lg:hidden",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "grid size-8 place-items-center rounded-lg bg-[#3868f4] text-xs italic",
                                    children: "S"
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 216,
                                    columnNumber: 67
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-white",
                                    children: "SEO-TEAM"
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 216,
                                    columnNumber: 163
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-auto text-xs text-[#7188a7]",
                                    children: "Operations"
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 216,
                                    columnNumber: 217
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                            className: "mb-8 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6d84a3]",
                                            children: "Operations"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 219,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "mt-2 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[38px]",
                                            children: "Domain Directory"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 220,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: handleSignOut,
                                            className: "inline-flex h-10 items-center rounded-lg border border-[#294563] bg-[#0f2135] px-3 text-sm font-medium text-[#dce6f5] transition hover:bg-[#152d47]",
                                            children: "Log out"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this),
                                        accessType === 'internal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setImporting(true),
                                                    className: "inline-flex h-10 items-center gap-2 rounded-lg border border-[#3c5d9a] bg-[#102753] px-4 text-sm font-semibold text-[#c9d7ff] transition hover:bg-[#173568] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb0ff]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UploadIcon, {}, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 349
                                                        }, this),
                                                        " Import CSV"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 47
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setAdding(true),
                                                    className: "inline-flex h-10 items-center gap-2 rounded-lg bg-[#3964f4] px-4 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(49,92,243,0.2)] transition hover:bg-[#4b73ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9bb0ff]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "size-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 680
                                                        }, this),
                                                        " Add domain"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 383
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 224,
                                            columnNumber: 45
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 217,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
                            "aria-label": "Domain summary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Database$3e$__["Database"],
                                    label: "Total domains",
                                    value: totalDomains,
                                    tone: "blue",
                                    loading: loading
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
                                    label: "Our team",
                                    value: teamDomains,
                                    tone: "indigo",
                                    loading: loading
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
                                    label: "Aphex Media",
                                    value: aphexDomains,
                                    tone: "orange",
                                    loading: loading
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 231,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SummaryCard, {
                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"],
                                    label: "Segments",
                                    value: segments,
                                    tone: "teal",
                                    loading: loading
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 232,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "mt-7 rounded-xl border border-[#1c3048] bg-[#0c1a2b] shadow-[0_16px_50px_rgba(0,0,0,0.14)]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 border-b border-[#1b2c43] p-4 lg:p-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    role: "group",
                                                    "aria-label": "Owner filters",
                                                    children: [
                                                        'All',
                                                        'Our team',
                                                        'Aphex Media'
                                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FilterButton, {
                                                            active: scope === item,
                                                            onClick: ()=>setScope(item),
                                                            icon: item === 'All' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers3$3e$__["Layers3"] : item === 'Our team' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"],
                                                            children: [
                                                                item,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: formatCount(domains.filter((domain)=>item === 'All' || domain.owner === item).length)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 239,
                                                                    columnNumber: 242
                                                                }, this)
                                                            ]
                                                        }, item, true, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 239,
                                                            columnNumber: 80
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-xs text-[#8aa0bd]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                                                            className: "size-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 81
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: "View"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 123
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: pageSize,
                                                            onChange: (event)=>setPageSize(Number(event.target.value)),
                                                            "aria-label": "Rows per page",
                                                            className: "rounded-md border border-[#273d59] bg-[#102239] px-2 py-1.5 text-xs text-[#c8d5e7] outline-none focus:border-[#6382ed]",
                                                            children: pageSizeOptions.map((option)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: option,
                                                                    children: [
                                                                        option,
                                                                        " per page"
                                                                    ]
                                                                }, option, true, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 241,
                                                                    columnNumber: 418
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 241,
                                                            columnNumber: 140
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 237,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            role: "group",
                                            "aria-label": "Segment filters",
                                            children: segmentFilters.map(([item, count])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSegment(item),
                                                    className: `rounded-md border px-3 py-1.5 text-xs transition ${segment === item ? 'border-[#6689ff] bg-[#203e86] text-white' : 'border-[#223a57] bg-[#0e2138] text-[#91a6c0] hover:border-[#3d5d87] hover:text-white'}`,
                                                    children: [
                                                        item,
                                                        " ",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "ml-1 text-[#7892b1]",
                                                            children: formatCount(count)
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 332
                                                        }, this)
                                                    ]
                                                }, item, true, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 56
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 243,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-[#1b2c43] p-4 lg:p-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative max-w-xl",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#6f87a5]"
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 249,
                                                columnNumber: 50
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                htmlFor: "domain-search",
                                                className: "sr-only",
                                                children: "Search domains"
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 249,
                                                columnNumber: 155
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "domain-search",
                                                value: query,
                                                onChange: (event)=>setQuery(event.target.value),
                                                placeholder: "Search domains...",
                                                className: "h-10 w-full rounded-lg border border-[#263d59] bg-[#0a1727] pl-10 pr-10 text-sm text-white outline-none placeholder:text-[#627995] transition focus:border-[#5f80e9] focus:ring-2 focus:ring-[#315cf3]/20"
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 249,
                                                columnNumber: 228
                                            }, this),
                                            query && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                "aria-label": "Clear search",
                                                onClick: ()=>setQuery(''),
                                                className: "absolute right-3 top-1/2 -translate-y-1/2 text-[#7890ad] hover:text-white",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "size-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 726
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 249,
                                                columnNumber: 577
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/domain-directory.tsx",
                                        lineNumber: 249,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 248,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full min-w-[760px] border-collapse text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "border-b border-[#1b2c43] bg-[#0e1e32] text-[10px] font-semibold uppercase tracking-[0.16em] text-[#6f86a4]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "w-10 px-5 py-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "sr-only",
                                                                    children: "Select"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 179
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block size-3 rounded border border-[#58708e]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 254,
                                                                    columnNumber: 218
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 148
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-3",
                                                            children: "Domain"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 288
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-3",
                                                            children: "Owner"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 325
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-3",
                                                            children: "Segment"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 361
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "px-3 py-3",
                                                            children: "Registry / Source"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 399
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "w-14 px-3 py-3 text-right",
                                                            children: "Actions"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/domain-directory.tsx",
                                                            lineNumber: 254,
                                                            columnNumber: 447
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 254,
                                                    columnNumber: 24
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "px-5 py-16 text-center text-sm text-[#7890ad]",
                                                        children: "Loading domains..."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 39
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 35
                                                }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "px-5 py-16 text-center text-sm text-[#ff9da5]",
                                                        children: [
                                                            "Unable to load domains: ",
                                                            error
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 156
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 152
                                                }, this) : pageDomains.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                        colSpan: 6,
                                                        className: "px-5 py-16 text-center text-sm text-[#7890ad]",
                                                        children: "No domains match the current search and filters."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 305
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 255,
                                                    columnNumber: 301
                                                }, this) : pageDomains.map((domain)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "border-b border-[#172a40] transition hover:bg-[#102239]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-5 py-3.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block size-3 rounded border border-[#45617f]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 256,
                                                                    columnNumber: 47
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-3.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-mono text-sm text-[#d9e6f5]",
                                                                    children: domain.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 257,
                                                                    columnNumber: 47
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 257,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-3.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${domain.owner === 'Our team' ? 'bg-[#123c72] text-[#83b6ff]' : 'bg-[#3b2b1e] text-[#e8ad69]'}`,
                                                                    children: domain.owner
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 258,
                                                                    columnNumber: 47
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 258,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-3.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-2 text-xs text-[#b5c4d8]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: `grid size-5 place-items-center rounded-full text-[10px] font-bold ${segmentColor(domain.segment)}`,
                                                                            children: domain.segment.charAt(0)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/domain-directory.tsx",
                                                                            lineNumber: 259,
                                                                            columnNumber: 119
                                                                        }, this),
                                                                        domain.segment
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 259,
                                                                    columnNumber: 47
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 259,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "px-3 py-3.5",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "rounded-md border border-[#29415d] bg-[#102239] px-2 py-1 font-mono text-[11px] text-[#9db0c9]",
                                                                    children: domain.tld
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 260,
                                                                    columnNumber: 47
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "relative px-3 py-3.5 text-right",
                                                                "data-domain-menu": true,
                                                                children: accessType === 'internal' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            "aria-label": `Actions for ${domain.name}`,
                                                                            "aria-expanded": openMenu === domain.id,
                                                                            onClick: ()=>setOpenMenu(openMenu === domain.id ? null : domain.id),
                                                                            className: "rounded-md p-1.5 text-[#7890ad] hover:bg-[#1b3554] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6586f1]",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                                                className: "size-4"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                                lineNumber: 261,
                                                                                columnNumber: 433
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/domain-directory.tsx",
                                                                            lineNumber: 261,
                                                                            columnNumber: 116
                                                                        }, this),
                                                                        openMenu === domain.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "absolute right-4 top-11 z-10 w-32 rounded-lg border border-[#2a4564] bg-[#102239] p-1 text-left shadow-xl",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>{
                                                                                        setEditingDomain(domain);
                                                                                        setDraft(domain.name);
                                                                                        setOpenMenu(null);
                                                                                    },
                                                                                    className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#c4d3e5] hover:bg-[#1a3553]",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PencilIcon, {}, void 0, false, {
                                                                                            fileName: "[project]/components/domain-directory.tsx",
                                                                                            lineNumber: 261,
                                                                                            columnNumber: 830
                                                                                        }, this),
                                                                                        " Edit"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                                    lineNumber: 261,
                                                                                    columnNumber: 629
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    onClick: ()=>{
                                                                                        setRemovingDomain(domain);
                                                                                        setOpenMenu(null);
                                                                                    },
                                                                                    className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs text-[#ff9da5] hover:bg-[#3b2029]",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                            className: "size-3.5"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/components/domain-directory.tsx",
                                                                                            lineNumber: 261,
                                                                                            columnNumber: 1037
                                                                                        }, this),
                                                                                        " Remove"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                                    lineNumber: 261,
                                                                                    columnNumber: 858
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/components/domain-directory.tsx",
                                                                            lineNumber: 261,
                                                                            columnNumber: 506
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/domain-directory.tsx",
                                                                    lineNumber: 261,
                                                                    columnNumber: 114
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 261,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, domain.id, true, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 255,
                                                        columnNumber: 468
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/domain-directory.tsx",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/domain-directory.tsx",
                                        lineNumber: 253,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-4 px-5 py-4 text-xs text-[#7890ad] sm:flex-row sm:items-center sm:justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "Showing ",
                                                firstResult,
                                                "–",
                                                lastResult,
                                                " of ",
                                                formatCount(filteredDomains.length),
                                                " domains"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 266,
                                            columnNumber: 130
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    "aria-label": "Previous page",
                                                    disabled: currentPage === 1,
                                                    onClick: ()=>setPage((value)=>Math.max(1, value - 1)),
                                                    className: "grid size-7 place-items-center rounded-md border border-[#263d59] disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[#172e4b]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                        className: "size-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 535
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 267
                                                }, this),
                                                pageNumbers.map((number, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center",
                                                        children: [
                                                            index > 0 && pageNumbers[index - 1] !== number - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1 text-[#506985]",
                                                                children: "..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 718
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                "aria-label": `Page ${number}`,
                                                                "aria-current": number === currentPage ? 'page' : undefined,
                                                                onClick: ()=>setPage(number),
                                                                className: `grid size-7 place-items-center rounded-md border text-xs ${number === currentPage ? 'border-[#688cff] bg-[#2648a8] text-white' : 'border-transparent text-[#8da2bd] hover:border-[#304d70] hover:bg-[#172e4b]'}`,
                                                                children: number
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/domain-directory.tsx",
                                                                lineNumber: 266,
                                                                columnNumber: 767
                                                            }, this)
                                                        ]
                                                    }, number, true, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 614
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    "aria-label": "Next page",
                                                    disabled: currentPage === totalPages,
                                                    onClick: ()=>setPage((value)=>Math.min(totalPages, value + 1)),
                                                    className: "grid size-7 place-items-center rounded-md border border-[#263d59] disabled:cursor-not-allowed disabled:opacity-35 hover:bg-[#172e4b]",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                        className: "size-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/domain-directory.tsx",
                                                        lineNumber: 266,
                                                        columnNumber: 1426
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/domain-directory.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 1144
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 266,
                                            columnNumber: 226
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 266,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                            className: "flex flex-col gap-2 px-1 py-6 text-xs text-[#5e7693] sm:flex-row sm:items-center sm:justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Shared directory · Supabase is the source of truth."
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 268,
                                    columnNumber: 131
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"], {
                                            className: "size-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 268,
                                            columnNumber: 246
                                        }, this),
                                        " Internal operations"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 268,
                                    columnNumber: 195
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 268,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/domain-directory.tsx",
                    lineNumber: 215,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            importing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$csv$2d$import$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                existing: domains.map((domain)=>({
                        id: domain.id,
                        domain: domain.name,
                        brand: domain.segment === 'Unassigned' ? null : domain.segment,
                        manager: domain.owner === 'Unassigned' ? null : domain.owner,
                        source: domain.tld === 'Unassigned' ? null : domain.tld
                    })),
                onClose: ()=>setImporting(false),
                onImported: loadDomains
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 272,
                columnNumber: 21
            }, this),
            adding && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dialog, {
                title: "Add domain",
                onClose: ()=>setAdding(false),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#8197b4]",
                        children: "Add a domain to the local directory view."
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 273,
                        columnNumber: 78
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 grid gap-4 sm:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                label: "Domain name",
                                htmlFor: "new-domain",
                                className: "sm:col-span-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "new-domain",
                                    autoFocus: true,
                                    value: newDomain,
                                    onChange: (event)=>setNewDomain(event.target.value),
                                    onKeyDown: (event)=>event.key === 'Enter' && addDomain(),
                                    placeholder: "example.com",
                                    className: "mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]"
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 273,
                                    columnNumber: 288
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 273,
                                columnNumber: 209
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                label: "Owner",
                                htmlFor: "new-owner",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "new-owner",
                                    value: newOwner,
                                    onChange: (event)=>setNewOwner(event.target.value),
                                    className: "mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 text-sm text-white outline-none focus:border-[#6689ff]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Our team"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 919
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Aphex Media"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 944
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 273,
                                    columnNumber: 688
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 273,
                                columnNumber: 642
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                label: "Segment",
                                htmlFor: "new-segment",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    id: "new-segment",
                                    value: newSegment,
                                    onChange: (event)=>setNewSegment(event.target.value),
                                    className: "mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 text-sm text-white outline-none focus:border-[#6689ff]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Unassigned"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1281
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Betoffice"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1308
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Betpipo"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1334
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Galabet"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1358
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Hitbet"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1382
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Padişahbet"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1405
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            children: "Vippark"
                                        }, void 0, false, {
                                            fileName: "[project]/components/domain-directory.tsx",
                                            lineNumber: 273,
                                            columnNumber: 1432
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 273,
                                    columnNumber: 1044
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 273,
                                columnNumber: 994
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                label: "Registry / source",
                                htmlFor: "new-source",
                                className: "sm:col-span-2",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    id: "new-source",
                                    value: newSource,
                                    onChange: (event)=>setNewSource(event.target.value),
                                    placeholder: "internal",
                                    className: "mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]"
                                }, void 0, false, {
                                    fileName: "[project]/components/domain-directory.tsx",
                                    lineNumber: 273,
                                    columnNumber: 1563
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 273,
                                columnNumber: 1478
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 273,
                        columnNumber: 161
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogActions, {
                        onCancel: ()=>setAdding(false),
                        onConfirm: addDomain,
                        confirmLabel: "Add domain"
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 273,
                        columnNumber: 1850
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 273,
                columnNumber: 18
            }, this),
            editingDomain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dialog, {
                title: "Edit domain",
                onClose: ()=>setEditingDomain(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-[#8197b4]",
                        children: "Update the domain name in the current directory view."
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 274,
                        columnNumber: 92
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "mt-5 block text-xs font-semibold text-[#b8c9dc]",
                        htmlFor: "edit-domain",
                        children: "Domain name"
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 274,
                        columnNumber: 187
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "edit-domain",
                        autoFocus: true,
                        value: draft,
                        onChange: (event)=>setDraft(event.target.value),
                        onKeyDown: (event)=>event.key === 'Enter' && saveEdit(),
                        className: "mt-2 h-10 w-full rounded-lg border border-[#2b4665] bg-[#0a1727] px-3 font-mono text-sm text-white outline-none focus:border-[#6689ff]"
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 274,
                        columnNumber: 295
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogActions, {
                        onCancel: ()=>setEditingDomain(null),
                        onConfirm: saveEdit,
                        confirmLabel: "Save changes"
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 274,
                        columnNumber: 602
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 274,
                columnNumber: 25
            }, this),
            removingDomain && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Dialog, {
                title: "Remove domain",
                onClose: ()=>setRemovingDomain(null),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm leading-6 text-[#8197b4]",
                        children: [
                            "Remove ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[#dce6f5]",
                                children: removingDomain.name
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 275,
                                columnNumber: 151
                            }, this),
                            " from the current directory view?"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 275,
                        columnNumber: 96
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogActions, {
                        onCancel: ()=>setRemovingDomain(null),
                        onConfirm: removeDomain,
                        confirmLabel: "Remove",
                        destructive: true
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 275,
                        columnNumber: 259
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 275,
                columnNumber: 26
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 202,
        columnNumber: 5
    }, this);
}
_s(DomainDirectory, "WjzbPzzGXQPU8Pxs+/itzMInYOI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DomainDirectory;
function SidebarItem({ icon: Icon, label, active = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        disabled: !active,
        className: `flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs ${active ? 'bg-[#285bd1] text-white shadow-[0_8px_18px_rgba(39,91,209,0.2)]' : 'cursor-not-allowed text-[#7188a5]'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 281,
                columnNumber: 239
            }, this),
            label
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 281,
        columnNumber: 10
    }, this);
}
_c1 = SidebarItem;
function SummaryCard({ icon: Icon, label, value, tone, loading }) {
    const tones = {
        blue: 'border-[#16485a] bg-[#0d2935] text-[#4cc7db]',
        indigo: 'border-[#273e78] bg-[#121e3b] text-[#718aff]',
        orange: 'border-[#5a3e2b] bg-[#241c1b] text-[#e78b35]',
        teal: 'border-[#15505a] bg-[#0e2930] text-[#31c4bd]'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `rounded-xl border p-4 ${tones[tone]}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "grid size-8 place-items-center rounded-full bg-current/15",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/domain-directory.tsx",
                        lineNumber: 286,
                        columnNumber: 193
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/domain-directory.tsx",
                    lineNumber: 286,
                    columnNumber: 117
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 286,
                columnNumber: 66
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 font-mono text-2xl font-semibold text-white",
                children: loading ? '...' : formatCount(value)
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 286,
                columnNumber: 233
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-1 text-xs text-[#9aacc1]",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 286,
                columnNumber: 343
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 286,
        columnNumber: 10
    }, this);
}
_c2 = SummaryCard;
function FilterButton({ children, active, onClick, icon: Icon }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: `inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition ${active ? 'border-[#7395ff] bg-[#dce8ff] text-[#162b5f]' : 'border-[#203853] bg-[#0e2138] text-[#a6b8cd] hover:border-[#42628b] hover:text-white'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 290,
                columnNumber: 288
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 290,
        columnNumber: 10
    }, this);
}
_c3 = FilterButton;
function segmentColor(segment) {
    const colors = [
        'bg-[#1f66bb] text-white',
        'bg-[#2e62c2] text-white',
        'bg-[#7147c8] text-white',
        'bg-[#d3911c] text-white',
        'bg-[#d63d57] text-white',
        'bg-[#26a99b] text-white'
    ];
    return colors[segment.length % colors.length];
}
function PencilIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "size-3.5 text-center text-[11px]",
        children: "✎"
    }, void 0, false, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 299,
        columnNumber: 10
    }, this);
}
_c4 = PencilIcon;
function UploadIcon() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "text-sm",
        children: "↑"
    }, void 0, false, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 303,
        columnNumber: 10
    }, this);
}
_c5 = UploadIcon;
function Dialog({ title, children, onClose }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 grid place-items-center bg-[#020914]/75 p-4 backdrop-blur-sm",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "dialog-title",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full max-w-md rounded-xl border border-[#294563] bg-[#0d1d31] p-5 shadow-2xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "dialog-title",
                            className: "text-lg font-semibold text-white",
                            children: title
                        }, void 0, false, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 307,
                            columnNumber: 317
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            "aria-label": "Close dialog",
                            onClick: onClose,
                            className: "rounded-md p-1 text-[#7890ad] hover:bg-[#1a3553] hover:text-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "size-4"
                            }, void 0, false, {
                                fileName: "[project]/components/domain-directory.tsx",
                                lineNumber: 307,
                                columnNumber: 526
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/domain-directory.tsx",
                            lineNumber: 307,
                            columnNumber: 396
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/domain-directory.tsx",
                    lineNumber: 307,
                    columnNumber: 266
                }, this),
                children
            ]
        }, void 0, true, {
            fileName: "[project]/components/domain-directory.tsx",
            lineNumber: 307,
            columnNumber: 170
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 307,
        columnNumber: 10
    }, this);
}
_c6 = Dialog;
function FieldLabel({ label, htmlFor, className = '', children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        htmlFor: htmlFor,
        className: `block text-xs font-semibold text-[#b8c9dc] ${className}`,
        children: [
            label,
            children
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 311,
        columnNumber: 10
    }, this);
}
_c7 = FieldLabel;
function DialogActions({ onCancel, onConfirm, confirmLabel, destructive = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-6 flex justify-end gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onCancel,
                className: "rounded-md border border-[#294563] px-3 py-2 text-xs font-medium text-[#a9bad0] hover:bg-[#152b47]",
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 315,
                columnNumber: 55
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onConfirm,
                className: `rounded-md px-3 py-2 text-xs font-semibold text-white ${destructive ? 'bg-[#a83f50] hover:bg-[#c24c5d]' : 'bg-[#3964f4] hover:bg-[#4b73ff]'}`,
                children: confirmLabel
            }, void 0, false, {
                fileName: "[project]/components/domain-directory.tsx",
                lineNumber: 315,
                columnNumber: 208
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/domain-directory.tsx",
        lineNumber: 315,
        columnNumber: 10
    }, this);
}
_c8 = DialogActions;
const __TURBOPACK__default__export__ = DomainDirectory;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DomainDirectory");
__turbopack_context__.k.register(_c1, "SidebarItem");
__turbopack_context__.k.register(_c2, "SummaryCard");
__turbopack_context__.k.register(_c3, "FilterButton");
__turbopack_context__.k.register(_c4, "PencilIcon");
__turbopack_context__.k.register(_c5, "UploadIcon");
__turbopack_context__.k.register(_c6, "Dialog");
__turbopack_context__.k.register(_c7, "FieldLabel");
__turbopack_context__.k.register(_c8, "DialogActions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDirectoryRequestHeaders",
    ()=>getDirectoryRequestHeaders,
    "requestDirectoryAccess",
    ()=>requestDirectoryAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/client.ts [app-client] (ecmascript)");
'use client';
;
async function getDirectoryRequestHeaders() {
    const { data: { session } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
    const headers = {};
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
    return headers;
}
async function requestDirectoryAccess() {
    try {
        const headers = await getDirectoryRequestHeaders();
        const response = await fetch('/api/access', {
            headers,
            cache: 'no-store'
        });
        if (response.status >= 500) return {
            status: 'unavailable'
        };
        if (!response.ok) return {
            status: 'denied'
        };
        const access = await response.json();
        return {
            status: 'authorized',
            accessType: access.accessType,
            email: access.email
        };
    } catch  {
        return {
            status: 'unavailable'
        };
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/csv-import.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "normalizeDomain",
    ()=>normalizeDomain,
    "parseAndClassifyCsv",
    ()=>parseAndClassifyCsv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/papaparse/papaparse.min.js [app-client] (ecmascript)");
;
const supportedHeaders = new Set([
    'domain',
    'brand',
    'manager',
    'source'
]);
const requiredHeaders = [
    'domain',
    'brand',
    'manager',
    'source'
];
function normalizeDomain(value) {
    return value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase();
}
function isValidDomain(value) {
    if (!value || value.length > 253 || /\s|[/?#]/.test(value)) return false;
    const labels = value.split('.');
    return labels.length >= 2 && labels.every((label)=>label.length > 0 && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-'));
}
function normalizeHeader(value) {
    return value.replace(/^\uFEFF/, '').trim().toLowerCase();
}
function normalizeField(value) {
    const normalized = String(value ?? '').trim();
    return normalized || null;
}
function displayValue(value) {
    return value ?? 'empty';
}
function compareRecord(record, existing) {
    const changes = [];
    const fields = [
        'domain',
        'brand',
        'manager',
        'source'
    ];
    const labels = {
        domain: 'domain',
        brand: 'brand',
        manager: 'manager',
        source: 'source'
    };
    for (const field of fields){
        const current = field === 'domain' ? normalizeDomain(existing.domain) : normalizeField(existing[field]);
        const incoming = field === 'domain' ? record.domain : record[field];
        if (current !== incoming) changes.push({
            field,
            label: labels[field],
            from: displayValue(current),
            to: displayValue(incoming)
        });
    }
    return changes;
}
function parseAndClassifyCsv(file, existing) {
    return new Promise((resolve, reject)=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$papaparse$2f$papaparse$2e$min$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].parse(file, {
            header: true,
            skipEmptyLines: 'greedy',
            transformHeader: normalizeHeader,
            complete: (results)=>{
                const headers = results.meta.fields ?? [];
                const unsupportedHeaders = headers.filter((header)=>!supportedHeaders.has(header));
                const missingHeaders = requiredHeaders.filter((header)=>!headers.includes(header));
                const duplicateHeaders = headers.filter((header, index)=>headers.indexOf(header) !== index);
                const firstParseError = results.errors[0];
                if (missingHeaders.length || unsupportedHeaders.length || duplicateHeaders.length || results.errors.length) {
                    const details = [
                        missingHeaders.length ? `Missing required column: ${missingHeaders.join(', ')}` : '',
                        unsupportedHeaders.length ? `Unsupported column: ${unsupportedHeaders.join(', ')}` : '',
                        duplicateHeaders.length ? `Duplicate column: ${Array.from(new Set(duplicateHeaders)).join(', ')}` : '',
                        firstParseError ? `CSV parsing error on row ${(firstParseError.row ?? 0) + 2}` : ''
                    ].filter(Boolean).join('. ');
                    reject(new Error(details || 'The CSV structure is invalid.'));
                    return;
                }
                if (!results.data.length) {
                    reject(new Error('The CSV file is empty.'));
                    return;
                }
                const existingByDomain = new Map(existing.map((record)=>[
                        normalizeDomain(record.domain),
                        record
                    ]));
                const seen = new Set();
                const items = [];
                results.data.forEach((row, index)=>{
                    const rowNumber = index + 2;
                    const domain = normalizeDomain(String(row.domain ?? ''));
                    const record = {
                        rowNumber,
                        domain,
                        brand: normalizeField(row.brand),
                        manager: normalizeField(row.manager),
                        source: normalizeField(row.source)
                    };
                    if (!isValidDomain(domain)) {
                        items.push({
                            rowNumber,
                            record,
                            status: 'invalid',
                            message: 'Domain is missing or malformed.',
                            changes: []
                        });
                        return;
                    }
                    if (seen.has(domain)) {
                        items.push({
                            rowNumber,
                            record,
                            status: 'duplicate',
                            message: 'The same domain appears more than once in this CSV.',
                            changes: []
                        });
                        return;
                    }
                    seen.add(domain);
                    const existingRecord = existingByDomain.get(domain);
                    if (!existingRecord) {
                        items.push({
                            rowNumber,
                            record,
                            status: 'new',
                            changes: []
                        });
                        return;
                    }
                    const changes = compareRecord(record, existingRecord);
                    items.push({
                        rowNumber,
                        record,
                        status: changes.length ? 'changed' : 'unchanged',
                        changes
                    });
                });
                resolve({
                    items,
                    newItems: items.filter((item)=>item.status === 'new'),
                    changedItems: items.filter((item)=>item.status === 'changed'),
                    unchangedItems: items.filter((item)=>item.status === 'unchanged'),
                    duplicateItems: items.filter((item)=>item.status === 'duplicate'),
                    invalidItems: items.filter((item)=>item.status === 'invalid')
                });
            },
            error: (error)=>reject(new Error(`Could not read the CSV file: ${error.message}`))
        });
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://xgrcawhaoglmyxdoiuem.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_BgnP7c3qSUKa2s3nRdYe6g_X48yR90Z"), {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_12_-puz._.js.map