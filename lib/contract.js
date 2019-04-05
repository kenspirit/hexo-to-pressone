async function create(client, config, fileRId) {
  const contractRes = await client.contract.create(config.contractCode)
  const contractRId = contractRes.body.contract.rId
  console.log('+++++++++++')
  console.log('contractRId: ' + contractRId)

  return await client.contract.bind(contractRId, fileRId, config.address)
}

module.exports = {
  create
}
