module.exports = {
	reactStrictMode: true,
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.target = "electron-renderer";
		}

		return config;
	},
};
