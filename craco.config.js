module.exports = {
  // eslint-disable-next-line global-require
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  rules: [{ test: /\.(sass|css|scss)$/ }],
};
