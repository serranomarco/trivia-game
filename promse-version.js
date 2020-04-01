export default function getClue() {
    return fetch('https://jservice.xyz/api/random-clue')
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
}
