const genrePaths: { [key: string]: any } = {
    action: require('@/assets/images/action.png'),
    adventure: require('@/assets/images/adventure.png'),
    animation: require('@/assets/images/animation.png'),
    comedy: require('@/assets/images/comedy.png'),
    crime: require('@/assets/images/crime.png'),
    documentary: require('@/assets/images/documentary.png'),
    drama: require('@/assets/images/drama.png'),
    family: require('@/assets/images/family.png'),
    fantasy: require('@/assets/images/fantasy.png'),
    history: require('@/assets/images/history.png'),
    horror: require('@/assets/images/horror.png'),
    music: require('@/assets/images/music.png'),
    mystery: require('@/assets/images/mystery.png'),
    romance: require('@/assets/images/romance.png'),
    science_fiction: require('@/assets/images/Science Fiction.png'),
    tv_movie: require('@/assets/images/TV Movie.png'),
    thriller: require('@/assets/images/thriller.png'),
    war: require('@/assets/images/war.png'),
    western: require('@/assets/images/western.png'),
};

export const getGenreImagePath = (genreName: string) => {
    const formattedGenreName = genreName.toLowerCase();
    return genrePaths[formattedGenreName] || require('@/assets/images/drama.png');
};
