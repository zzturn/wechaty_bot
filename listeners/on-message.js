import getWechatHtmlByRequests from "../util/get_wechat_article.js";
import fetchURLContent from "../util/get_url_content.js";
import zhipuai from "../util/zhipuai/http_request.js";
import uploadHtmlToGithub from "../util/upload_html_github.js";
import {PROMPT} from "../config/config.js";


export default async function onMessage(msg) {
    /**
     * We can get the Wechaty bot instance from this:
     *   `const wechaty = this`
     * Or use `this` directly:
     *   `console.info(this.userSelf())`
     */
    const room = msg.room();
    const talker = msg.talker();
    console.log(`Message: ${msg}, type: ${msg.type()}, Talker: ${talker}`);
    const type = msg.type();
    if (room && talker.star) {
        if (type == 14) {
            let url = await msg.toUrlLink();
            console.log(`Url link: ${url.url()}`);
            let context = await fetchURLContent(url.url());
            context = context.replace(/\n+/g, '\n');
            let res = await zhipuai([{
                "role": "user",
                "content": `${PROMPT}\n${context}`
            }]);
            console.log(`已获取 AI 总结结果，总消耗: ${JSON.stringify(res.data.usage)}`);
            let resText = res.data.choices[0].content;
            await msg.say(resText);
            console.log(`已发送总结结果`);
        }
    } else if (talker.star) {
        if (type == 14) {
            let url = await msg.toUrlLink();
            console.log(`Url link: ${url.url()}`);
            try {
                let [author, title, html] = await getWechatHtmlByRequests(url.url());
                let [html_url, page_url] = await uploadHtmlToGithub(author, title, html);
                let reply = `已上传至 Github ${html_url}\n Pages: ${page_url}`;
                await msg.say(reply);
                console.log(reply);
            } catch (e) {
                console.log(e);
                await msg.say(e.toString());
            }
        }
    }
}

// 处理 GitHub 中的特殊字符
function isWeChatURL(str) {
    return str.startsWith('http://mp.weixin.qq.com/s') || str.startsWith('https://mp.weixin.qq.com/s');
}