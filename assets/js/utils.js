const clearEndorsementsPostsEl = (endorsementPosts) => endorsementPosts.innerHTML = "";

const clearInputFieldsEl = (to, from, textarea) => {
    to.value = "";
    from.value = "";
    textarea.value = "";
}

const getEndorsementObject = (to, from, endorsementContent) => {
    const endorsementObject = {
        endorsementContent: endorsementContent.value,
        to: to.value,
        from: from.value,
        likes: ['0'],
        likeCount: 0
    }

    return endorsementObject
}

export { clearEndorsementsPostsEl, clearInputFieldsEl, getEndorsementObject };