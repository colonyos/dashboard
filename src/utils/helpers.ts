export const sleep = (time: number) =>
    new Promise((res) => setTimeout(res, time));

export const calculateWindowSize = (windowWidth: number) => {
    if (windowWidth >= 1200) {
        return 'lg';
    }
    if (windowWidth >= 992) {
        return 'md';
    }
    if (windowWidth >= 768) {
        return 'sm';
    }
    return 'xs';
};

export const setWindowClass = (classList: string) => {
    const window: HTMLElement | null =
        document && document.getElementById('root');
    if (window) {
        // @ts-ignore
        window.classList = classList;
    }
};
export const addWindowClass = (classList: string) => {
    const window: HTMLElement | null =
        document && document.getElementById('root');
    if (window) {
        // @ts-ignore
        window.classList.add(classList);
    }
};

export const removeWindowClass = (classList: string) => {
    const window: HTMLElement | null =
        document && document.getElementById('root');
    if (window) {
        // @ts-ignore
        window.classList.remove(classList);
    }
};

export const bool2str = (b) => {
    if (b) {
        return "true"
    }
    return false
};

export const state2str = (state) => {
    if (state == 0) {
        return "Pending"
    } else if (state == 1) {
        return "Running"
    } else if (state == 2) {
        return "Successful"
    } else if (state == 3) {
        return "Failed"
    } else {
        return "Unknown"
    }
};


export const parseTime = (time) => {
    let unixTimestamp = Date.parse(time)
    let date = new Date(unixTimestamp);

    var year = date.getFullYear().toString();
    var month = date.toLocaleString("default", { month: "2-digit" });
    var day = date.toLocaleString("default", { day: "2-digit" });

    return year + "-" + month + "-" + day + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};
