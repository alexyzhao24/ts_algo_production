export class StringSearch {
    /**
     * Knuth-Morris-Pratt (KMP) Substring Search
     * Returns an array of all starting indices where the pattern matches the text.
     */
    public static kmpSearch(text: string, pattern: string): number[] {
        const matches: number[] = [];
        if (!pattern || !text || pattern.length > text.length) return matches;

        const lps = this.computeLPSArray(pattern);
        let i = 0; // Index for text
        let j = 0; // Index for pattern

        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }

            if (j === pattern.length) {
                matches.push(i - j);
                j = lps[j - 1]; // Reset back along prefix track
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }

        return matches;
    }

    private static computeLPSArray(pattern: string): number[] {
        const lps = new Array(pattern.length).fill(0);
        let len = 0;
        let i = 1;

        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
}