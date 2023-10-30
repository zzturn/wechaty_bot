import {requestWithSelenium} from "./get_wechat_article.js";
import {By} from "selenium-webdriver";

export default async function fetchURLContent(url) {
    let driver = null;
    try {
        driver = await requestWithSelenium(url);
        let bodyText = await driver.findElement(By.tagName('body')).getText();
        return bodyText;
    } catch (e) {
        throw Error(`selenium 提取出错 - ${url} - ${e.toString()}`);
    } finally {
        if (driver) {
            await driver.quit();
            console.log(`已关闭 selenium 页面`);
        }
    }
}