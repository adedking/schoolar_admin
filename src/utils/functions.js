export const checkError = (required=false, e, text, name, setError, clearErrors, setFunction, type='text', password=null, index=null) => {
    if (required) {
        if (type === 'text') {
            if (text.length > 0) {
                clearErrors([name])
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'mobile') {
            if (text.length > 5) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid mobile number provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'email') {
            if (text.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Email provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'password') {
            if (text.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Password provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'password_confirmation') {
            if (text === password) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Password must be the same as password confirmation' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'number') {
            if ((text.toString().length) > 0) {
                clearErrors([name])
            } else {
                setError(name, { type: 'number', message: 'This field is required' });
            }
        }
    } else {
        if (type === 'mobile') {
            if (text.length > 5) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid mobile number provided' });
            } else {
                clearErrors([name])
            }
        } else if (type === 'email') {
            if (text.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Email provided' });
            } else {
                clearErrors([name])
            }
        }
    }
    setFunction(e, type, name)
}

export const checkErrorSingle = (required=false, text, name, setError, clearErrors, setFunction, type='text', password=null) => {
    if (required) {
        if (type === 'text') {
            if (text.length > 1) {
                clearErrors([name])
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'mobile') {
            if (text.length > 5) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid mobile number provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'email') {
            if (text.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Email provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'password') {
            if (text.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Password provided' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'password_confirmation') {
            if (text === password) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Password must be the same as password confirmation' });
            } else {
                setError(name, { type: 'text', message: 'This field is required' });
            }
        } else if (type === 'number') {
            if ((text.toString().length) > 0) {
                clearErrors([name])
            } else {
                setError(name, { type: 'number', message: 'This field is required' });
            }
        }
    } else {
        if (type === 'mobile') {
            if (text.length > 5) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid mobile number provided' });
            } else {
                clearErrors([name])
            }
        } else if (type === 'email') {
            if (text.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                clearErrors([name])
            } else if (text.length > 0) {
                setError(name, { type: 'text', message: 'Invalid Email provided' });
            } else {
                clearErrors([name])
            }
        }
    }
    setFunction(text)
}

export const toDataUrl = async function (url, callback) {
    //Convert to base64
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                resolve(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.onerror = () => {
            reject({
            status: this.status,
            statusText: xhr.statusText,
            });
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
    });
};