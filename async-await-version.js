export default async function getClue() {
    const res = await fetch('https://jservice.xyz/api/random-clue')
    if (!res.ok) {
        throw new Error(res.status);
    }
    const data = await res.json();
    return data;
}
