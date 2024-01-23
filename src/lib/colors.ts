const getColors = (name: string) => {
    switch (name) {
        case 'en':
            return ['#f44336', '#e91e63'];
        case 'es':
            return ['#9c27b0', '#673ab7'];
        case 'fr':
            return ['#3f51b5', '#2196f3'];
        case 'de':
            return ['#009688', '#4caf50'];
        case 'it':
            return ['#ff9800', '#ff5722'];
        case 'pt':
            return ['#795548', '#607d8b'];
        case 'ja':
            return ['#9e9e9e', '#607d8b'];
        case 'ko':
            return ['#607d8b', '#795548'];
        case 'zh':
            return ['#ffc107', '#ffeb3b'];
        case 'ru':
            return ['#ffeb3b', '#ffc107'];
        case 'ar':
            return ['#ff5722', '#795548'];
        case 'hi':
            return ['#4caf50', '#009688'];
        case 'tr':
            return ['#2196f3', '#3f51b5'];
        case 'nl':
            return ['#673ab7', '#9c27b0'];
        case 'sv':
            return ['#e91e63', '#f44336'];
        case 'pl':
            return ['#ff5722', '#795548'];
        case 'da':
            return ['#ffc107', '#ffeb3b'];
        case 'no':
            return ['#ffeb3b', '#ffc107'];
        case 'fi':
            return ['#ff9800', '#ff5722'];
        case 'el':
            return ['#795548', '#607d8b'];
        case 'cs':
            return ['#9e9e9e', '#607d8b'];
        case 'th':
            return ['#607d8b', '#795548'];
        case 'he':
            return ['#2196f3', '#3f51b5'];
        case 'id':
            return ['#9c27b0', '#673ab7'];
        case 'ms':
            return ['#3f51b5', '#2196f3'];
        case 'vi':
            return ['#009688', '#4caf50'];
        case 'ro':
            return ['#ff9800', '#ff5722'];
        case 'hu':
            return ['#795548', '#607d8b'];
        case 'bg':
            return ['#9e9e9e', '#607d8b'];

        default:
            return ['#607d8b', '#795548'];
    };
};

export default getColors;