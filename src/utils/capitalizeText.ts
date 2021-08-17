export function capitalizeText(text: string): string {
    if (text == null) {
        return text
    }

    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (let i = 0; i < words.length; i++) {
        var w = words[i]

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[i] = w;
    }
    return words.join(" ");
}