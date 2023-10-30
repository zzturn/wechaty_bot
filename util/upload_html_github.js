import {GITHUB_REPO, GITHUB_TOKEN, GITHUB_URL_BASE, GITHUB_PAGE_URL_BASE} from "../config/config.js";
import axios from "axios";

const github_url_base = GITHUB_URL_BASE;
const repo = GITHUB_REPO;
const token = GITHUB_TOKEN;

export default async function uploadHtmlToGithub(author, title, html) {
    if (token) {
        // 处理 GitHub 中的特殊字符
        author = sanitizeString(author);
        title = sanitizeString(title);
        // 使用GitHub API创建或更新文件
        const pathToFile = `favorite/${author}/${title}.html`;
        const pathToFileEncode = `favorite/${encodeURIComponent(author)}/${encodeURIComponent(title)}.html`
        const wholePath = `${github_url_base}/repos/${repo}/contents/${pathToFile}`;

        try {
            const response = await axios({
                method: 'put',
                url: wholePath,
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                    "Accept": "application/vnd.github.v3+json"
                },
                data: {
                    message: `Add ${pathToFile}`,
                    content: Buffer.from(html).toString('base64'),
                },
            });

            console.info(`已成功将 ${title} 内容保存到GitHub仓库 ${repo} 的 ${pathToFile}`);
            // TODO 短链
            return [response.data.content.html_url, `${GITHUB_PAGE_URL_BASE}/${pathToFileEncode}`];
        } catch (error) {
            console.error(`GitHub API responded with status ${error.response.status}, message: ${error.message}`);
            throw error;
        }
    } else {
        const errorMsg = '未设置GITHUB_TOKEN，无法将内容保存到GitHub仓库';
        console.warn(errorMsg);
        throw new Error(errorMsg);
    }
}

function sanitizeString(str) {
    let illegalRe = /[~^:*?[\]\\/|<>".%]/g;
    let controlRe = /[\x00-\x1f\x7f]/g;
    let reservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
    let windowsRe = /^[. ]+$/;

    str = str.replace(illegalRe, '');
    str = str.replace(controlRe, '');
    str = str.replace(reservedRe, '');
    str = str.replace(windowsRe, '');

    return str;
}
