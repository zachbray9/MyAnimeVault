package config

import (
	"net/http"
	"os"
	"strings"
)

func CookieSecure() bool {
	return os.Getenv("COOKIE_SECURE") == "true"
}

func CookieSameSite() http.SameSite {
	switch strings.ToLower(os.Getenv("COOKIE_SAME_SITE")) {
	case "none":
		return http.SameSiteNoneMode
	case "strict":
		return http.SameSiteStrictMode
	case "lax":
		fallthrough
	default:
		return http.SameSiteLaxMode
	}
}