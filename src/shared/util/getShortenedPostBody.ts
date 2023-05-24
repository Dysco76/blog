export const getShortenedPostBody = (postBody: types.Post['body'], shortenedLength: number = 20) => {
    const allBodyWords = postBody.split(' ');

    if (allBodyWords.length <= shortenedLength) {
        return postBody;
    }

    return allBodyWords.slice(0, shortenedLength).join(' ') + '...';
};
