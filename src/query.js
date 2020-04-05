import axios from 'axios';

export async function queryGitLabLint(url, content) {
    const baseURL = url + '/api/v4/ci/lint';
    return await axios({
        method: 'post',
        url: baseURL,
        headers: { 'Content-Type': 'application/json' },
        data: {
            'content': content
        }
    });
}