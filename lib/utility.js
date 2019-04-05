const PRS = require('prs-lib')
const keyth = require('keythereum')

/*
 * @param address keystore address
 * @param keystorePath absolute path of the keystore file.  Sample: /Users/kenchen/Downloads/keystore/xxxxx.json
 * @param password Press.one login password
 */
function retrievePrivateKey(address, keystorePath, password) {
  const keyobj = keyth.importFromFile(address, keystorePath, password)

  const privateKey = keyth.recover(password, keyobj)
  const hex = privateKey.toString('hex')
  console.log(hex)
  return hex
}

function _getEnv() {
  return process.env.PRS_ENV || 'dev'
}

function getConfig() {
  const env = _getEnv()
  return require(`../config/${env}`)
}

function getClientOfPRS(config) {
  const env = _getEnv()
  return new PRS({ env, debug: config.debug, address: config.address, privateKey: config.privateKey })
}

module.exports = {
  retrievePrivateKey,
  getConfig,
  getClientOfPRS
}
