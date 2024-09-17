package customErrors

import "errors"

var (
	ErrNotFound = errors.New("not_found")
	ErrIncorrectPassword = errors.New("incorrect_password")
	ErrRevokedToken = errors.New("token_revoked")
)