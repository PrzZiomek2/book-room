
const withImages = require('next-images');
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
	dest: "public",
	register: true,
	skipWaiting: true,
	runtimeCaching,
	buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["localhost"]
	 },
	...withPWA({}),
};

module.exports = nextConfig;


