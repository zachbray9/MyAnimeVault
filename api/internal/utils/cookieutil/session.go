package cookieutil

import (
	"myanimevault/config"
	"net/http"
	"time"
)

func CreateSessionCookie(sessionId string) *http.Cookie {
	ttl := 30 * 24 * time.Hour

	return &http.Cookie{
		Name:     "sid",
		Value:    sessionId,
		Path:     "/",
		HttpOnly: true,
		Secure:   config.CookieSecure(),
		SameSite: config.CookieSameSite(),
		Expires: time.Now().Add(ttl),
		MaxAge:   int(ttl.Seconds()),
	}
}
