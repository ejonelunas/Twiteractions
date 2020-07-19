async function getTimelinePage (screen_name, page, max_id = null) {
    let params = {
        screen_name,
        count:200,
        ...(!!max_id && {max_id}),
    };

    const result  = await globalThis.TwitterClient.get("statuses/user_timeline", params);
    return result;
}

async function getTimeline(screen_name) {
    let page = 1;
    let posts = await getTimelinePage(screen_name, page++);
    let timeline = [...posts];

    return timeline;
}

async function getLikedPage(screen_name, page, max_id = null) {
    let params ={
        screen_name,
        count: 200,
        ...(!!max_id && {max_id}),
        };

        const result = await globalThis.TwitterClient.get("favorites/list", params);
        return result;
}

async function getLiked(screen_name) {
    let page = 1;
    let posts = await getLikedPage(screen_name, page++);
    let timeline = [...posts];

    return timeline;
}

async function getAvatars(ids) {
    let params = {
        user_id: ids,
        include_entities: false,
    };

    const result = await globalThis.TwitterClient.get("users/lookup", params);

    return Object.fromEntries (
        result.map((user) => [
            user.id_str,
            user.profile_image_url_https.replace("normal", "400x400")
        ])
    );
}

async function getUser(screen_name) {
    let params = {
        screen_name,
        include_entities: false,
    };

    const result = (await globalThis.TwitterClient.get("users/lookup", params))[0];

    return {
        id: result.id_str,
        screen_name: result.screen_name,
        avatar: result.profile_image_url_https.replace("normal", "400x400"),
    };
}

module.exports = {
    getLiked,
    getTimeline,
    getAvatars,
    getUser
};