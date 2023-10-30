
import {ZHIPUAI_API_KEY} from "../../config/config.js";
import jwt from "jsonwebtoken";
import axios from "axios";


/**
 * @see https://open.bigmodel.cn/dev/api#chatglm_turbo
 * @param prompt
 * @param otherOptions
 * @returns {Promise<*|undefined>}
 */
export default async function zhipuai(prompt, otherOptions={}) {
    return await makeApiRequest(generateToken(), prompt, otherOptions);
}


async function makeApiRequest(authorization, prompt, otherOptions) {
    // 构建请求URL
    const apiUrl = `https://open.bigmodel.cn/api/paas/v3/model-api/chatglm_turbo/invoke`;

    // 构建请求头
    const headers = {
        'Authorization': authorization,
        "Accept": "application/json",
        "Content-Type": "application/json; charset=UTF-8",
    };

    // 构建请求体（body）
    const requestBody = {
        prompt: prompt,
        return_type: 'text',
        ...otherOptions,
    };

    try {
        // 发起POST请求
        const response = await axios({
            method: 'post',
            url: apiUrl,
            headers: headers,
            data: requestBody, // 在axios中，我们直接传递JavaScript对象，axios会自动将其转换为JSON字符串
        });

        // 处理响应
        const responseData = response.data;
        return responseData;
    } catch (error) {
        console.error('Request Error:', error);
        throw error;
    }

}

function generateToken(apikey = ZHIPUAI_API_KEY, expSeconds = 3 * 60) {
    let secret = null;
    let id = null;
    try {
        [id, secret] = apikey.split('.');
    } catch (e) {
        throw new Error('invalid apikey');
    }

    const payload = {
        api_key: id,
        exp: Math.round(Date.now() + expSeconds * 1000),
        timestamp: Math.round(Date.now()),
    };

    return jwt.sign(payload, secret, {
        algorithm: 'HS256',
        header: {alg: 'HS256', sign_type: 'SIGN'},
    });
}