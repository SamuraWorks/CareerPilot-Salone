module.exports = [
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
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
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
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
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navigation",
    ()=>Navigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/log-out.js [app-ssr] (ecmascript) <export default as LogOut>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/react-icons/fa/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function Navigation() {
    const { user, logout, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "bg-background border-b border-border sticky top-0 z-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center h-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/",
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 bg-primary rounded-lg flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-6",
                            children: isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/careers",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Careers"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 30,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/universities",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Universities"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/jobs",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Jobs"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scholarships",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Scholarships"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mentorship",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Mentorship"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 42,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/roadmap",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Roadmap"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 45,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/aptitude-test",
                                        className: "text-muted-foreground hover:text-foreground transition-colors",
                                        children: "Career Test"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 48,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/whatsapp",
                                        className: "text-muted-foreground hover:text-[#25D366] transition-colors flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 55,
                                                columnNumber: 19
                                            }, this),
                                            "WhatsApp"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 51,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "hidden lg:flex items-center gap-4",
                            children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/dashboard",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            className: "gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                    lineNumber: 68,
                                                    columnNumber: 21
                                                }, this),
                                                user?.name
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 67,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 66,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        onClick: logout,
                                        className: "gap-2 bg-transparent",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 73,
                                                columnNumber: 19
                                            }, this),
                                            "Logout"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 72,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            children: "Login"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 80,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 79,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/signup",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            children: "Get Started"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 83,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 82,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "lg:hidden p-2",
                            onClick: ()=>setMobileMenuOpen(!mobileMenuOpen),
                            "aria-label": "Toggle menu",
                            children: mobileMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 91,
                                columnNumber: 31
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 91,
                                columnNumber: 59
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                            lineNumber: 90,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this),
                mobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "lg:hidden py-4 border-t border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: [
                            isAuthenticated && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/careers",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Careers"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 101,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/universities",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Universities"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 104,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/jobs",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Jobs"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 107,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/scholarships",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Scholarships"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 110,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/mentorship",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Mentorship"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 113,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/roadmap",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Roadmap"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 116,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/aptitude-test",
                                        className: "text-muted-foreground hover:text-foreground transition-colors px-2 py-1",
                                        children: "Career Test"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 119,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/whatsapp",
                                        className: "text-muted-foreground hover:text-[#25D366] transition-colors px-2 py-1 flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 126,
                                                columnNumber: 21
                                            }, this),
                                            "WhatsApp Bot"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                        lineNumber: 122,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2 pt-4 border-t border-border",
                                children: isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/dashboard",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full gap-2 bg-transparent",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                        lineNumber: 136,
                                                        columnNumber: 25
                                                    }, this),
                                                    user?.name
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 135,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 134,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: logout,
                                            className: "w-full gap-2 bg-transparent",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$log$2d$out$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LogOut$3e$__["LogOut"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 23
                                                }, this),
                                                "Logout"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 140,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                className: "w-full bg-transparent",
                                                children: "Login"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 148,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 147,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/signup",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                className: "w-full",
                                                children: "Get Started"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                                lineNumber: 153,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                            lineNumber: 152,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                        lineNumber: 98,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx",
                    lineNumber: 97,
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
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardNav",
    ()=>DashboardNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/compass.js [app-ssr] (ecmascript) <export default as Compass>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-ssr] (ecmascript) <export default as Briefcase>");
