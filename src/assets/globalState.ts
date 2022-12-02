const globalState = {
    "ENTER": 0,
    "BACK": 1,

    charStates: [
        "default", "not-found",
        "exist",   "right-position",
    ],
    charStatesMap: {
        default_: 0,
        notFound: 1,
        exist:    2,
        rightPos: 3,
    }
}

export default globalState