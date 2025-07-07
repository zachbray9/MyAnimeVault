package cookieutil

import (
	"net/http"
	"time"
)

func CreateDeviceCookie(deviceId string) *http.Cookie{
	return &http.Cookie{
		Name: "did",
		Value: deviceId,
		Path: "/",
		HttpOnly: true,
		Secure: true,
		SameSite: http.SameSiteLaxMode,
		MaxAge: int(24 * time.Hour * 30),
	}
}