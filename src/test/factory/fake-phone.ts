export function fakeBRPhone() {
    const ddd = ["11", "21", "31", "41", "51"];
    const randomDDD = ddd[Math.floor(Math.random() * ddd.length)];

    const number = `9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    return `+55 ${randomDDD} ${number}`;
}