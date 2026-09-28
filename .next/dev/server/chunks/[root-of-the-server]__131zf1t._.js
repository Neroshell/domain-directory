module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/domains/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/directory-access.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/admin.ts [app-route] (ecmascript)");
;
;
;
const dynamic = 'force-dynamic';
const batchSize = 1000;
async function requireInternal(request) {
    const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDirectoryAccess"])(request);
    return access?.accessType === 'internal' ? access : null;
}
async function GET(request) {
    try {
        const access = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDirectoryAccess"])(request);
        if (!access) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Directory access is required.'
        }, {
            status: 401,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
        const url = new URL(request.url);
        const offset = parseBoundedInteger(url.searchParams.get('offset'), 0, 0, 1000000);
        const limit = parseBoundedInteger(url.searchParams.get('limit'), batchSize, 1, batchSize);
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])().from('domains').select('id, domain, brand, manager, source').order('domain').range(offset, offset + limit - 1);
        if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Domain data could not be loaded.'
        }, {
            status: 502,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            domains: data ?? [],
            accessType: access.accessType
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Domain data could not be loaded.'
        }, {
            status: 503,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    }
}
async function POST(request) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSameOriginRequest"])(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Request could not be verified.'
    }, {
        status: 403
    });
    try {
        if (!await requireInternal(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal access is required for this operation.'
        }, {
            status: 403
        });
        const body = await request.json();
        if (typeof body.domain !== 'string' || !isValidDomain(body.domain)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Enter a valid domain.'
        }, {
            status: 400
        });
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])().from('domains').insert({
            domain: normalizeDomain(body.domain),
            brand: cleanNullableString(body.brand),
            manager: cleanNullableString(body.manager),
            source: cleanNullableString(body.source)
        }).select('id, domain, brand, manager, source').single();
        if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be added. It may already exist.'
        }, {
            status: 400
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            domain: data
        }, {
            status: 201,
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be added.'
        }, {
            status: 503
        });
    }
}
async function PATCH(request) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSameOriginRequest"])(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Request could not be verified.'
    }, {
        status: 403
    });
    try {
        if (!await requireInternal(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal access is required for this operation.'
        }, {
            status: 403
        });
        const body = await request.json();
        if (typeof body.id !== 'string' && typeof body.id !== 'number' || typeof body.domain !== 'string' || !isValidDomain(body.domain)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Enter a valid domain.'
            }, {
                status: 400
            });
        }
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])().from('domains').update({
            domain: normalizeDomain(body.domain)
        }).eq('id', body.id);
        if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be updated.'
        }, {
            status: 400
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            updated: true
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be updated.'
        }, {
            status: 503
        });
    }
}
async function DELETE(request) {
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$directory$2d$access$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isSameOriginRequest"])(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: 'Request could not be verified.'
    }, {
        status: 403
    });
    try {
        if (!await requireInternal(request)) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal access is required for this operation.'
        }, {
            status: 403
        });
        const body = await request.json();
        if (typeof body.id !== 'string' && typeof body.id !== 'number') return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'A domain record is required.'
        }, {
            status: 400
        });
        const { error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])().from('domains').delete().eq('id', body.id);
        if (error) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be removed.'
        }, {
            status: 400
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            deleted: true
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch  {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'The domain could not be removed.'
        }, {
            status: 503
        });
    }
}
function cleanNullableString(value) {
    if (typeof value !== 'string') return null;
    const cleanValue = value.trim();
    return cleanValue || null;
}
function isValidDomain(value) {
    const domain = normalizeDomain(value);
    if (!domain || domain.length > 253 || /\s|[/?#]/.test(domain)) return false;
    const labels = domain.split('.');
    return labels.length > 1 && labels.every((label)=>label.length > 0 && label.length <= 63 && !label.startsWith('-') && !label.endsWith('-'));
}
function normalizeDomain(value) {
    return value.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '').toLowerCase();
}
function parseBoundedInteger(value, fallback, minimum, maximum) {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= minimum && parsed <= maximum ? parsed : fallback;
}
}),
"[project]/lib/auth/brand-session.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "brandPasswordHashParses",
    ()=>brandPasswordHashParses,
    "brandSessionCookie",
    ()=>brandSessionCookie,
    "brandSessionLifetimeSeconds",
    ()=>brandSessionLifetimeSeconds,
    "createBrandSession",
    ()=>createBrandSession,
    "getBrandRateLimitKey",
    ()=>getBrandRateLimitKey,
    "verifyBrandPassword",
    ()=>verifyBrandPassword,
    "verifyBrandSession",
    ()=>verifyBrandSession
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
;
const brandSessionCookie = 'directory_brand_session';
const brandSessionLifetimeSeconds = 12 * 60 * 60;
function getSessionSecret() {
    const secret = process.env.BRAND_SESSION_SECRET;
    if (!secret || Buffer.byteLength(secret) < 32) throw new Error('Brand session configuration is incomplete.');
    return secret;
}
function sign(value) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])('sha256', getSessionSecret()).update(value).digest('base64url');
}
function createBrandSession() {
    const payload = Buffer.from(JSON.stringify({
        accessType: 'brand',
        exp: Date.now() + brandSessionLifetimeSeconds * 1000
    })).toString('base64url');
    return `${payload}.${sign(payload)}`;
}
function verifyBrandSession(value) {
    if (!value) return false;
    const [payload, signature, extra] = value.split('.');
    if (!payload || !signature || extra) return false;
    try {
        const expected = Buffer.from(sign(payload));
        const actual = Buffer.from(signature);
        if (actual.length !== expected.length || !(0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(actual, expected)) return false;
        const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        return parsed.accessType === 'brand' && typeof parsed.exp === 'number' && parsed.exp > Date.now();
    } catch  {
        return false;
    }
}
function derivePasswordHash(password, salt) {
    return new Promise((resolve, reject)=>{
        (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["scrypt"])(password, salt, 64, {
            N: 16384,
            r: 8,
            p: 1,
            maxmem: 64 * 1024 * 1024
        }, (error, derivedKey)=>{
            if (error) reject(error);
            else resolve(derivedKey);
        });
    });
}
function parseConfiguredPasswordHash() {
    const configuredHash = process.env.BRAND_ACCESS_PASSWORD_HASH;
    if (!configuredHash) return null;
    const [algorithm, saltValue, hashValue, extra] = configuredHash.split(':');
    if (algorithm !== 'scrypt' || !saltValue || !hashValue || extra) return null;
    try {
        const salt = Buffer.from(saltValue, 'base64url');
        const expected = Buffer.from(hashValue, 'base64url');
        if (salt.length < 16 || expected.length !== 64) return null;
        return {
            salt,
            expected
        };
    } catch  {
        return null;
    }
}
function brandPasswordHashParses() {
    return parseConfiguredPasswordHash() !== null;
}
async function verifyBrandPassword(password) {
    const parsed = parseConfiguredPasswordHash();
    if (!parsed || password.length > 1024) return {
        completed: false,
        matches: false
    };
    try {
        const actual = await derivePasswordHash(password, parsed.salt);
        return {
            completed: true,
            matches: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(actual, parsed.expected)
        };
    } catch  {
        return {
            completed: false,
            matches: false
        };
    }
}
function getBrandRateLimitKey(ipAddress) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])('sha256', getSessionSecret()).update(`brand-rate-limit:${ipAddress}`).digest('hex');
}
}),
"[project]/lib/auth/directory-access.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDirectoryAccess",
    ()=>getDirectoryAccess,
    "isSameOriginRequest",
    ()=>isSameOriginRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/admin.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$brand$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth/brand-session.ts [app-route] (ecmascript)");