"use client";
;
;
;
;
;
const navItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
    },
    {
        title: "AI Career Guidance",
        href: "/guidance",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"]
    },
    {
        title: "Career Recommendations",
        href: "/careers",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$compass$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Compass$3e$__["Compass"]
    },
    {
        title: "Job Matching",
        href: "/jobs",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"]
    },
    {
        title: "CV Builder",
        href: "/cv-builder",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"]
    },
    {
        title: "My Roadmap",
        href: "/roadmap",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        title: "Profile",
        href: "/profile",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"]
    },
    {
        title: "Help",
        href: "/help",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"]
    }
];
function DashboardNav() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "space-y-1",
        children: navItems.map((item)=>{
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
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
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardLayout",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/navigation.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-nav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
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
function DashboardLayout({ children }) {
    const { isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [sidebarOpen, setSidebarOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [
        isAuthenticated,
        router
    ]);
    if (!isAuthenticated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col min-h-screen bg-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$navigation$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Navigation"], {}, void 0, false, {
                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "md:hidden fixed bottom-4 right-4 z-50 shadow-lg bg-primary text-primary-foreground rounded-full h-12 w-12 hover:bg-primary/90",
                        onClick: ()=>setSidebarOpen(!sidebarOpen),
                        children: sidebarOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 41,
                            columnNumber: 26
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                            className: "w-6 h-6"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 41,
                            columnNumber: 54
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("w-64 border-r border-sidebar-border p-6 fixed md:sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto transition-transform z-40", "bg-sidebar text-sidebar-foreground", sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardNav"], {}, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    sidebarOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden",
                        onClick: ()=>setSidebarOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-6 md:p-8 bg-muted/10 relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 z-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative z-10 max-w-6xl mx-auto animate-fade-in",
                                children: children
                            }, void 0, false, {
                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('leading-none font-semibold', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center px-6 [.border-t]:pt-6', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/label.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/@radix-ui/react-label/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/textarea.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Textarea({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        "data-slot": "textarea",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/textarea.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/alert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])('relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current', {
    variants: {
        variant: {
            default: 'bg-card text-card-foreground',
            destructive: 'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/dashboard-layout.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/label.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/textarea.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/components/ui/alert.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/node_modules/lucide-react/dist/esm/icons/upload.js [app-ssr] (ecmascript) <export default as Upload>");
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
;
;
;
function ProfilePage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [profilePhoto, setProfilePhoto] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        location: "Freetown, Sierra Leone",
        bio: "",
        skills: "",
        interests: ""
    });
    const handlePhotoUpload = (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        // Simulated save
        setSaved(true);
        setTimeout(()=>setSaved(false), 3000);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DashboardLayout"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-3xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold mb-2",
                            children: "Profile Settings"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground",
                            children: "Manage your account information and preferences"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                saved && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Alert"], {
                    className: "mb-6 border-secondary bg-secondary/10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                            className: "h-4 w-4 text-secondary"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 59,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDescription"], {
                            className: "text-secondary",
                            children: "Profile updated successfully!"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 60,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                    lineNumber: 58,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "space-y-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "Personal Information"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 67,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Update your personal details"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    children: "Profile Photo"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden border-2 border-border",
                                                            children: profilePhoto ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: profilePhoto || "/placeholder.svg",
                                                                alt: "Profile",
                                                                className: "w-full h-full object-cover"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                lineNumber: 76,
                                                                columnNumber: 23
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                className: "w-12 h-12 text-muted-foreground"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 74,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                                    type: "file",
                                                                    accept: "image/*",
                                                                    onChange: handlePhotoUpload,
                                                                    className: "hidden",
                                                                    id: "profile-photo-upload"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                    lineNumber: 86,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                                    htmlFor: "profile-photo-upload",
                                                                    className: "cursor-pointer",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                                        type: "button",
                                                                        variant: "outline",
                                                                        className: "gap-2 bg-transparent",
                                                                        asChild: true,
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                                                                    className: "w-4 h-4"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                                    lineNumber: 96,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                "Upload Photo"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                            lineNumber: 95,
                                                                            columnNumber: 25
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                        lineNumber: 94,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                    lineNumber: 93,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-muted-foreground mt-2",
                                                                    children: "Recommended: Professional headshot, square format"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "name",
                                                            children: "Full Name"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "name",
                                                            value: formData.name,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    name: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "email",
                                                            children: "Email Address"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 118,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "email",
                                                            type: "email",
                                                            value: formData.email,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    email: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 119,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "phone",
                                                            children: "Phone Number"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "phone",
                                                            type: "tel",
                                                            placeholder: "+232 XX XXX XXXX",
                                                            value: formData.phone,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    phone: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 131,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                            htmlFor: "location",
                                                            children: "Location"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 140,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                            id: "location",
                                                            value: formData.location,
                                                            onChange: (e)=>setFormData({
                                                                    ...formData,
                                                                    location: e.target.value
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "bio",
                                                    children: "Bio"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    id: "bio",
                                                    placeholder: "Tell us about yourself...",
                                                    rows: 4,
                                                    value: formData.bio,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            bio: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 149,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                            children: "Professional Information"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                            children: "Help us recommend the best careers for you"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 163,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "skills",
                                                    children: "Skills"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 169,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "skills",
                                                    placeholder: "e.g., JavaScript, Communication, Project Management",
                                                    value: formData.skills,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            skills: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-muted-foreground",
                                                    children: "Separate skills with commas"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "interests",
                                                    children: "Career Interests"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 180,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Textarea"], {
                                                    id: "interests",
                                                    placeholder: "What type of work are you interested in?",
                                                    rows: 3,
                                                    value: formData.interests,
                                                    onChange: (e)=>setFormData({
                                                            ...formData,
                                                            interests: e.target.value
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                                    lineNumber: 181,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                            lineNumber: 179,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 162,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "submit",
                                    children: "Save Changes"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 193,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$FloodGuard_AI$2f$frontend$2f$html$2f$pages$2f$career$2d$pilot$2d$salone$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                    type: "button",
                                    variant: "outline",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
            lineNumber: 51,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/FloodGuard_AI/frontend/html/pages/career-pilot-salone/app/profile/page.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=Desktop_FloodGuard_AI_frontend_html_pages_career-pilot-salone_735af02e._.js.map