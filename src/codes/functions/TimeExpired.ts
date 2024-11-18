export function getTimeExpired(time: number, type: String): Date {
    var expiredTime = 0
    switch (type) {
        case "seconds":
            expiredTime = time * 1000;
            break;
        case "minuts":
            expiredTime = time * 60 * 1000
            break;
        case "hours":
            expiredTime = time * 60 * 60 * 1000
            break;
        case "days":
            expiredTime = time * 24 * 60 * 60 * 1000
            break;
        default:
            expiredTime = time = 0;
            break;
    }

    return new Date(new Date().getTime() + expiredTime)
}