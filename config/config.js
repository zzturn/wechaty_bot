import dotenv from 'dotenv'

dotenv.config()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const GITHUB_REPO = process.env.GITHUB_REPO

const GITHUB_URL_BASE = process.env.GITHUB_URL_BASE || 'https://api.github.com'

const GITHUB_PAGE_URL_BASE = process.env.GITHUB_PAGE_URL_BASE || 'https://zzturn.github.io/wechat_backup'

const SELENUIM_SERVER = process.env.SELENUIM_SERVER || 'http://selenium_chrome:4444/wd/hub'

const ZHIPUAI_API_KEY = process.env.ZHIPUAI_API_KEY

const PROMPT = process.env.PROMPT || '请帮我总结一下这篇文章'

export {
    GITHUB_TOKEN,
    GITHUB_REPO,
    GITHUB_URL_BASE,
    ZHIPUAI_API_KEY,
    SELENUIM_SERVER,
    PROMPT,
    GITHUB_PAGE_URL_BASE
}