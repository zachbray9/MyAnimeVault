package cookieutil

import (
	"net/http"
	"time"
)

func CreateSessionCookie(sessionId string) *http.Cookie {
 return &http.Cookie{
	Name: "sid",
	Value: sessionId,
	Path: "/",
	HttpOnly: true,
	Secure: true,
	SameSite: http.SameSiteLaxMode,
	MaxAge: int(24 * time.Hour * 30),
 }
}