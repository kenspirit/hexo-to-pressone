const fs = require('fs')
const { getClientOfPRS, getConfig } = require('./lib/utility')
const hexo = require('./lib/hexo')
const article = require('./lib/article')
const contract = require('./lib/contract')

async function signArticleAndBindContract(client, config, hexoConfig, posts) {
  if (posts.length === 0) {
    return
  }

  const postName = posts.splice(0, 1)[0]
  try {
    console.log(`--------------- Signing ${postName} ------------------`)
    const { fileRId } = await article.sign(client, config, hexoConfig, postName)
    await contract.create(client, config, fileRId)
    console.log(`${postName} is signed and bound to contract successfully.`)
  } catch (e) {
    console.error(`Failed on ${postName}`, e)
    throw e
  }

  await signArticleAndBindContract(client, config, hexoConfig, posts)
}

async function main(postNameFrom, postNameTo) {
  if (!postNameFrom) {
    throw new Error('Missing post name')
  }

  const config = getConfig()
  const hexoConfig = hexo.getHexoConfig(config)
  const client = getClientOfPRS(config)

  const posts = [];
  if (!postNameTo) {
    posts.push(postNameFrom)
  } else {
    const files = fs.readdirSync(hexo.getPostsPath(config, hexoConfig))
    files.sort()

    let startIndex = files.indexOf(postNameFrom)
    if (startIndex === -1) {
      throw new Error(`${postNameFrom} not found`)
    }

    let endIndex = files.indexOf(postNameTo)
    if (endIndex === -1) {
      throw new Error(`${postNameTo} not found`)
    }
    if (endIndex < startIndex) {
      const tmp = endIndex
      endIndex = startIndex
      startIndex = tmp
    }
    posts.push(...files.slice(startIndex, endIndex + 1))
  }

  await signArticleAndBindContract(client, config, hexoConfig, posts)
  console.log('----------')
  console.log('Completed!')
}

const postNameFrom = process.argv[2]
const postNameTo = process.argv[3]

main(postNameFrom, postNameTo)
