(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/log-out.js [app-client] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function Navigation() {
    _s();
    const { user, logout, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-background border-b border-border sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-primary-foreground font-bold text-lg",
                                        children: "CP"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 21,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                    lineNumber: 20,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold text-xl text-foreground",
                                    children: "CareerPilot Salone"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                    lineNumber: 23,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-6",
                            children: isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/careers",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Careers"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/universities",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Universities"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/jobs",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Jobs"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scholarships",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Scholarships"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mentorship",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Mentorship"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/whatsapp",
                                        className: "text-muted-foreground hover:text-[#25D366] transition-colors flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 49,
                                                columnNumber: 19
                                            }, this),
                                            "WhatsApp"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-4",
                            children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                    lineNumber: 62,
                                                    columnNumber: 21
                                                }, this),
                                                user?.user_metadata?.name || user?.email?.split('@')[0]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 61,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: logout,
                                        className: "gap-2 bg-transparent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            "Logout"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            children: "Login"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 73,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/signup",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            children: "Get Started"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 77,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 76,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "lg:hidden p-2",
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            "aria-label": "Toggle menu",
                            children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 85,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 85,
                                columnNumber: 59
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden py-4 border-t border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/careers",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Careers"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 95,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/universities",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Universities"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 98,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/jobs",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Jobs"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scholarships",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Scholarships"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mentorship",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Mentorship"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/whatsapp",
                                        className: "text-muted-foreground hover:text-[#25D366] transition-colors px-2 py-1 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 114,
                                                columnNumber: 21
                                            }, this),
                                            "WhatsApp Bot"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 110,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 pt-4 border-t border-border",
                                children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full gap-2 bg-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                        lineNumber: 124,
                                                        columnNumber: 25
                                                    }, this),
                                                    user?.user_metadata?.name || user?.email?.split('@')[0]
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 123,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 122,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: logout,
                                            className: "w-full gap-2 bg-transparent",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 23
                                                }, this),
                                                "Logout"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 128,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full bg-transparent",
                                                children: "Login"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 136,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 135,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/signup",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full",
                                                children: "Get Started"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 141,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 140,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                        lineNumber: 92,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                    lineNumber: 91,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
            lineNumber: 16,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_s(Navigation, "oW76I9XO3pfJSXZ73ewWEvN0FF0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = Navigation;
var _c;
__turbopack_context__.k.register(_c, "Navigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardNav",
    ()=>DashboardNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/house.js [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/compass.js [app-client] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-client] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
    },
    {
        title: "AI Career Guidance",
        href: "/guidance",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        title: "Career Recommendations",
        href: "/careers",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"]
    },
    {
        title: "Job Matching",
        href: "/jobs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        title: "CV Builder",
        href: "/cv-builder",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        title: "My Roadmap",
        href: "/roadmap",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        title: "Profile",
        href: "/profile",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
    },
    {
        title: "Help",
        href: "/help",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"]
    }
];
function DashboardNav() {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "space-y-1",
        children: navItems.map((item)=>{
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: "w-5 h-5"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx",
                        lineNumber: 71,
                        columnNumber: 13
                    }, this),
                    item.title
                ]
            }, item.href, true, {
                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(DashboardNav, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = DashboardNav;
var _c;
__turbopack_context__.k.register(_c, "DashboardNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardLayout",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function DashboardLayout({ children }) {
    _s();
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardLayout.useEffect": ()=>{
            if (!isAuthenticated) {
                router.push("/login");
            }
        }
    }["DashboardLayout.useEffect"], [
        isAuthenticated,
        router
    ]);
    if (!isAuthenticated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$navigation$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navigation"], {}, void 0, false, {
                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "md:hidden fixed bottom-4 right-4 z-50 shadow-lg",
                        onClick: ()=>setSidebarOpen(!sidebarOpen),
                        children: sidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 40,
                            columnNumber: 26
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 40,
                            columnNumber: 54
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: cn("w-64 bg-card border-r border-border p-6 fixed md:sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-transform z-40", sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$nav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardNav"], {}, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden",
                        onClick: ()=>setSidebarOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-6 md:p-8",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(DashboardLayout, "J/8O2zqxscllgWpL/2RgxRgKi5c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardLayout;
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tabs",
    ()=>Tabs,
    "TabsContent",
    ()=>TabsContent,
    "TabsList",
    ()=>TabsList,
    "TabsTrigger",
    ()=>TabsTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@radix-ui/react-tabs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
function Tabs({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "tabs",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex flex-col gap-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Tabs;
function TabsList({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["List"], {
        "data-slot": "tabs-list",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c1 = TabsList;
function TabsTrigger({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tabs-trigger",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c2 = TabsTrigger;
function TabsContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tabs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        "data-slot": "tabs-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex-1 outline-none', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c3 = TabsContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Tabs");
__turbopack_context__.k.register(_c1, "TabsList");
__turbopack_context__.k.register(_c2, "TabsTrigger");
__turbopack_context__.k.register(_c3, "TabsContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>JobsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/supabaseClient.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
function JobsPage() {
    _s();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedType, setSelectedType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [opportunities, setOpportunities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "JobsPage.useEffect": ()=>{
            async function fetchJobs() {
                try {
                    setLoading(true);
                    const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$supabaseClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('jobs').select('*').order('posted_at', {
                        ascending: false
                    });
                    if (error) throw error;
                    if (data) {
                        const formattedJobs = data.map({
                            "JobsPage.useEffect.fetchJobs.formattedJobs": (job)=>({
                                    id: job.id,
                                    type: job.type?.toLowerCase() || "job",
                                    title: job.title,
                                    company: job.company,
                                    location: job.location || "Sierra Leone",
                                    salary: job.salary_range,
                                    requirements: job.requirements || [],
                                    skills: [],
                                    // Wait, looking at setup.sql: jobs table has title, company, location, salary_range, type, application_link, requirements. MISSING skills.
                                    // I will assume empty array for now or add it later if critical.
                                    applicationSteps: [
                                        "Click Apply Now to visit the application page."
                                    ],
                                    postedDate: new Date(job.posted_at).toLocaleDateString(),
                                    applicationLink: job.application_link
                                })
                        }["JobsPage.useEffect.fetchJobs.formattedJobs"]);
                        setOpportunities(formattedJobs);
                    }
                } catch (err) {
                    console.error("Error fetching jobs:", err);
                    setError("Failed to load jobs.");
                } finally{
                    setLoading(false);
                }
            }
            fetchJobs();
        }
    }["JobsPage.useEffect"], []);
    const filteredOpportunities = opportunities.filter((opp)=>{
        const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) || opp.company.toLowerCase().includes(searchTerm.toLowerCase()) || opp.skills.some((skill)=>skill.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesType = selectedType === "all" || opp.type.toLowerCase() === selectedType.toLowerCase() // Ensure case match
        ;
        return matchesSearch && matchesType;
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 md:p-6 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full h-48 rounded-xl overflow-hidden -mt-2 -mx-2 md:-mx-4 mb-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            src: "/jobs-opportunities-freetown.jpg",
                            alt: "Job Opportunities in Sierra Leone",
                            fill: true,
                            className: "object-cover brightness-75"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute bottom-6 left-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-2xl md:text-3xl font-bold text-white",
                                    children: "Job & Opportunity Matching"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-white/90 mt-1",
                                    children: "Find jobs, internships, and training programs that match your skills"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row gap-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: "Search by title, company, or skills...",
                                value: searchTerm,
                                onChange: (e)=>setSearchTerm(e.target.value),
                                className: "pl-9"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                        lineNumber: 108,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                    value: selectedType,
                    onValueChange: (v)=>setSelectedType(v),
                    className: "w-full",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                            className: "grid w-full grid-cols-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "all",
                                    children: [
                                        "All (",
                                        opportunities.length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "job",
                                    children: [
                                        "Jobs (",
                                        opportunities.filter((o)=>o.type === "job").length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "internship",
                                    children: [
                                        "Internships (",
                                        opportunities.filter((o)=>o.type === "internship").length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 123,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                    value: "training",
                                    children: [
                                        "Training (",
                                        opportunities.filter((o)=>o.type === "training").length,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                            lineNumber: 120,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                            value: selectedType,
                            className: "mt-6 space-y-4",
                            children: [
                                loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center p-10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                        className: "h-8 w-8 animate-spin text-primary"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                        lineNumber: 134,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 133,
                                    columnNumber: 15
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-destructive text-center p-4",
                                    children: error
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 139,
                                    columnNumber: 15
                                }, this),
                                !loading && !error && filteredOpportunities.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                    className: "p-8 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: "No opportunities found matching your criteria."
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this) : !loading && !error && filteredOpportunities.map((opp)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "p-6 hover:shadow-lg transition-shadow",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col md:flex-row md:items-start md:justify-between gap-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-start gap-3 mb-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${opp.type === "job" ? "bg-primary/10" : opp.type === "internship" ? "bg-secondary/10" : "bg-accent/10"}`,
                                                                    children: opp.type === "training" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"], {
                                                                        className: `w-5 h-5 ${opp.type === "job" ? "text-primary" : opp.type === "internship" ? "text-secondary" : "text-accent"}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                        lineNumber: 161,
                                                                        columnNumber: 29
                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                                        className: `w-5 h-5 ${opp.type === "job" ? "text-primary" : opp.type === "internship" ? "text-secondary" : "text-accent"}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                        lineNumber: 170,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 152,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "text-xl font-semibold mb-1",
                                                                            children: opp.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 181,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-muted-foreground",
                                                                            children: opp.company
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 182,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: opp.type === "job" ? "default" : opp.type === "internship" ? "secondary" : "outline",
                                                                    children: opp.type.charAt(0).toUpperCase() + opp.type.slice(1)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 184,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                            lineNumber: 151,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-4 text-sm text-muted-foreground mb-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 193,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        opp.location
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 192,
                                                                    columnNumber: 25
                                                                }, this),
                                                                opp.salary && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 198,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        opp.salary
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 197,
                                                                    columnNumber: 27
                                                                }, this),
                                                                opp.duration && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                            className: "w-4 h-4"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 204,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        opp.duration
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 203,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                            lineNumber: 191,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium mb-2",
                                                                            children: "Required Skills:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 212,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-wrap gap-2",
                                                                            children: opp.skills.length > 0 ? opp.skills.map((skill)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                                    variant: "outline",
                                                                                    children: skill
                                                                                }, skill, false, {
                                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                                    lineNumber: 215,
                                                                                    columnNumber: 31
                                                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-sm text-muted-foreground",
                                                                                children: "See application link for details"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                                lineNumber: 218,
                                                                                columnNumber: 34
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 213,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 211,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm font-medium mb-2",
                                                                            children: "Requirements:"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 223,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                                            className: "text-sm text-muted-foreground space-y-1",
                                                                            children: opp.requirements.map((req, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                                    className: "flex gap-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            className: "text-primary",
                                                                                            children: "•"
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                                            lineNumber: 227,
                                                                                            columnNumber: 33
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                            children: req
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                                            lineNumber: 228,
                                                                                            columnNumber: 33
                                                                                        }, this)
                                                                                    ]
                                                                                }, idx, true, {
                                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                                    lineNumber: 226,
                                                                                    columnNumber: 31
                                                                                }, this))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                            lineNumber: 224,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 222,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {}, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                    lineNumber: 234,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                            lineNumber: 210,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        className: "flex-1 gap-2",
                                                        onClick: ()=>opp.applicationLink && window.open(opp.applicationLink, '_blank'),
                                                        children: [
                                                            "Apply Now",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        className: "flex-1 bg-transparent",
                                                        children: "Save for Later"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                        lineNumber: 256,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                lineNumber: 251,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-muted-foreground mt-4",
                                                children: [
                                                    "Posted ",
                                                    opp.postedDate
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, opp.id, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                        lineNumber: 148,
                                        columnNumber: 17
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                            lineNumber: 131,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "p-4 bg-secondary/5 border-secondary/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium text-foreground",
                                children: "Weekly Updates:"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            " New opportunities are added every week. Check back regularly or enable notifications to stay updated."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                        lineNumber: 270,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
                    lineNumber: 269,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/jobs/page.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_s(JobsPage, "CM0RksdF8opkikmE8Tawnavn48A=");
_c = JobsPage;
var _c;
__turbopack_context__.k.register(_c, "JobsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_FloodGuard_AI_frontend_html_pages_career-pilot-salone_c8f946a9._.js.map