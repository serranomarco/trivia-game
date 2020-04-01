export default function getClue(cb) {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', event => {
        if (request.readyState !== XMLHttpRequest.DONE) {
            return;
        }
        if (request.status !== 200) {
            cb(request.status);
        } else {
            const data = JSON.parse(request.responseText);
            cb(null, data);
        }
    });

    request.open('GET', 'https://jservice.xyz/api/random-clue');

    request.send();
}
