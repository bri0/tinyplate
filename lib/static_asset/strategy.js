const staticAsset = require('static-asset');

const staticAssetStrategy = staticAsset.strategies['default'];

const hashPostfix = '-hash';

staticAssetStrategy.fileFingerprint = function(filename, fullPath) {
  const lastDotIndex = filename.lastIndexOf('.');
  return filename.substr(0, lastDotIndex) + '.' + staticAssetStrategy.etag(fullPath) + hashPostfix + filename.substr(lastDotIndex);
};

staticAssetStrategy.assetPathRewrite = (req, res, next) => {
  if (req.url.includes(hashPostfix)) {
    const lastDotIndex = req.url.lastIndexOf('.');
    const tmp = req.url.substring(0, lastDotIndex);
    const previousDotIndex = tmp.lastIndexOf('.');
    req.url = req.url.substring(0, previousDotIndex) + req.url.substring(lastDotIndex);
  }
  next();
};

module.exports = staticAssetStrategy;
