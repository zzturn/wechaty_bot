
import * as cheerio from "cheerio";
import {SELENUIM_SERVER} from "../config/config.js";
import {Builder, By} from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

export default async function getWechatHtmlByRequests(url) {
    let res = null;
    let driver = null;
    try {
        driver = await requestWithSelenium(url);
        res = await extractWechatArticleHTML(driver);
    } catch (e) {
        throw Error(`获取 html 出错 - ${url} - ${e.toString()}`);
    } finally {
        if (driver) {
            await driver.close();
            console.log(`已关闭 selenium 页面`);
        }
    }
    return res;
}

export async function requestWithSelenium(url, format = 'html') {
    // let browser = await puppeteer.launch({
    //     headless: 'new',
    //     args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    // });
    let options = new chrome.Options();
    options.addArguments('--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage');

    let driver = await new Builder()
        .forBrowser('chrome')
        .usingServer(SELENUIM_SERVER)
        .setChromeOptions(options)
        .build();

    await driver.get(url);
    await driver.sleep(5000);
    return driver;
}

async function extractWechatArticleHTML(driver) {

    const source = await driver.getPageSource();
    const $ = cheerio.load(source);
    // 获取 author
    const authorElement = await driver.findElement(By.xpath('//*[@id="js_name"]'));
    const author = (await authorElement.getText()).trim();
    // 获取 title
    const titleElement = await driver.findElement(By.xpath('//*[@id="activity-name"]'));
    const title = (await titleElement.getText()).trim();


    // 找到所有的<img>标签，将图片的src属性设置为data-src属性的值，并生成外链
    $('img').each(function () {
        const dataSrc = $(this).attr('data-src');
        if (dataSrc) {
            $(this).attr('src', 'https://images.weserv.nl/?url=' + dataSrc);
        }
    });

    // 找到所有的<link>标签，如果href属性的值不是以https:开头，则添加https:前缀
    $('link').each(function () {
        const href = $(this).attr('href');
        if (href && !href.startsWith('https:') && !href.startsWith('http:')) {
            $(this).attr('href', 'https:' + href);
        }
    });

    // 找到所有的<script>标签，删除这些标签
    $('script').remove();
    return [author, title, $.html()];
}