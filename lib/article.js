const hexo = require('./hexo')

async function sign(client, config, hexoConfig, filename) {
  const filePath = `${hexo.getPostsPath(config, hexoConfig)}${filename}`
  const frontMatter = hexo.getPostFrontMatter(filePath)

  const title = frontMatter.title
  if (!title) {
    throw new Error('Title is missing')
  }
  const originUrl = hexo.getOriginUrl(filename, hexoConfig, frontMatter)

  const data = {
    buffer: Buffer.from(frontMatter._content),
    filename,
    title,
    source: hexoConfig.author,
    originUrl,
    category: frontMatter.categories ? frontMatter.categories[0] : undefined
  }
  const meta = {}
  const res2 = await client.file.signByBuffer(data, meta)
  const fileHash = res2.body.cache.msghash
  const fileRId = res2.body.cache.rId
  console.log('+++++++++')
  console.log('fileHash: ' + fileHash)
  console.log('fileRId: ' + fileRId)
  return { fileHash, fileRId }
}

async function draft(client, config, hexoConfig, filename) {
  const filePath = `${hexo.getDraftsPath(config, hexoConfig)}${filename}`
  const frontMatter = hexo.getPostFrontMatter(filePath)

  const title = frontMatter.title;
  if (!title) {
    throw new Error('Title is missing')
  }

  let draft = {
    title,
    content: frontMatter._content,
    mimeType: 'text/plain'
  }
  const draftRes = await client.draft.create(draft)
  const draftId = draftRes.body.draftId
  console.log('+++++++')
  console.log('draftId: ' + draftId)
  console.log('draftRes: ' + draftRes)
  return { draftRes, draftId }
}

module.exports = {
  sign,
  draft
}
