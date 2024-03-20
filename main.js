/* Select HTML */
var operationMode = document.querySelector("#operation_mode");
var gSensor = document.querySelector("#g_sensor");
var spm = document.querySelector("#spm");
var gpsState = document.querySelector("#gps_state");
var confirmationState = document.querySelector("#confirmation_state");
/* Inputs */
var intervalForMotion = document.querySelector("#interval_for_motion");
var password = document.querySelector("#password");
var gpsFixA = document.querySelector("#gps_fix_A");
var gpsFixB = document.querySelector("#gps_fix_B");
var periodInterval = document.querySelector("#period_interval");
var staticInterval = document.querySelector("#static_interval");
var motionInterval = document.querySelector("#motion_interval");
/* Output */
var hexString = document.querySelector("#output");
/* Botones */
var copyBtn = document.querySelector("#copy_btn")
/* Carteles de error */
var intervalForMotionError = document.querySelector("#interval_for_motion_error");
var passwordError = document.querySelector("#password_error");
var gpsFixAError = document.querySelector("#gps_fix_A_error");
var gpsFixBError = document.querySelector("#gps_fix_B_error");
var periodIntervalError = document.querySelector("#period_interval_error");
var staticIntervalError = document.querySelector("#static_interval_error");
var motionIntervalError = document.querySelector("#motion_interval_error");
/* Variables de script */
var arrayOfChanges = []

/* Validacion de datos */
const validacion = () => {
    var state = true;

    arrayOfChanges.forEach(element => {

        switch (element.id) {
            case "interval_for_motion":
                if (intervalForMotion.value < 1 || intervalForMotion.value > 100) {
                    state = false;
                    intervalForMotionError.classList.remove("disable");
                } else if (!intervalForMotionError.classList.contains("disable")) {
                    intervalForMotionError.classList.add("disable");
                };
                break;

            case "password":
                if (password.value.length != 8) {
                    state = false;
                    passwordError.classList.remove("disable");
                } else if (!passwordError.classList.contains("disable")) {
                    passwordError.classList.add("disable");
                };
                break;
            
            case "gps_fix_A":
                if (gpsFixA.value < 30 || gpsFixA.value > 600) {
                    state = false;
                    gpsFixAError.classList.remove("disable");
                } else if (!gpsFixAError.classList.contains("disable")) {
                    gpsFixAError.classList.add("disable");
                };
                break;
            
            case "gps_fix_B":
                if (gpsFixB.value < 10 || gpsFixB.value > 120) {
                    state = false;
                    gpsFixBError.classList.remove("disable");
                } else if (!gpsFixBError.classList.contains("disable")) {
                    gpsFixBError.classList.add("disable");
                };
                break;
            
            case "period_interval":
                if (periodInterval.value < 600) {
                    state = false;
                    periodIntervalError.classList.remove("disable");
                } else if (!periodIntervalError.classList.contains("disable")) {
                    periodIntervalError.classList.add("disable");
                };
                break;

            case "static_interval":
                if (staticInterval.value < 600) {
                    state = false;
                    staticIntervalError.classList.remove("disable");
                } else if (!staticIntervalError.classList.contains("disable")) {
                    staticIntervalError.classList.add("disable");
                };
                break;

            case "motion_interval":
                if (motionInterval.value < 600) {
                    state = false;
                    motionIntervalError.classList.remove("disable");
                } else if (!motionIntervalError.classList.contains("disable")) {
                    motionIntervalError.classList.add("disable");
                };
                break;
        };
    });

    return state;
};

/* Funcion generadora de la cadena Hex */
const strtohex = (asci_str) => {
    var hexStr = "";
    var count = 0;

    /// se recorre la cadena un caracter a la vez
    for (let i = 0; i < asci_str.length; i++) {
        /// Se transforma cada item del la cadean de la siguiente manera
        /// valor ASCII del caracter => a HEX => se lo pone en mayusuculas   
        var hexValue = asci_str[i].charCodeAt(0).toString(16).toUpperCase();
        hexStr = hexStr + hexValue;
        count += 1;
    };
    /// el largo es el total de bytes que quedo de la cadena mas dos que se agregan
    /// al final
    count += 2;
    var long = count.toString(16).toUpperCase();

    if (long.length < 2) {
        long = "0" + long;
    };

    return "0C0800" + long + hexStr + "0D0A";
};

/* Generador de Hex String */
const generator = () => {
    if (validacion()) {

        asciiStr = "L2("

        console.log(arrayOfChanges)

        if (arrayOfChanges.length > 1) {
            arrayOfChanges.forEach(element => {
                asciiStr += element.name + "=" + element.value + ",";
            });
        } else { asciiStr += arrayOfChanges[0].name + "=" + arrayOfChanges[0].value };

        asciiStr = asciiStr.slice(0, -1) +  ")";
        
        hexString.value = strtohex(asciiStr)
    } else { hexString.value = "" };
};

/* Copiado */
const copiar = () => {
    navigator.clipboard.writeText(hexString.value);

    copyBtn.animate(
        [
            {boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.5)"},
            {boxShadow: "0px 0px 10px 5px rgba(5,255,105,0.5)"},
            {boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.5)"}
        ],
        {
            duration: 1000
        }
    );
};

/* Validacion de cambio */
const enCambio = (a) => {
    if (!arrayOfChanges.includes(a)) {
        arrayOfChanges.push(a)
    }
}
