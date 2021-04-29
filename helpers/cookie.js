const Cookies = {
    set(name, value, expires, path = '/') {
        document.cookie = `${name}=${value};path=${path}; max-age=${expires}`;
    },

    remove(name) {
        this.set(name, "", -1)
    }
}

export default Cookies;