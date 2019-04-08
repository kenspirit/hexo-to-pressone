const yaml = require('js-yaml')
const fns = require('date-fns')
const fs = require('fs')
const { parse } = require('hexo-front-matter')

function getHexoConfig(config) {
  return yaml.safeLoad(fs.readFileSync(`${config.hexoRoot}/_config.yml`, 'utf8'))
}

function getPostsPath(config, hexoConfig) {
  const source_dir = hexoConfig.source_dir // 'source'
  return `${config.hexoRoot}/${source_dir}/_posts/`
}

function getDraftsPath(config, hexoConfig) {
  const source_dir = hexoConfig.source_dir // 'source'
  return `${config.hexoRoot}/${source_dir}/_drafts/`
}

function getPostFrontMatter(filePath) {
  const buffer = fs.readFileSync(filePath)
  const fileString = buffer.toString()
  return parse(fileString)
}

function getOriginUrl(filename, hexoConfig, frontMatter) {
  const postDate = fns.parse(frontMatter.date)

  const url = hexoConfig.url // no / at the nd
  const root = hexoConfig.root // say '/blog/' or '/'

  const new_post_name = hexoConfig.new_post_name // ':year-:month-:day-:title.md'
  const year = fns.getYear(postDate)
  const month = fns.format(postDate, 'MM')
  const day = fns.format(postDate, 'DD')
  const p = new_post_name
    .replace(':year', year)
    .replace(':month', month)
    .replace(':day', day)
    .replace(':title', '(.*)')

  let fileTitle
  try {
    fileTitle = filename.match(new RegExp(p))[1]
  } catch (e) {
    console.error(`Failed to match ${filename} with pattern ${p}`)
    throw e
  }

  const permalink = hexoConfig.permalink // ':year/:month/:day/:title/'
  const postname = permalink
    .replace(':year', year)
    .replace(':month', month)
    .replace(':day', day)
    .replace(':title', fileTitle)
  const originUrl = `${url}${root}${postname}`
  return originUrl
}

module.exports = {
  getHexoConfig,
  getPostsPath,
  getDraftsPath,
  getPostFrontMatter,
  getOriginUrl
}