;
;
;
;
function getCookie(request, cookieName) {
    const cookieHeader = request.headers.get('cookie') ?? '';
    const entry = cookieHeader.split(';').map((part)=>part.trim()).find((part)=>part.startsWith(`${cookieName}=`));
    return entry ? decodeURIComponent(entry.slice(cookieName.length + 1)) : undefined;
}
function logAuthorizationDiagnostic(level, details) {
    const message = `[directory-auth] ${JSON.stringify(details)}`;
    if (level === 'error') console.error(message);
    else console.info(message);
}
async function getDirectoryAccess(request) {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$brand$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["verifyBrandSession"])(getCookie(request, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2f$brand$2d$session$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["brandSessionCookie"]))) {
        return {
            authenticated: true,
            accessType: 'brand'
        };
    }
    const accessToken = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
    const serviceRoleConfigured = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
    if (!accessToken) {
        logAuthorizationDiagnostic('info', {
            reason: 'missing token',
            serviceRoleKeyExists: serviceRoleConfigured
        });
        return null;
    }
    const supabaseUrl = ("TURBOPACK compile-time value", "https://xgrcawhaoglmyxdoiuem.supabase.co");
    const anonKey = ("TURBOPACK compile-time value", "sb_publishable_BgnP7c3qSUKa2s3nRdYe6g_X48yR90Z");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const authClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, anonKey, {
        auth: {
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false
        }
    });
    const { data: { user }, error: authError } = await authClient.auth.getUser(accessToken);
    const authenticatedEmail = user?.email ?? null;
    if (authError || !user || !authenticatedEmail) {
        logAuthorizationDiagnostic('info', {
            serviceRoleKeyExists: serviceRoleConfigured,
            authenticatedEmail,
            allowlistQuery: 'not run',
            reason: 'invalid token'
        });
        return null;
    }
    const email = authenticatedEmail.trim().toLowerCase();
    logAuthorizationDiagnostic('info', {
        serviceRoleKeyExists: serviceRoleConfigured,
        authenticatedEmail,
        normalizedEmail: email
    });
    let allowedUsers = null;
    let allowlistError = null;
    try {
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createSupabaseAdminClient"])();
        const result = await admin.from('allowed_users').select('email, role, active').ilike('email', email).limit(10);
        allowedUsers = result.data;
        allowlistError = result.error;
    } catch  {
        logAuthorizationDiagnostic('error', {
            serviceRoleKeyExists: serviceRoleConfigured,
            authenticatedEmail,
            normalizedEmail: email,
            allowlistQuery: 'errored before completion',
            reason: 'database query failure'
        });
        throw new Error('Could not verify directory access.');
    }
    if (allowlistError) {
        logAuthorizationDiagnostic('error', {
            serviceRoleKeyExists: serviceRoleConfigured,
            authenticatedEmail,
            normalizedEmail: email,
            allowlistQuery: 'errored',
            queryErrorCode: allowlistError.code ?? 'unknown',
            reason: 'database query failure'
        });
        throw new Error('Could not verify directory access.');
    }
    logAuthorizationDiagnostic('info', {
        authenticatedEmail,
        normalizedEmail: email,
        allowlistQuery: 'succeeded',
        matchedRows: (allowedUsers ?? []).map(({ email: matchedEmail, role, active })=>({
                email: matchedEmail,
                role,
                active
            }))
    });
    const matchingUser = (allowedUsers ?? []).find((entry)=>String(entry.email).trim().toLowerCase() === email);
    if (!matchingUser) {
        logAuthorizationDiagnostic('info', {
            normalizedEmail: email,
            reason: 'allowed user not found'
        });
        return null;
    }
    if (matchingUser.active !== true) {
        logAuthorizationDiagnostic('info', {
            normalizedEmail: email,
            matchedEmail: matchingUser.email,
            role: matchingUser.role,
            active: matchingUser.active,
            reason: 'inactive user'
        });
        return null;
    }
    logAuthorizationDiagnostic('info', {
        normalizedEmail: email,
        matchedEmail: matchingUser.email,
        role: matchingUser.role,
        active: matchingUser.active,
        reason: 'authorized'
    });
    return {
        authenticated: true,
        accessType: 'internal',
        email
    };
}
function isSameOriginRequest(request) {
    const origin = request.headers.get('origin');
    if (!origin) return false;
    try {
        return new URL(origin).origin === new URL(request.url).origin;
    } catch  {
        return false;
    }
}
}),
"[project]/lib/supabase/admin.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createSupabaseAdminClient",
    ()=>createSupabaseAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
function createSupabaseAdminClient() {
    const url = ("TURBOPACK compile-time value", "https://xgrcawhaoglmyxdoiuem.supabase.co");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceRoleKey) {
        throw new Error('Server Supabase configuration is incomplete.');
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false
        }
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__131zf1t._.js.map