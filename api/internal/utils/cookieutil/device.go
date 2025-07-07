package cookieutil

import (
	"myanimevault/config"
	"net/http"
	"time"
)

func CreateDeviceCookie(deviceId string) *http.Cookie {
	ttl := 365 * 24 * time.Hour

	return &http.Cookie{
		Name:     "did",
		Value:    deviceId,
		Path:     "/",
		HttpOnly: true,
		Secure:   config.CookieSecure(),
		SameSite: config.CookieSameSite(),
		Expires: time.Now().Add(ttl),
		MaxAge:   int(ttl.Seconds()),
	}
}
