export default function getClue() {

    const clueId = localStorage.getItem('clueObjectId');
    return fetch(`https://jservice.xyz/api/clues/${clueId}`)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.status);
            }
            return res.json();
        })
        .then(data => {
            return data
        });
}
