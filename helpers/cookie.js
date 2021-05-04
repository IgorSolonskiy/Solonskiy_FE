const cookies = {
    set(name, value, expires, path = '/') {
        document.cookie = `${name}=${value};path=${path}; max-age=${expires}`;
    },

    get(name){
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    },

    remove(name) {
        this.set(name, "", -1)
    }
}

export default cookies;